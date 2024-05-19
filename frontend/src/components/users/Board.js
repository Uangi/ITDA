import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './board.css';
import { PiSirenDuotone } from "react-icons/pi";
import Report from './Report';
import address from '../../API_KEY'
import { FaKeyboard } from "react-icons/fa";

function Board() {
  const [posts, setPosts] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [selUser, setSelUser] = useState({});
  const [sessionId, setSessionId] = useState('');
  const [writerId, setWriterId] = useState('');
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    fetchSessionId();
  }, []);
  
  useEffect(() => {
    fetchPosts();
  }, [posts]);
  

  const fetchSessionId = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/get_session_user_id`, {
        withCredentials: true 
      });
      setSessionId(response.data);

    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${address.backendaddress}/posts`);
      const sortedPosts = response.data.sort((a, b) => b.postNo - a.postNo);
    setPosts(sortedPosts);
    setWriterId(response.data[0].writerId);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClickUser = async (post) => {
  try{
    const response = await axios.get(`${address.backendaddress}/report/getUser`,{
    params:{
      postNo:post
    },  
    withCredentials: true
  });

  setSelUser(response.data);
  setIsShow(true);
  
}catch (error){
console.log('피신고자의 정보를 찾을 수 없습니다.')
}
};  

  const onClose = () => {
    setSelUser(null);
    setIsShow(false);
  }

const report = async ({reportReason}) => {

  try {
    const response = await axios.post(
      `${address.backendaddress}/report/users`,
      {
        reporterId:sessionId,
        reportedId:selUser.writerId,
        title:selUser.title,
        content:selUser.content,
        reportReason:reportReason,
        postNo:selUser.postNo
      },
      {
        withCredentials: true 
      }
      );
  setSelUser(response.data);
  alert("신고가 접수되었습니다.")


  } catch (error) {
    alert("이미 신고 접수된 게시글입니다.")
  }
};

const addPost = async () => {

    try {
      if (inputTitle.trim() !== '' && inputContent.trim() !== '') {
        const response = await axios.post(
          `${address.backendaddress}/write`,
          {
            writerId: sessionId,
            title: inputTitle,
            content: inputContent
          },
          {
              withCredentials: true 
          }
        );
        setPosts(prevPosts => [...prevPosts, response.data]);
        
        setInputTitle('');
        setInputContent('');
      }
    } catch (error) {
      console.error('게시글 작성에 실패했습니다:', error);
    }
  };
  
  return (
    <div className="board-container">
      <h1 className="board-title"><FaKeyboard style={{color:'red',marginBottom:'10px'}}/></h1>
      <div className="board-input-area" style={{justifyContent: 'center'}}>
        <input style={{border : '1px solid red',marginRight:'35px'}}
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="board-input"
        />
        <input style={{border : '1px solid red',marginRight:'35px'}}
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="board-input"
        />
        <button onClick={addPost} style={{border : '1px solid red'}} className="board-button">게시</button>
      </div>
      <div>
        {
        posts.map((post, index) => (
          <div key={index} className="board-post">
            <img className="profile-img-min" src={'./profile/'+post.writer.userProfile} alt='profile'/>
          <div className="post-header">
            <h3>{post.reportCount >= 5 ? '신고 접수로 게시가 중단된 글입니다.' : post.title}</h3>
           {post.reportCount < 5 && (
            <button onClick={() => handleClickUser(post.postNo)}
            className="report-button" disabled={post.reportCount>=5}
            >
              신고<PiSirenDuotone color='red'/>
            </button>
            )}
          </div>
          <p>{post.reportCount >= 5 ? '' : post.content}</p>
          <div className="post-info">
            <p className="post-time">{post.writer.userName} {post.timeStamp}</p>
          </div>
        </div>
        
        ))}
      </div>
      {isShow && <Report selUser={selUser} onClose={onClose} isShow={isShow} report={report}/>}
    </div>
  );
}

export default Board;
