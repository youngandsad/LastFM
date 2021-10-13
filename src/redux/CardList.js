import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    cards: [],
}

export const CardList = createSlice({
    name: 'cardlist',
    initialState,
    reducers: {
      loadCards: (state, action) => {
            const card = {
                data: action.payload
            }
            state.cards.push(card)
        },  
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loadCards } = CardList.actions
  
  export default CardList.reducer