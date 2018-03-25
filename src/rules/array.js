export default () => (
  function array(value) {
    return {
      valid: Array.isArray(value)
    }
  }
)
