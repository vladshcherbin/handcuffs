import messages from './messages/en'

export default function formatErrorMessage(errorTitle) {
  return messages[errorTitle] || errorTitle
}
