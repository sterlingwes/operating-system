import * as monaco from 'monaco-editor'
import { StaticServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices'
import TypingsWorker from './typings.worker'

const compilerOptions = {
  allowJs: true,
  allowSyntheticDefaultImports: true,
  alwaysStrict: true,
  esModuleInterop: true,
  forceConsistentCasingInFileNames: true,
  isolatedModules: true,
  jsx: monaco.languages.typescript.JsxEmit.React,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  noEmit: true,
  resolveJsonModule: true,
  strict: true,
  target: monaco.languages.typescript.ScriptTarget.ESNext,
}

const tsDefaults = monaco.languages.typescript.typescriptDefaults
const compilerDefaults = tsDefaults.getCompilerOptions()

tsDefaults.setCompilerOptions({ ...compilerDefaults, ...compilerOptions })

const codeEditorService = StaticServices.codeEditorService.get()

// Store details about typings we have loaded
const requestedTypings = new Map()
const extraLibs = new Map()

const addTypings = ({ typings }) => {
  Object.keys(typings).forEach((path) => {
    let extraLib = extraLibs.get(path)

    extraLib && extraLib.dispose()
    const prefixedPath = `file:///${path}`
    extraLib = tsDefaults.addExtraLib(typings[path], prefixedPath)

    extraLibs.set(path, extraLib)
  })
}

const typingsWorker = new TypingsWorker()
typingsWorker.addEventListener('message', ({ data }) => addTypings(data))

// TODO: Fetch these from webpack injected global
const dependencies = {
  react: '16.13.1',
}

const fetchDependencies = () => {
  Object.keys(dependencies).forEach((qualifier) => {
    const version = dependencies[qualifier]

    // Parse the qualifier to get the package name
    // This will handle qualifiers with deep imports
    const match = /^(?:@([^/?]+)\/)?([^@/?]+)(?:\/([^@]+))?/.exec(qualifier)

    if (!match) {
      return
    }

    const name = (match[1] ? `@${match[1]}/` : '') + match[2]

    if (requestedTypings.get(name) === version) {
      // Typing already loaded
      return
    }

    requestedTypings.set(name, version)

    typingsWorker &&
      typingsWorker.postMessage({
        name,
        version,
      })
  })
}

fetchDependencies()

const getFileLanguage = (path) => {
  if (path.includes('.')) {
    switch (path.split('.').pop()) {
      case 'js':
        return 'javascript'
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'json':
        return 'json'
      case 'css':
        return 'css'
      case 'html':
        return 'html'
      case 'md':
        return 'markdown'
      default:
        return undefined
    }
  }

  return undefined
}

const hoverProvider = {
  provideHover: (model, position) => {
    // Get the current line
    const line = model.getLineContent(position.lineNumber)
    const language = getFileLanguage(model.uri)

    if (!language) {
      return
    }

    // Tokenize the line
    const tokens = monaco.editor.tokenize(line, language)[0]

    for (let i = 0, l = tokens.length; i < l; i++) {
      const current = tokens[i]
      const next = tokens[i + 1]
      const end = next ? next.offset : line.length

      if (
        (current.type === 'string.js' || current.type === 'string.ts') &&
        position.column > current.offset &&
        position.column < end
      ) {
        // Get the string for the token and strip quotes
        const string = line.slice(current.offset + 1, end - 1)

        if (dependencies[string]) {
          // If the string refers to a dependency show the version
          return {
            range: new monaco.Range(
              position.lineNumber,
              current.offset + 1,
              position.lineNumber,
              end
            ),
            contents: [{ value: `version "${dependencies[string]}"` }],
          }
        }
      }
    }
  },
}

monaco.languages.registerHoverProvider('typescript', hoverProvider)

/* files follows format here: https://github.com/expo/snack-web/blob/af35e68d99a11efd78e0a159b2d9401fece48fd5/src/client/types.tsx#L29-L79 */

export const startEditor = ({ files, containerElement, onOpenPath }) => {
  const editor = monaco.editor.create(
    containerElement,
    {
      // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
      value: '',
      language: 'typescript',
      theme: 'vs-light',
      fontSize: 16,
      minimap: { enabled: false },
      lineNumbers: 'on',
      wordWrap: 'on',
      scrollBeyondLastLine: false,
    },
    {
      codeEditorService: Object.assign(Object.create(codeEditorService), {
        openCodeEditor: async ({ resource, options }, editor) => {
          // Open the file with this path
          // This should set the model with the path and value
          onOpenPath(resource.path)

          // Move cursor to the desired position
          editor.setSelection(options.selection)

          // Scroll the editor to bring the desired line into focus
          editor.revealLine(options.selection.startLineNumber)

          return Promise.resolve({
            getControl: () => editor,
          })
        },
      }),
    }
  )

  files.forEach(({ item: { path, content } }, index) => {
    const uri = monaco.Uri.from({ scheme: 'file', path }).toString()

    const lang = getFileLanguage(path)
    let model = monaco.editor.getModel(`file:///${path}`)
    if (!model) {
      model = monaco.editor.createModel(content, lang, uri)
      model.updateOptions({
        tabSize: 2,
        insertSpaces: true,
      })
    }

    if (index === files.length - 1) editor.setModel(model)
  })

  //
  window.monacoEditor = { editor, monaco }

  return editor
}
