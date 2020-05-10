import * as monaco from 'monaco-editor'

export const startEditor = (containerElement) => {
  monaco.editor.create(containerElement, {
    // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'typescript',
    theme: 'vs-light',
    fontSize: 16,
    minimap: { enabled: false },
  })
}
