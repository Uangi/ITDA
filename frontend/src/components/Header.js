import React from 'react'; 
import { Container, Nav, Navbar } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
 
const Header = () => { 
    return ( 
      <Navbar bg="dark" variant="dark"> 
        <Container> 
          <Link to="/" className="navbar-brand">Navbar</Link> 
          <Nav className="me-auto"> 
            <Link to ="/" className="nav-link">홈</Link> 
            <Link to ="/write" className="nav-link">글쓰기</Link>
            <Link to ="/append" className="nav-link">날씨 조회</Link>
          </Nav> 
        </Container> 
      </Navbar> 
    ); 
}; 
 
export default Header;