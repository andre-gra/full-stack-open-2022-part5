import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      const user = action.payload

      state = user
      return state
    },
    logout(state) {
      state = null
      return state
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
