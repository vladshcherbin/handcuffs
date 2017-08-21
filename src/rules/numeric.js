export default function numeric(value) {
  return (typeof value === 'number' || typeof value === 'string')
    && !isNaN(parseFloat(value)) && isFinite(value)
}
