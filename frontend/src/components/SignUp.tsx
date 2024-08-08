import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../MyContext';

interface User {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {

  const { username, setUsername } = useMyContext();

  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User[]>([]);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user');
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/user', { username, password });
      setUser((prevUsers) => [...prevUsers, { username, password }]);
      setUsername('');
      setPassword('');
      navigate('/signIn');
    } catch (error) {
      setMessage('Error signing up');
    }
  };

  return (
    <div className='flex flex-col items-center p-6 min-h-screen bg-gray-100' >
      <h1 className='text-2xl font-bold mb-6'>Please SignUp</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-sm bg-white p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label htmlFor="username" className='block text-gray-700 text-sm font-medium mb-2'>Your Username:</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="password" className='block text-sm mb-2 text-gray-700 font-medium'>Your Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 '
          />
        </div>
        <button type='submit' className=' mt-2 w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Submit</button>
      </form>
      <button 
        onClick={() => navigate('/signIn')}
        className='px-3 py-2 mt-4 font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500'
        >Go Back</button>
      <p className="mt-4 text-red-500">{message}</p>
    </div>
  )
}

export default SignUp;
