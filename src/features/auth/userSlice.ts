import { createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
// import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  email: string | null,
  token: string | null,
  id: string | null
}

let initialState: UserState = { 
  email:  null,
  token: null,
  id: null
}

if(localStorage.getItem("user")){
  const parsedData: User = JSON.parse(localStorage.getItem("user") as string)
  initialState = {
    email: parsedData.email,
    token: parsedData.refreshToken,
    id: parsedData.uid
  }
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state,action){
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
    },
    removeUser(state){
      state = initialState
    }
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer