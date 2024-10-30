import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  return (
    <div style={{ display: "flex" }}>
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log(username, password)
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        { username, password }
      );

      if (response.status === 200) {
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userID', response.data.userID);
        navigate('/');
      } else {
        alert('Invalid Credentials');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('Invalid Credentials');
      } else {
        console.error('Error during login: ', err);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password
      });
      alert('User Registered Successfully');
    } catch (err) {
      console.error('Error during registration: ', err);
      alert('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h1>{label}</h1>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            value={username}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
