import {get, post} from '../server'
import * as U from '../utils'

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import {useBoard} from './BoardContext'

export type LoggedUser = {loginId: string; password: string}
type Callback = () => void

type ContextType = {
  jwt?: string
  errorMessage?: string
  loggedUser?: LoggedUser
  signup: (
    loginId: string,
    password: string,
    email: string,
    nickname: string,
    callback?: Callback
  ) => void
  login: (loginId: string, password: string, callback?: Callback) => void
  logout: (callback?: Callback) => void
  setJwt: (jwt: string) => void
}

export const AuthContext = createContext<ContextType>({
  signup: (
    loginId: string,
    password: string,
    email: string,
    nickname: string,
    callback?: Callback
  ) => {},
  login: (loginId: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {},
  setJwt: (jwt: string) => {}
})

type AuthProviderProps = {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({children}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(undefined)
  const [jwt, setJwt] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const signup = useCallback(
    (
      loginId: string,
      password: string,
      email: string,
      nickname: string,
      callback?: Callback
    ) => {
      const user = {loginId, password, email, nickname}
      get(`/api/v1/exist/id?id=${loginId}`)
        .then(res => res.json())
        .then(
          (result: {
            code: number
            data: {duplication: boolean; responseMessage: string}
          }) => {
            console.log(result, 'id')
            if (result.code === 1000 && !result.data.duplication) {
              get(`/api/v1/exist/email?email=${email}`)
                .then(res => res.json())
                .then(
                  (result: {
                    code: number

                    data: {duplication: boolean; responseMessage: string}
                  }) => {
                    console.log(result, 'email')
                    if (result.code === 1000 && !result.data.duplication) {
                      get(`/api/v1/exist/nickname?nickname=${nickname}`)
                        .then(res => res.json())
                        .then(
                          (result: {
                            code: number

                            data: {duplication: boolean; responseMessage: string}
                          }) => {
                            console.log(result, 'nickname')
                            if (result.code === 1000 && !result.data.duplication) {
                              post('/api/v1/sign-up', user)
                                .then(res => res.json())
                                .then(
                                  (result: {
                                    code: number

                                    data: {duplication: boolean; responseMessage: string}
                                  }) => {
                                    if (result.code) {
                                      alert('회원가입을 성공했습니다.')
                                    } else {
                                      setErrorMessage(result.data.responseMessage ?? '')
                                    }
                                  }
                                )
                                .finally(() => callback && callback())
                                .catch((e: Error) => setErrorMessage(e.message))
                            } else {
                              setErrorMessage(result.data.responseMessage ?? '')
                            }
                          }
                        )
                    } else {
                      setErrorMessage(result.data.responseMessage ?? '')
                    }
                  }
                )
            } else {
              setErrorMessage(result.data.responseMessage ?? '')
            }
          }
        )
    },
    []
  )

  const login = useCallback((loginId: string, password: string, callback?: Callback) => {
    const user = {loginId, password}
    // post('/api/v1/sign-in', user)
    //   .then(res => res.json())
    //   .then((result: {ok: boolean; errorMessage?: string}) => {
    //     if (result.ok) {
    //       setLoggedUser(notUsed => ({loginId, password}))
    //       callback && callback()
    //     } else {
    //       setErrorMessage(result.errorMessage ?? '')
    //     }
    //   })
    //   .catch((e: Error) => setErrorMessage(e.message ?? ''))
    U.readStringP('jwt')
      .then(jwt => {
        setJwt(jwt ?? '')
        return post('/api/v1/sign-in', user, jwt)
      })
      .then(res => res.json())
      .then(
        (result: {
          code: number
          data: {accessToken?: string; nickname: string}
          message?: string
        }) => {
          const {code, data, message} = result
          console.log(result, 'login')
          if (code === 1000) {
            setLoggedUser(notUsed => ({loginId, password}))
            U.writeStringP('jwt', data.accessToken ?? '').finally(() => {
              localStorage.setItem('nickname', data.nickname)
              setJwt(data.accessToken ?? '')
              const {password, ...userWithoutPassword} = user
              setLoggedUser(notUsed => user)
              U.writeObjectP('user', userWithoutPassword).finally(
                () => callback && callback()
              )
            })
            //callback && callback()
          } else {
            setErrorMessage(result.message ?? '')
          }
        }
      )
      .catch((e: Error) => setErrorMessage(e.message ?? ''))
    // U.readStringP('jwt')
    //   .then(jwt => {
    //     setJwt(jwt ?? '')
    //     return post('/api/v1/sign-in', user, jwt)
    //   })
    //   .then(res => res.json())
    //   .then((result: {ok: boolean; errorMessage?: string}) => {
    //     if (result.ok) {
    //       setLoggedUser(notUsed => ({loginId, password}))
    //       callback && callback()
    //     } else {
    //       setErrorMessage(result.errorMessage ?? '')
    //     }
    //   })
    //   .catch((e: Error) => setErrorMessage(e.message ?? ''))
  }, [])

  const logout = useCallback((callback?: Callback) => {
    setJwt(notUsed => '')
    setLoggedUser(undefined)
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    callback && callback()
  }, [])

  useEffect(() => {
    const deleteToken = false
    if (deleteToken) {
      U.writeStringP('jwt', '')
        .then(() => {})
        .catch(() => {})
    } else {
      U.readStringP('jwt')
        .then(jwt => setJwt(jwt ?? ''))
        .catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage)
      setErrorMessage(notUsed => '')
    }
  }, [errorMessage])

  const value = {
    jwt,
    errorMessage,

    loggedUser,
    signup,
    login,
    logout,
    setJwt
  }

  return <AuthContext.Provider value={value} children={children} />
}

export const useAuth = () => {
  return useContext(AuthContext)
}
