import { renderHook } from '@testing-library/react-hooks'
import { usePrompt } from './prompt.hook'

describe('dos prompt hook', () => {
  describe('initial render', () => {
    it('should include drive letter prefix', () => {
      const {
        result: { current },
      } = renderHook(() => usePrompt())
      expect(current.activeCommand).toEqual('C:>_')
    })
  })
})
