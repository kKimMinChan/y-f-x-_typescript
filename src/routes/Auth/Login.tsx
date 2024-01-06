import {ChangeEvent, useCallback, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'

type LoginFormType = Record<'loginId' | 'password', string>
const initialFormState = {loginId: '', password: ''}

const Login = () => {
  const [{loginId, password}, setForm] = useState<LoginFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const navigate = useNavigate()
  const {login} = useAuth()

  const loginAccount = useCallback(() => {
    console.log(loginId, password, 'loginAccount')
    login(loginId, password, () => navigate('/'))
  }, [loginId, password, navigate, login])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">Sign Up</h1>
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="loginId"
            placeholder="ID"
            value={loginId}
            onChange={changed('loginId')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="password"
            placeholder="Password"
            value={password}
            onChange={changed('password')}
          />
          <button type="submit" className="w-full btn btn-primary" onClick={loginAccount}>
            Login
          </button>
        </div>
        <div className="mt-6 text-gray-drak">
          Create account?
          <Link className="btn btn-link btn-primary" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
