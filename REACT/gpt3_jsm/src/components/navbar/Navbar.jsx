import React from 'react';
import { RiMenu3Line, RiCloseLin} from 'react-icons/ri';
import logo from '../../assets/logo.svg';

import './navbar.css';
//BEM -> block element modifier\

function Navbar() {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">What is GPT3</a></p>
          <p><a href="#possibility">Open AI</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Libary</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar