import React from 'react';
import { Link } from 'react-router-dom';

function CSBoardItem({ boardItem, index }) {
  // boardItem 객체에서 필요한 속성들을 비구조화 할당하여 가져옵니다.
  const {
    boardNo,
    boardSubject,
    createdAt,
    boardContent,
  } = boardItem;

  return (
    <div>
      <Link to={`/boardDetail/${boardNo}`}>
        게시판 번호 {index} / DB번호: {boardNo} / 제목: {boardSubject} / 작성일: {createdAt} / 내용 : {boardContent}
      </Link>
    </div>
  );
}

export default CSBoardItem;
