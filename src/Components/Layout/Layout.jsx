import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout({ test }) {
  return (

    <div className="parent">
      <Navbar test={test} />
      <Outlet />
      <Footer />
    </div>

  )
}
