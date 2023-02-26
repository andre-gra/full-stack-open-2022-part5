const ErrorNotification = ({ error }) => {
  if (error.length === 0) {
    return null
  }

  return <div className="error">{error}</div>
}

export default ErrorNotification
