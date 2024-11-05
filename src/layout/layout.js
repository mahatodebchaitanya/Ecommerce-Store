import React from 'react'
import Navbar from '../component/navbar'
const Layout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default Layout