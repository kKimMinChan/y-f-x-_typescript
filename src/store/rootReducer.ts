import * as L from './listEntities'
import * as L0 from './listidOrders'
import * as LC from './listidCardidOrders'
import * as C from './cardEntities'
import {combineReducers} from 'redux'

export const rootReducer = combineReducers({
  listEntities: L.reducer,
  listidOrders: L0.reducer,
  listidCardidOrders: LC.reducer,
  cardEntities: C.reducer
})
