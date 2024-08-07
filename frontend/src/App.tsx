import React from 'react';
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/signIn' />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  )
}

export default App
