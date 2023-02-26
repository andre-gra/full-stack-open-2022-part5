// eslint-disable-next-line no-unused-vars
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      state = action.payload.text
      return state
    case 'RESET':
      state = ''
      return state
    default: // if none of the above matches, code comes here
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET',
    payload: {
      text: message
    }
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer
