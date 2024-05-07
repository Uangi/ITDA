import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BoardItem from './CSBoardItem';
import AnswerItem from './CSAnswerItem';

function CSBoardList() {
  const [boardList, setBoardList] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    boardData();
    answerData();
  }, []);

  const boardData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/board/list', {withCredentials:true});
      console.log('보드 데이터' + response);
      setBoardList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  const answerData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/answer/list');
      console.log('앤써 데이터' + response);
      setAnswerList(response.data);
    } catch (error) {
      console.error('board list error:', error);
    }
  };

  return (
    <div>
      <a href="/boardWrite">문의하기</a>
      {/* <a href="/boardList">글목록</a> */}
      {boardList.map((boardItem, index) => (
        <div key={boardItem.boardNo}>
          <div>
            <BoardItem boardItem={boardItem} index={index + 1} />
          </div>
          <div>
            {answerList
              .filter((answer) => answer.boardNo === boardItem.boardNo)
              .map((answer, index) => (
                <AnswerItem
                  key={answer.answerNo}
                  answerItem={answer}
                  answerNo={answer.answerNo}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CSBoardList;
