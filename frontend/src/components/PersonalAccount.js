import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useLocation, Link } from "react-router-dom";

import LoadersAll from "./LoadersAll";

function PersonalAccount() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    let isLoggedIn = false;
    isLoggedIn = true ? !!token : false;

    const location = useLocation();
    const { state } = location;
    const details = state.from;
    
    return(
    <React.Fragment>
    <Header />
    <div className="container">
    <div className="section-main-panel">
        <p>Личный кабинет</p>
        <div>
            <Link to={{pathname: "/add-service"}} state={{from: details}} className="header-auth-btn">Добавить ТО</Link>
            {userRole === 'SC' || userRole === 'MA' ? (
                <Link to={{pathname: "/add-claims"}} state={{from: details}} className="header-auth-btn">Добавить рекламации</Link>
            ) : null}

        </div>
        <p>Таблица с сортировкой столбцов - можно кликнуть в заголовке столбца</p>
        <div className="section-table-content">
            <LoadersAll detailsloaders={details} />
        </div>

        <Link to="/">Вернуться на главную страницу</Link>
    </div>
    </div>
        
    <Footer />
    </React.Fragment>
    );
}

export default PersonalAccount;
