export default () => (
  function boolean(value) {
    return {
      valid: value === true || value === false
    }
  }
)
