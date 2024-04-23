import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [token, setToken] = useState(""); // 토큰 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태 관리

  // 네이버 로그인 요청
  const onNaverLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/naver";
  }

  const handleLogout = () => {
    // 로그아웃 처리
    setToken("");
    setIsLoggedIn(false);
    setUserInfo(null);
  }

  useEffect(() => {
    // 페이지가 로드될 때 토큰이 있는지 확인하여 로그인 상태 설정
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('Authorization'));
    if (tokenCookie) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
      setToken(tokenCookie.split('=')[1]); // 토큰 값 설정
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!token) return; // 토큰이 없으면 요청을 보내지 않음

        // 서버의 엔드포인트 URL
        const endpointUrl = 'http://localhost:8081/api/user-info';

        // 서버로 요청을 보낼 때 헤더에 JWT를 포함하여 요청합니다.
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Axios를 사용하여 서버에 GET 요청을 보냅니다.
        const response = await axios.get(endpointUrl, { headers, withCredentials: true });

        // // JWT 토큰 디코딩하여 사용자 정보 추출
        // const decodedToken = jwtDecode(token);
        // console.log(decodedToken);

        // 서버로부터 받은 사용자 정보를 상태에 설정합니다.
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching user info:', error);
        // 서버에서 오류 응답을 보낼 경우 로그아웃 처리 등을 수행할 수 있습니다.
        handleLogout();
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, token]);

  return (
    <>
      {isLoggedIn ? ( // 로그인 상태에 따라 버튼 표시 여부 결정
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <div>사용자 이름: {userInfo && userInfo.name}</div>
        </>
      ) : (
        <button onClick={onNaverLogin}>로그인</button>
      )}
    </>
  );
}

export default Login;
