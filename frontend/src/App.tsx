import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Chat from './components/Chat';
import Test from './components/Test';
import Clone from './components/clone/Clone';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/signIn' />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/chat" element={<Chat />} />
        <Route path="/menu/test" element={<Test />} />
        <Route path="/menu/clone" element={<Clone />} />
      </Routes>
    </>
  );
}

export default App;
