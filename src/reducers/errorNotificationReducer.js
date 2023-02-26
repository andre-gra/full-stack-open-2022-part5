// eslint-disable-next-line no-unused-vars
const errorNotificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR':
      state = action.payload.text
      return state
    case 'RESET':
      state = ''
      return state
    default: // if none of the above matches, code comes here
      return state
  }
}

export const setErrorMessage = (message) => {
  return {
    type: 'ERROR',
    payload: {
      text: message
    }
  }
}

export const resetErrorMessage = () => {
  return {
    type: 'RESET'
  }
}

export default errorNotificationReducer
