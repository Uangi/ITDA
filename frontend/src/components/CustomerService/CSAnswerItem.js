import React from 'react';
import { Link } from 'react-router-dom';

function CSAnswerItem({ answerItem }) {
  const {
    boardNo,
    userEmail,
    answerNo,
    userNickname,
    answerSubject,
    createdAt,
    answerContent,
  } = answerItem;

  //console.log('answerNo:', answerNo);

  return (
    <div>
      <Link to={`/answerDetail/${answerNo}`}>
        ㄴ원글번호 : {boardNo} /답글번호: {answerNo} / 제목: {answerSubject} /
        닉네임: {userNickname} / 작성일: {createdAt} / 내용 : {answerContent}
      </Link>
    </div>
  );
}

export default CSAnswerItem;
