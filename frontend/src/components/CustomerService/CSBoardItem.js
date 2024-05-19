import React from 'react';
import { Link } from 'react-router-dom';
import { BsBalloonHeart } from "react-icons/bs"; // 사용할 아이콘 import

function CSBoardItem({ boardItem, index }) {
  // boardItem 객체에서 필요한 속성들을 비구조화 할당하여 가져옴ㄴ
  const {
    boardNo,
    boardSubject,
    createdAt,
    boardWriteId,
    boardContent,
  } = boardItem;

  function formatKoreanDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const formattedDateTime = `${year}. ${month}. ${day} / ${hours} : ${minutes} `;
    return formattedDateTime;
  }

  const formattedDateTime = formatKoreanDateTime(createdAt);

  const handleLinkClick = () => {
    window.location.href = `/boardDetail/${boardNo}`; // 클릭 시 이동할 URL 설정
  };
  
  return (
    <>
      <div style={{ width: '20%' }}>{index}</div>
      <div style={{ width: '60%', cursor: 'pointer', textDecoration: 'underline' }} onClick={handleLinkClick}>
        <BsBalloonHeart style={{ marginRight: '5px' }} /> {/* 아이콘 추가 */}
        {boardSubject}
      </div>
      <div style={{ width: '20%' }}>{boardWriteId}</div>
      <div style={{ width: '20%' }}>{formattedDateTime}</div>
    </>
  );
}

export default CSBoardItem;
