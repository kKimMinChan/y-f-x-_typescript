import {configureStore} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'

const useLogger = process.env.NODE_ENV !== 'production'

const initializeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
