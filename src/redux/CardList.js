import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=slavarock&api_key=96ddca1c0f4f0c36bdfd5b5d60b56cbd&limit=10&format=json')
  const data = await response.json();
  return data;
})

const usersSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchCards.pending, (state, action) => {
        state.status = 'loading'
      })
    .addCase(fetchCards.fulfilled, (state, action) => {
        return action.payload
      })
    .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})


export default usersSlice.reducer
