import { configureStore } from '@reduxjs/toolkit'
import fieldReducer from '../FieldCanvas/FieldSlice'

export default configureStore({
  reducer: {
    field: fieldReducer
  }
})
