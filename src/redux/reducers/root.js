import { combineReducers } from 'redux';
import { reducer as products } from './products'
import { reducer as zones } from './zones'

export const rootReducer = combineReducers({
  products,
  zones
})
