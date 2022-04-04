import { combineReducers } from 'redux';
import { reducer as app } from './app'
import { reducer as products } from './products'
import { reducer as zones } from './zones'

export const rootReducer = combineReducers({
  app,
  products,
  zones
})
