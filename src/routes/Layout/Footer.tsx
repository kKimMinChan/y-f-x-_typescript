import React from 'react'
import * as D from '../../data'
import {Avatar} from '../../components'
const Footer = () => {
  const avatars = D.range(0, 4).map(index => (
    <Avatar
      key={index}
      className="inline-block -ml-6 border-8 border-white"
      size="5rem"
    />
  ))
  return (
    <footer className="flex justify-center mt-8 footer-center text-primary-content">
      <div className="w-5/6 p-20 bg-primary rounded-t-3xl">
        <div className="flex items-center justify-around ">
          <p className="text-5xl font-bold text-white">y=f(x)</p>
          <div>{avatars}</div>
          <p className="text-xl font-bold text-white">
            Copyright @ 2023 - All right reserved by T.M.I
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
