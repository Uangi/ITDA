import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.contents}</Card.Text>
        <Link to="/post/" className="btn btn-primary">
          자세히보기
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostItem;
