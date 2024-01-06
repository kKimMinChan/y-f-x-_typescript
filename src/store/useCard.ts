import * as C from '../store/cardEntities'
import * as LC from '../store/listidCardidOrders'
import * as D from '../data'
import {Card, UUID} from './commonTypes'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {AppState} from './AppState'
import {useCallback} from 'react'

export const useCards = (listid: UUID) => {
  const dispatch = useDispatch()
  const cards = useSelector<AppState, Card[]>(({cardEntities, listidCardidOrders}) =>
    listidCardidOrders[listid].map(uuid => cardEntities[uuid])
  )

  const onPrependCard = useCallback(() => {
    const card = D.makeRandomCard()
    dispatch(C.addCard(card))
    dispatch(LC.prependCardidToListid({listid, cardid: card.uuid}))
  }, [dispatch, listid])

  const onAppendCard = useCallback(() => {
    const card = D.makeRandomCard()
    dispatch(C.addCard(card))

    dispatch(LC.appendCardidToListid({listid, cardid: card.uuid}))
  }, [dispatch, listid])

  const onRemoveCard = useCallback(
    (uuid: UUID) => () => {
      dispatch(C.removeCard(uuid))
      dispatch(LC.removeCardIdFromListId({listid: listid, cardid: uuid}))
    },
    [dispatch, listid]
  )

  return {cards, onPrependCard, onAppendCard, onRemoveCard}
}
