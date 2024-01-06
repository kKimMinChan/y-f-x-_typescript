import {Action} from 'redux'
import {UUID} from '../commonTypes'

export type State = UUID[]

export type SetListidOrders = Action<'@listidOrders/set'> & {
  payload: State
}
export type AddListidToOrders = Action<'@listidOrders/add'> & {
  payload: UUID
}
export type RemoveListidFromOrders = Action<'@listidOrders/remove'> & {
  payload: UUID
}

export type Actions = SetListidOrders | AddListidToOrders | RemoveListidFromOrders
