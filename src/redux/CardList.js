import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  likedCards: [],
}

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=slavarock&api_key=96ddca1c0f4f0c36bdfd5b5d60b56cbd&limit=10&nowplaying&format=json')
  const data = await response.json();
  return data;
})


const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    likeCard: (state, action) => {
      const liked = action.payload
      state.likedCards.push(liked)
    },
    unlikeCard: (state, action) => {
      if(action.type == "cards/unlikeCard") {
        state.likedCards = []
      }
    },
    deleteCard: (state, action) => {
      const deletedItem = action.payload;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchCards.pending, (state, action) => {
        state.status = 'loading'
      })
    .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'success'
        state.posts.push(action.payload)
      })
    .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

  }


})



export const { likeCard, unlikeCard, cardlist, postStatus, likedCards, deleteCard } = cardsSlice.actions

export default cardsSlice.reducer
