import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import LocationWrite from './LocationWrite';
import axios from 'axios';
import './CreateUser.css'
import address from '../../API_KEY'
import { useHistory } from 'react-router-dom';

const requiredFields = [
  { field: '이름', path: 'users.userName' },
  { field: '아이디', path: 'users.userId' },
  { field: '비밀번호', path: 'users.userPassword' },
  { field: '이메일', path: 'users.userEmail' },
  { field: '성별', path: 'users.userGender' },
  { field: '주소', path: 'location.address' },
  { field: '나이', path: 'users.userAge' },
  { field: '취미', path: 'users.userHobby' },
  { field: '전화번호', path: 'users.userTel' },
  { field: '이미지', path: 'users.userProfile' }
];

const CreateUser = ({ setIsLoading } ) => {

  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(); // FormData 객체 생성
  
    // 사용자 정보 추가
    formData.append('users.userName', createData.users.userName);
    formData.append('users.userId', createData.users.userId);
    formData.append('users.userPassword', createData.users.userPassword);
    formData.append('users.userEmail', createData.users.userEmail);
    formData.append('users.userGender', createData.users.userGender);
    formData.append('users.userAge', createData.users.userAge);
    formData.append('users.userHobby', createData.users.userHobby);
    formData.append('users.userTel', createData.users.userTel);
    formData.append('users.userWeight', createData.users.userWeight);
    // formData.append('users.userProfile', createData.users.userProfile);
    formData.append('users.userMBTI', createData.users.userMBTI);
  
    // 위치 정보 추가
    formData.append('location.address', createData.location.address);
    formData.append('location.lat', createData.location.lat);
    formData.append('location.lng', createData.location.lng);
  
    // 파일 추가
    formData.append('uploadFile', createData.users.userProfile);

    try {
      const response = await axios.post(
        `${address.backendaddress}/users/create`,
        formData, // FormData 객체를 전달
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
          },
          withCredentials: true,
        }
      );
      history.push('/home');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
// 필드의 값을 가져오는 함수
const getFieldValue = (createData, field) => {
  // field가 문자열인지 확인하고, 아닌 경우 빈 문자열 반환
  if (typeof field !== 'string') return '';

  const fieldPath = field.split('.');
  let value = createData;
  for (const key of fieldPath) {
    value = value[key];
    if (value === undefined) return ''; // 값이 없을 경우 빈 문자열 반환
  }
  return value;
};

// 필드의 이름을 가져오는 함수
const getFieldName = (field) => {
  // field가 문자열인지 확인하고, 아닌 경우 빈 문자열 반환
  if (typeof field !== 'string') return '';

  const fieldPath = field.split('.');
  return fieldPath[fieldPath.length - 1];
};

// 필수 필드들의 값을 확인하고 반환하는 함수
const checkRequiredFields = (createData, requiredFields) => {
  const missingFields = [];
  for (const { field, path } of requiredFields) {
    const value = getFieldValue(createData, path);
    if (!value) {
      missingFields.push(field);
    }
  }
  return missingFields;
};

const handleFileChange = (e) => {
  const file = e.target.files[0]; // 선택된 파일 가져오기
  setCreateData((prevData) => ({
    ...prevData,
    users: {
      ...prevData.users,
      userProfile: file, // 선택된 파일을 userProfile에 업데이트
    },
  }));
};


  

  // LocationWrite를 열고 닫는 함수
  const toggleLocationWrite = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='CreateUserForm'>
      
      

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
            type="password"
            name="users.userPassword"
            value={createData.users.userPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            name="users.userName"
            value={createData.users.userName}
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
            disabled={true}
          />
        </Form.Group>

        {/* LocationWrite 컴포넌트를 토글할 버튼 */}
        <Button className='select' onClick={toggleLocationWrite}>
          {isOpen ? '주소 선택 닫기' : '주소 선택 열기'}
        </Button>
        
        {/* isOpen 상태에 따라 LocationWrite 컴포넌트를 보여주거나 감춥니다 */}
        {isOpen && (
          <LocationWrite setCreateData={setCreateData} toggleLocationWrite={toggleLocationWrite} setIsLoading={setIsLoading}/>
        )}

<br/><br/>

        <Form.Group className="mb-3">
          <Form.Label>생년월일</Form.Label>
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

{/* 필수입력아님 */}
        <Form.Group className="mb-3">
          
          <Form.Label>키</Form.Label>
          <Form.Control
            type="text"
            name="users.userWeight"
            value={createData.users.userWeight}
            onChange={handleChange}
          />
          </Form.Group>

        <Form.Group className="mb-3">
          
          <Form.Label>몸무게</Form.Label>
          <Form.Control
            type="text"
            name="users.userHeight"
            value={createData.users.userHeight}
            onChange={handleChange}
          />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label>프로필 사진</Form.Label>
          <Form.Control
            type="file"
            name="users.userProfile"
            onChange={handleFileChange}
          />
          </Form.Group>

{/* 필수입력아님 */}
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

        <Button  className='select' type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default CreateUser;
