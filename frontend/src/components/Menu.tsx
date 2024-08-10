import React from 'react'
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Wellcome to the Menu</h1>
      <button onClick={() => navigate('/menu/chat')} >Chat</button>
      <button onClick={() => navigate('/menu/test')} >Test</button>
    </div>
  )
}

export default Menu;
