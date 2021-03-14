import { combineReducers } from 'redux';
import { reducer as products } from './products'

export const rootReducer = combineReducers({
  products
})