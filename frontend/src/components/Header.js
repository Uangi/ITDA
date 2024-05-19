
import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IoDiamondOutline } from "react-icons/io5";
import biglogotext from './image/biglogotext.png';
import { BsCrosshair2, BsArrowThroughHeartFill, BsPencilSquare, BsGeoAltFill, BsBellFill, BsStars, BsFillChatSquareQuoteFill, BsFingerprint } from "react-icons/bs";
import { TbCherryFilled } from "react-icons/tb";
import './Header.css';

const Header = ({ user, handleLogout, isLoading }) => {
    return (
        <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center'}} data-bs-theme="dark">
            <div>
                <Navbar.Brand as={NavLink} to="/" className="nav-link-home">
                    <img style={{ marginLeft: '30px', marginTop:'80px' }} src={biglogotext} alt='logotext' width='auto' height='170' />
                </Navbar.Brand>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'between' }}>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/" className="nav-link" activeClassName="active-link">
                                <TbCherryFilled size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px', marginBottomTrim:'25px' }}>
                            <NavLink to="/users" className="nav-link" activeClassName="active-link">
                                <BsCrosshair2 size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/req_list" className="nav-link" activeClassName="active-link">
                                <BsArrowThroughHeartFill size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/schedule" className="nav-link" activeClassName="active-link">
                                <BsBellFill size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/distanceReq" className="nav-link" activeClassName="active-link">
                                <BsGeoAltFill size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/board" className="nav-link" activeClassName="active-link">
                                <BsPencilSquare size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/WeatherAndFashion" className="nav-link" activeClassName="active-link">
                                <BsStars size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item style={{ margin: '25px' , marginBottomTrim:'25px'}}>
                            <NavLink to="/BoardList" className="nav-link" activeClassName="active-link">
                                <BsFillChatSquareQuoteFill size={50} className="icon" />
                            </NavLink>
                        </Nav.Item>
                        {!user && (
                            <Nav.Item style={{ margin: '25px', marginBottomTrim:'25px' }}>
                                <NavLink to="/login" className="nav-link" activeClassName="active-link">
                                    <BsFingerprint size={50} className="icon"/>
                                </NavLink>
                            </Nav.Item>
                        )}
                    </div>
                </div>
            </div>

            {user && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <NavDropdown className="nav-dropdown-item" title={`${user.userName} 님  `}>
                        <NavDropdown.Item className="nav-dropdown-item"><IoDiamondOutline /> {user.diaQty.toLocaleString()}</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/charge" className="nav-dropdown-item">다이아 구매</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/basket" className="nav-dropdown-item">구매 목록</NavDropdown.Item>
                        <NavDropdown.Item className="nav-dropdown-item" onClick={handleLogout}>로그아웃</NavDropdown.Item>
                    </NavDropdown>
                </div>
            )}
        </div>
    );
};

export default Header;