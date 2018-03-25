export default () => (
  function accepted(value) {
    return {
      valid: value === 'yes' || value === 'on' || value === 1 || value === true
    }
  }
)
