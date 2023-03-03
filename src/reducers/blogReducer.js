import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload

      state.push({
        content,
        id: generateId(),
        user: {
          username: content.author
        }
      })
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { createBlog, appendBlog, setBlogs } = blogSlice.actions

export default blogSlice.reducer
