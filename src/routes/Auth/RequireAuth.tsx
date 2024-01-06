import {useEffect} from 'react'
import {useAuth} from '../../contexts'
import {Outlet, useNavigate} from 'react-router-dom'

const RequireAuth = () => {
  const {jwt} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwt) navigate('/login')
  }, [jwt, navigate])

  return (
    <>
      <Outlet />
    </>
  )
}

export default RequireAuth
