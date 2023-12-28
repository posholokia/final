import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useLocation, Link } from "react-router-dom";

function Details() {
    const location = useLocation();
    const { state } = location;
    const details = state.from;
    let res = details.map(function(item) {
        if (item.catalog !== "Клиент") {
            return <p key={item.id}>
                <span>{item.catalog}: {item.name}</span>
                <span>Описание: {item.description}</span>
            </p>
        } else {
            return <p key={item.id}>
                <span>{item.catalog}: {item.first_name}</span>
                <span>Роль: {item.role}</span>
            </p>
        }
    })

    return(
    <React.Fragment>
    <Header />
    <div className="container">
    <div className="section-main-panel">
        <p>Дополнительная информация</p>
        <div>
            {res}
        </div>
        <Link to="/">Вернуться на главную страницу</Link>
    </div>
    </div>
        
    <Footer />
    </React.Fragment>
    );
}

export default Details;
