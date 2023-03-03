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
      state = [...action.payload]
      return state
    },
    addLike(state, action) {
      const id = action.payload

      const blogToLike = state.find((n) => n.id === id)

      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload

      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const { createBlog, appendBlog, setBlogs, addLike, deleteBlog } =
  blogSlice.actions

export default blogSlice.reducer
