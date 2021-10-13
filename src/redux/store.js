import { configureStore } from '@reduxjs/toolkit'
import cardListReducer from './CardList'

export const store = configureStore({
  reducer: {
    cardList: cardListReducer,
  },
})