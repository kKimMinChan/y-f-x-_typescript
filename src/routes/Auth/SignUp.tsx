import {ChangeEvent, useCallback, useState} from 'react'
import * as D from '../../data'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'

type SignUpFormType = Record<
  'email' | 'password' | 'confirmPassword' | 'loginId' | 'nickname',
  string
>
const initialFormState = {
  email: '',
  password: '',
  confirmPassword: '',
  loginId: '',
  nickname: ''
}

const SignUp = () => {
  const [{email, password, confirmPassword, loginId, nickname}, setForm] =
    useState<SignUpFormType>(initialFormState)
  const changed = useCallback(
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm(obj => ({...obj, [key]: e.target.value}))
    },
    []
  )

  const navigate = useNavigate()
  const {signup} = useAuth()
  const createAccount = useCallback(() => {
    console.log(email, password, confirmPassword, loginId, nickname, 'createAccount')
    // 필수 필드 검증
    if (!email || !password || !confirmPassword || !loginId || !nickname) {
      alert('모든 필드를 채워주세요.')
      return
    }

    // 비밀번호 일치 검증
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    // 계정 생성 로직
    signup(loginId, password, email, nickname, () => navigate('/login'))
  }, [email, password, confirmPassword, loginId, nickname, navigate, signup])

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
            required
            value={loginId}
            onChange={changed('loginId')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={changed('password')}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="confirm_password"
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={changed('confirmPassword')}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={changed('email')}
          />
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary btn-outline"
            name="nickname"
            placeholder="nickname"
            required
            value={nickname}
            onChange={changed('nickname')}
          />
          <button
            type="submit"
            className="w-full btn btn-primary"
            onClick={createAccount}>
            Create Account
          </button>
        </div>
        <div className="mt-6 text-gray-drak">
          Already have an account?
          <Link className="btn btn-link btn-primary" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
