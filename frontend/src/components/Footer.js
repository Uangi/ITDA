import React from 'react';
import './Footer.css'
import { LuGripVertical } from "react-icons/lu";

const Footer = () => {

  const currentPath = window.location.pathname;
  console.log(currentPath)
  return (
    <footer className={currentPath === '/home' ? "site-footer" : "site-footer-else"}>
      <div className="container">
        <div className="row">
          
          
        </div>
        <hr className="small" />
      </div>
      <div className="container">
        <div className="row" style={{justifyContent:'center'}}>
        <div className="col-6 col-md-3" style={{width : '100%'}}>
        <ul className="footer-links">
    <li><a href="/ConditionsOfUse">개인정보 처리방침</a></li>
    <li>
      <a href="/">
        <LuGripVertical style={{ textDecoration: 'none' }} />
      </a>
    </li>
    <li><a href="/PrivacyPolicy">이용약관</a></li>
    <li>
      <a href="/">
        <LuGripVertical style={{ textDecoration: 'none' }} />
      </a>
    </li>
    <li><a href="/LocationServicePolicy">위치기반서비스 이용약관</a></li>
    <li>
      <a href="/">
        <LuGripVertical style={{ textDecoration: 'none' }} />
      </a>
    </li>
    <li><a href="/YouthProtectionPolicy">청소년보호정책</a></li>
  </ul>
        </div>
          <div className="col-md-8 col-sm-6 col-12" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <p className="copyright-text">
              Copyright © 2024 All Rights Reserved by &nbsp;
              <a href="/"><span className="logo" style={{textDecoration:'Bold'}} >ITDA.</span></a>
            </p>
            <ul className="social-icons">
              <li style={{width:'40px'}}>
                <a className="facebook" href="https://github.com/Uangi/ITDA">
                  <img style={{width:'100%', margin:'auto'}} src='../img/githubicon.png' alt='깃허브 이미지'></img></a>
              </li>
              <li style={{width:'40px'}}>
                <a className="dribbble" href="https://github.com/batttmnn/ITDA">
                  <img style={{width:'100%', margin:'auto'}} src='../img/githubicon.png' alt='깃허브 이미지'></img></a>
              </li>
              <li style={{width:'40px'}}>
                <a className="linkedin" href="https://github.com/WonJoe/ITDA_Collected">
                  <img style={{width:'100%', margin:'auto'}} src='../img/githubicon.png' alt='깃허브 이미지'></img></a>
              </li>
            </ul>
          </div>
          
          </div>
        </div>
    </footer>
  );
};

export default Footer;