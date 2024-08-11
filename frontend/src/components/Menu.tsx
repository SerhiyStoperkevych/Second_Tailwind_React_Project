import React from 'react'
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-2xl mb-6'>Wellcome to the Menu</h1>
      <button onClick={() => navigate('/menu/chat')} className='bg-blue-300 hover:bg-blue-300 border text-white rounded-lg font-bold hover:animate-pulse' >Chat</button>
      <button onClick={() => navigate('/menu/test')} className='bg-blue-300 hover:bg-blue-300 border text-white rounded-lg font-bold hover:animate-pulse'>Test</button>
      <button onClick={() => navigate('/menu/clone')} className='bg-blue-300 hover:bg-blue-300 border text-white rounded-lg font-bold hover:animate-pulse'>Clone</button>
    </div>
  )
}

export default Menu;
