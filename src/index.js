import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'

const reducer = combineReducers({
  notifications: notificationReducer,
  errorNotifications: errorNotificationReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
