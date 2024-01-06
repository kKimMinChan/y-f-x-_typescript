import React from 'react'
import {Route, Routes} from 'react-router-dom'
import NoMatch from './NoMatch'
import Layout from './Layout'
import LandingPage from './LandingPage'
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import RequireAuth from './Auth/RequireAuth'
import UseProgram from '../pages/useProgram'
import Board from '../pages/board'
import FileTest from '../pages/FileTest'
import CreateBoard from '../pages/board/CreateBoard'
import BoardItem from '../pages/board/BoardItem'

const RoutesSetup = () => {
  const boardRoutes = [
    '/update_information',
    '/data_list',
    '/data_reception',
    '/error_data_reception',
    '/news'
  ]

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        {/* <Route path="/board" element={<RequireAuth></RequireAuth>} /> */}
        <Route path="/" element={<RequireAuth />}>
          <Route path="/use_program" element={<UseProgram />} />

          {boardRoutes.map(path => (
            <Route key={path} path={path} element={<Board />} />
          ))}
          {boardRoutes.map(path => (
            <Route key={path} path={`${path}/board/:boardId`} element={<BoardItem />} />
          ))}

          <Route path="/write/:boardCategory" element={<CreateBoard />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/fileTest" element={<FileTest />} />
    </Routes>
  )
}

export default RoutesSetup
