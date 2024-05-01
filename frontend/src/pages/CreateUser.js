import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import address from '../API_KEY';
import LocationWrite from './LocationWrite';
import axios from 'axios';

const CreateUser = (props) => {
  const [createData, setCreateData] = useState({
    users: {
      userId: '',
      userPassword: '',
      userEmail: '', // userEmail을 빈 문자열로 초기화
      userName: '',
      userGender: '',
      userAge: '',
      userHeight: '',
      userHobby: '',
      userTel: '',
      userWeight: '',
      userProfile: '', // 이미지
      userMBTI: '',
    },
    location: {
      lat: '',
      lng: '',
      address: '' // 주소 필드 추가
    }
  },[]);
  
  // LocationWrite 컴포넌트의 열림/닫힘 상태를 관리하는 변수와 함수
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const category = name.split('.')[0]; // users or location
    const field = name.split('.')[1]; // userId, userName, lat, lng, or address

    setCreateData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${address.backendaddress}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(createData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        props.history.push('/complete');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // LocationWrite를 열고 닫는 함수
  const toggleLocationWrite = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      
        <Form.Group className="mb-3">
          <Form.Label>성함</Form.Label>
          <Form.Control
            type="text"
            name="users.userName"
            value={createData.users.userName}
            onChange={handleChange}
          />
        </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            name="users.userId"
            value={createData.users.userId}
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="text"
            name="users.userPassword"
            value={createData.users.userPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="text"
            name="users.userEmail"
            value={createData.users.userEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>성별</Form.Label>
          <div>
            <Form.Check
              inline
              label="남자"
              type="radio"
              id="gender-male"
              name="users.userGender"
              value="male"
              checked={createData.users.userGender === "male"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="여자"
              type="radio"
              id="gender-female"
              name="users.userGender"
              value="female"
              checked={createData.users.userGender === "female"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>주소</Form.Label>
          <Form.Control
            type="text"
            name="location.address"
            value={createData.location.address}
            onChange={handleChange}
            disabled={false}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>나이</Form.Label>
          <Form.Control
            type="text"
            name="users.userAge"
            value={createData.users.userAge}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>취미</Form.Label>
          <Form.Control
            type="text"
            name="users.userHobby"
            value={createData.users.userHobby}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type="text"
            name="users.userTel"
            value={createData.users.userTel}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>무게</Form.Label>
          <Form.Control
            type="text"
            name="users.userWeight"
            value={createData.users.userWeight}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이미지</Form.Label>
          <Form.Control
            type="text"
            name="users.userProfile"
            value={createData.users.userProfile}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>MBTI</Form.Label>
          <Form.Control
            type="text"
            name="users.userMBTI"
            value={createData.users.userMBTI}
            onChange={handleChange}
          />
          </Form.Group>

        </Form>

        {/* LocationWrite 컴포넌트를 토글할 버튼 */}
        <Button onClick={toggleLocationWrite}>
          {isOpen ? '주소 선택 닫기' : '주소 선택 열기'}
        </Button>
        
        {/* isOpen 상태에 따라 LocationWrite 컴포넌트를 보여주거나 감춥니다 */}
        {isOpen && (
          <LocationWrite setCreateData={setCreateData} toggleLocationWrite={toggleLocationWrite}/>
        )}
        <br/>

        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label style={{display:'none'}}>위도</Form.Label>
          <Form.Control
            type="text"
            name="location.lat"
            value={createData.location.lat}
            onChange={handleChange}
            disabled="disabled"
            style={{display:'none'}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{display:'none'}}>경도</Form.Label>
          <Form.Control
            type="text"
            name="location.lng"
            value={createData.location.lng}
            onChange={handleChange}
            disabled="disabled"
            style={{display:'none'}}
          />
        </Form.Group>

        <br/>

        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default CreateUser;
