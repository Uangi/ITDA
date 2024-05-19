import React, { useState } from 'react';
import axios from 'axios';
import address from '../../API_KEY'
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { BiSolidDoorOpen } from "react-icons/bi";


const Login = ({ setLoggedInUser }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handlecreateUser = () => {
    history.push('/createUser');
  };

  const handleLogin = async () => {

    document.activeElement.blur();


    try {
      const response = await axios.post(`${address.backendaddress}/login`, { userId, userPassword }, { withCredentials: true });
      
      setError('');

      const userResponse = await axios.get(`${address.backendaddress}/users`, { withCredentials: true });
      setLoggedInUser(userResponse.data);
      console.log(userResponse.data)

      window.location.href='/'
      
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login failed:', error.response.data);
        setError('로그인 실패. 아이디 또는 비밀번호를 확인하세요.');
      } else {
        console.error('Login failed:', error.message);
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (

    <div className='loginForm'>
      <br/>
      <h2 style={{fontWeight: 'bold'}}><BiSolidDoorOpen/></h2>
      <br/>
      <Form.Floating className="mb-3">
        <Form.Control
          id="userId"
          type="text"
          placeholder='ID'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">ID</label>
      </Form.Floating>
      <Form.Floating>
        <Form.Control
          id="userPassword"
          type="password"
          placeholder='password'
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <label htmlFor="floatingPasswordCustom">Password</label>
      </Form.Floating>
      <br/>
      <br/>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <div >
      <Button className='loginButton' onClick={handleLogin}>로그인</Button>
      <Button className='loginButton' onClick={handlecreateUser}>회원가입</Button>
      </div>
    </div>
  );
};

export default Login;
