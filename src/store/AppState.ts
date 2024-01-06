import * as L from './listEntities'
import * as L0 from './listidOrders'
import * as LC from './listidCardidOrders'
import * as C from './cardEntities'

export type AppState = {
  listEntities: L.State
  listidOrders: L0.State
  listidCardidOrders: LC.State
  cardEntities: C.State
}
