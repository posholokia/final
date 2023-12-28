import React from "react";
import HeaderRegisteredUser from "./HeaderRegisteredUser";
import HeaderNotRegisteredUser from "./HeaderNotRegisteredUser";

function Header() {
    let content;
    const token = localStorage.getItem('token');
    let isLoggedIn = false;

    // если есть токен, то пользователь авторизован
    isLoggedIn = true ? !!token : false;

    if (isLoggedIn) {
        content = <HeaderRegisteredUser />;
    } else {
        content = <HeaderNotRegisteredUser />;
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Header;