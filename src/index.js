import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const reducer = combineReducers({
  notifications: notificationReducer,
  errorNotifications: errorNotificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
