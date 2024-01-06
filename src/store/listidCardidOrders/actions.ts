import {ListidCardid, ListidCardidS} from '../commonTypes'
import type * as T from './types'

export const setListidCardids = (payload: ListidCardidS): T.SetListidCardids => ({
  type: '@listidCardids/set',
  payload
})

export const removeListid = (payload: string): T.RemoveListAction => ({
  type: '@listidCardids/remove',
  payload
})

export const prependCardidToListid = (
  payload: ListidCardid
): T.PrependCardidToListidAction => ({
  type: '@listidCardids/prependCardid',
  payload
})

export const appendCardidToListid = (
  payload: ListidCardid
): T.AppendCardidToListidAction => ({
  type: '@listidCardids/appendCardid',
  payload
})

export const removeCardIdFromListId = (
  payload: ListidCardid
): T.RemoveCardidFromListidAction => ({
  type: '@listidCardids/removeCardid',
  payload
})
