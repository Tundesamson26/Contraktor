import { configureStore } from '@reduxjs/toolkit'
import artisansReducer from './features/artisansSlice'
import adminReducer from './features/adminSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      artisans: artisansReducer,
      admin: adminReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
