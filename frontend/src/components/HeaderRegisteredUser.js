import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./css/style.css"

import logo from "./img/logo.png";

function HeaderRegisteredUser() {
  const user = localStorage.getItem('user');

  return (
    
    <React.Fragment>    
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="header-row-1">
              <Link to=""><img src={ logo } className="logo-img" alt="logo-silant" /></Link>
              <div className="header-contacts">+7-8352-20-12-09, telegram</div>
              <div className="header-auth">
                <Link to="/logout" className="header-auth-btn">Выйти</Link>
              </div>
            </div>
            <div className="header-row-2">Электронная сервисная книжка "Мой Силант"</div>
          </div>
        </header>
        </div>
    </React.Fragment>
    )
}

export default HeaderRegisteredUser;