import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // useHistory 추가
import BoardItem from './CSBoardItem';
import AnswerItem from './CSAnswerItem';
import address from '../../API_KEY'
import { BsBalloonHeart } from "react-icons/bs";
import { BsBalloonHeartFill } from "react-icons/bs";

function CSBoardList() {
  const [boardList, setBoardList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const history = useHistory(); // useHistory 사용

  useEffect(() => {
    boardData();
    answerData();
  }, []);

  const boardData = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/board/list`, { withCredentials: true });
      console.log('보드 데이터' + response.data);
      setBoardList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  const answerData = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/answer/list`);
      console.log('앤써 데이터' + response);
      setAnswerList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  const handleInquiryButtonClick = () => {
    history.push('/boardWrite'); // '/boardWrite'로 리다이렉트
  };

  return (
    <div>
   
 <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid red', padding: '10px' }}>
        <div style={{ width: '20%' }}>No.</div>
        <div style={{ width: '60%' }}>Title</div>
        <div style={{ width: '20%' }}>ID</div>
        <div style={{ width: '20%' }}>Date</div>
      </div>
      {boardList.length === 0 ? (
        <div style={{ fontSize: '25px', margin: '20px 0' }}>게시글이 없습니다</div>
      ) : (
        boardList.map((boardItem, index) => (
          <div key={boardItem.boardNo}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
              <BoardItem boardItem={boardItem} index={index + 1} />
            </div>
            {answerList
              .filter((answer) => answer.boardNo === boardItem.boardNo)
              .map((answer, index) => (
                <div key={answer.answerNo} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
                  <AnswerItem answerItem={answer} answerNo={answer.answerNo} />
                </div>
              ))}
          </div>
        ))
      )}
      <div style={{marginBlock:'100px'}}>
      <button type="button" style={{border: '2px solid red',color:'red' ,margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' ,backgroundColor:'transparent'}} onClick={handleInquiryButtonClick}>문의하기</button>
      </div>   
    </div>
    </div>
  );
}

export default CSBoardList;
