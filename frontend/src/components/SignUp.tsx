import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
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
    <div>
      <h1>Please SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label>Your Username:</label>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Your Password:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={() => navigate('/signIn')}>Go Back</button>
      <p>{message}</p>
    </div>
  )
}

export default SignUp;
