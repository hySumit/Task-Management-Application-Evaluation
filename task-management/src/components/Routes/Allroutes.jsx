import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Create } from '../Pages/Create'
import { Edit } from '../Pages/Edit'

export const Allroutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/edit' element={<Edit/>} />
    </Routes>
    </>
  )
}
