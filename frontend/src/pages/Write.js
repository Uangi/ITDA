import React, { useState } from 'react'; 
import { Button, Form } from 'react-bootstrap'; 
 
const Write = (props) => { 
  const [post, setPost] = useState(); 
 
  const changeValue = (e) => { 
    setPost({ 
      ...post, 
      [e.target.name]: e.target.value, 
    }); 
  }; 
 
  const submitPost = (e) => { 
    e.preventDefault(); 
    fetch('http://localhost:8081/post', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json; charset-utf-8', 
      }, 
      body: JSON.stringify(post), 
    }) 
      .then((res) => res.json()) 
      .then((res) => console.log(res), props.history.push('/')); 
  }; 
 
  return ( 
    <Form onSubmit={submitPost}> 
      <Form.Group className="mb-3"> 
        <Form.Label>제목</Form.Label> 
        <Form.Control name="title" onChange={changeValue} /> 
      </Form.Group> 
      <Form.Group className="mb-3"> 
        <Form.Label>내용</Form.Label> 
        <Form.Control 
          as="textarea" 
          rows={3} 
          name="contents" 
          onChange={changeValue} 
        /> 
      </Form.Group> 
      <Button type="submit">글쓰기</Button> 
    </Form> 
  ); 
}; 
 
export default Write;