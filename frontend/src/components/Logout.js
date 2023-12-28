import React, {useState} from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";


function Logout() {
  const [value,setValue] = useState();
  function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setValue({}); // вызывает обновление компонента
  }
  
  const token = localStorage.getItem('token');
  let isLoggedIn = false;
  const user = localStorage.getItem('user');

  isLoggedIn = true ? !!token : false;

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <section className="section-main-panel">
          <div>
            {isLoggedIn && <p>Вы зарегистрированы как {user}</p>}
            {isLoggedIn && <p>Выйти из системы и удалить регистрационные данные из браузера?</p>}
            {isLoggedIn && <button onClick={clearAuthData} className="login-form-btn">Выйти и удалить</button>}
          </div>
          {!isLoggedIn && <p>Вы успешно вышли из системы, данные удалены</p>}
          <Link to="/">Вернуться на главную страницу</Link>
        </section>
      </div>
      <Footer />      
    </React.Fragment>

    )
}

export default Logout;