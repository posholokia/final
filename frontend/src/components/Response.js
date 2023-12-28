import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

import "./css/style.css"


function Response() {
    const location = useLocation();
    const { state } = location || {};
    const detail = state && state.from ? state.from: null
    const serialNumber = detail ? detail.factory_number : ''
    const[factory_number, setfactory_number] = useState(`${serialNumber}`);
    const[detailsLoaders, setDetailsLoaders] = useState([]);
    const[detailLoader, setDetailLoader] = useState([detail]);
    const[header, setHeader] = useState();
    const[res, setRes] = useState();
    const[detailsTSAll, setDetailsTSAll] = useState([]);
    const[detailTS, setDetailTS] = useState([]);
    const[detailsClAll, setDetailsClAll] = useState([]);
    const[detailCl, setDetailCl] = useState([]);

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    let resultSerNum;
    let isLoggedIn = false;
    isLoggedIn = true ? !!token : false;

    let mistakeHTTPinLoaders;
    
    let headerEl = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

   if (isLoggedIn) {
    headerEl['Authorization'] = `Token ${token}`;
   }

    async function getDetails() {
        // запрос погрузчиков
        const url = "http://127.0.0.1:8000/api/v1/machine/"

        let response = await fetch(url,
            {
                method: 'GET',
                headers: headerEl,

            });
        
        if (response.ok) {
            let resultJson = await response.json();
            setDetailsLoaders(resultJson);
        } 

        // запрос технического обслуживания
        const urlTS = "http://127.0.0.1:8000/api/v1/maintenance/"

        let responseTS = await fetch(urlTS,
            {
                method: 'GET',
                headers: headerEl,

            });

        if (responseTS.ok) {
            let resultJsonTS = await responseTS.json();
            setDetailsTSAll(resultJsonTS);
        }

        // запрос рекламаций
        const urlCl = "http://127.0.0.1:8000/api/v1/complaints/"

        let responseCl = await fetch(urlCl,
            {
                method: 'GET',
                headers: headerEl,

            });

        if (responseCl.ok) {
            let resultJsonCl = await responseCl.json();
            setDetailsClAll(resultJsonCl);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // поиск сведений о погрузчике с серийным номером factory_number
        resultSerNum = detailsLoaders.find(item => item.factory_number == factory_number);
        if (resultSerNum != undefined) {
            setDetailLoader([resultSerNum]);
        } else {
            alert(`Отсутствует погрузчик с серийным номером ${factory_number}`);
            mistakeHTTPinLoaders = true;
        }       

        // поиск сведений о ТО погрузчика с серийным номером factory_number
        let resultTSSerNum = detailsTSAll.filter(item => item.machine == factory_number);
        if (resultTSSerNum != -1) {
            setDetailTS(resultTSSerNum);
        } else {
            alert(`Отсутствует ТО погрузчика с серийным номером {factory_number}`);
        }

        // поиск сведений о рекламациях погрузчика с серийным номером factory_number
        let resultClSerNum = detailsClAll.filter(item => item.machine == factory_number);
        if (resultClSerNum != -1) {
            setDetailCl(resultClSerNum);
        } else {
            alert(`Отсутствует рекламация для погрузчика с серийным номером {factory_number}`);
        }
      
        if (!mistakeHTTPinLoaders) {
          const resultSerNumArr = [resultSerNum];
          let resCommon = resultSerNumArr.map(function(item) {
            return <tr key={item.id}>
              <td className="section-main-panel-table-row-link">{item.factory_number}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.technique_model]}} className="section-main-panel-table-row-link">{item.technique_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_number}</Link></td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.supply_contract}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.date_of_shipment_from_the_factory}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.consignee}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.delivery_address}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.equipment}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.client]}} className="section-main-panel-table-row-link">{isLoggedIn && item.client.first_name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.service_company]}} className="section-main-panel-table-row-link">{isLoggedIn && item.service_company.name}</Link></td>
            </tr>;
          });
          let headerCommon =  <tr>
            <th>Зав. № машины</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Заводской номер двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Заводской номер трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Договор поставки №, дата</th>
            <th>Дата отгрузки с завода</th>
            <th>Грузополучатель (конечный потребитель)</th>
            <th>Адрес поставки (эксплуатации)</th>
            <th>Комплектация (доп. опции)</th>
            <th>Клиент</th>
            <th>Сервисная компания</th>
          </tr>;

          setRes(resCommon);
          setHeader(headerCommon);
        }

    }
    
    // Обработчик кнопки "Общая информация"
      function handleClickCommon() {
        let resCommon = detailLoader.map(function(item) {
            return <tr key={item.id}>
              <td className="section-main-panel-table-row-link">{item.factory_number}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.technique_model]}} className="section-main-panel-table-row-link">{item.technique_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_number}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_model.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_number}</Link></td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.supply_contract}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.date_of_shipment_from_the_factory}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.consignee}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.delivery_address}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.equipment}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.client]}} className="section-main-panel-table-row-link">{isLoggedIn && item.client.first_name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.service_company]}} className="section-main-panel-table-row-link">{isLoggedIn && item.service_company.name}</Link></td>
            </tr>;
        });
        let headerCommon =  <tr>
            <th>Зав. № машины</th>
            <th>Модель техники</th>
            <th>Модель двигателя</th>
            <th>Заводской номер двигателя</th>
            <th>Модель трансмиссии</th>
            <th>Заводской номер трансмиссии</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель управляемого моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Договор поставки №, дата</th>
            <th>Дата отгрузки с завода</th>
            <th>Грузополучатель (конечный потребитель)</th>
            <th>Адрес поставки (эксплуатации)</th>
            <th>Комплектация (доп. опции)</th>
            <th>Клиент</th>
            <th>Сервисная компания</th>
          </tr>;
        setRes(resCommon);
        setHeader(headerCommon);
    }

    // Обработчик кнопки "ТО"
      function handleClickService() {
        let resTS = detailTS.map(function(item) {
          return <tr key={item.id}>
              <td><Link to={{pathname: "/update-service"}} state={{from: detailLoader, item}} className="section-main-panel-table-row-link">{isLoggedIn && item.machine}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.service_company]}} className="section-main-panel-table-row-link">{isLoggedIn && item.service_company.name}</Link></td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.type_maintenance]}} className="section-main-panel-table-row-link">{isLoggedIn && item.type_maintenance.name}</Link></td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.maintenance_date}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.operating_time}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.order}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.order_date}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.company_executor}</td>
          </tr>;
      });
      let headerTS =  <tr>
          <th>Машина</th>
          <th>Сервисная компания</th>
          <th>Вид ТО</th>
          <th>Дата проведения ТО</th>
          <th>Наработка, м/час</th>
          <th>№ заказ-наряда</th>
          <th>Дата заказ-наряда</th>
          <th>Компания исполнитель</th>
        </tr>;
      setRes(resTS);
      setHeader(headerTS);
    }
    
    // Обработчик кнопки "Рекламации"
      function handleClickClaims() {
        let resCl = detailCl.map(function(item) {
          return <tr key={item.id}>
              <td>
                {isLoggedIn && userRole === 'SC' || userRole === 'MA' ? (
                  <Link to={{ pathname: "/update-claims" }} state={{ from: detailLoader, item }} className="section-main-panel-table-row-link">
                    {item.machine}
                  </Link>
                ) : (
                  item.machine
                )}
              </td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.date_of_refusal}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.operating_time}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.machine_components]}} className="section-main-panel-table-row-link">{isLoggedIn && item.machine_components.name}</Link></td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.failure_node}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.recovery_method]}} className="section-main-panel-table-row-link">{isLoggedIn && item.recovery_method.name}</Link></td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.parts_used}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.date_of_restoration}</td>
              <td className="section-main-panel-table-row-link">{isLoggedIn && item.equipment_downtime}</td>
              <td><Link to={{pathname: "/details"}} state={{from: [item.service_company]}} className="section-main-panel-table-row-link">{isLoggedIn && item.service_company.name}</Link></td>
          </tr>;
      });
      let headerCl =  <tr>
          <th>Машина</th>
          <th>Дата отказа</th>
          <th>Наработка, м/час</th>
          <th>Узел отказа</th>
          <th>Описание отказа</th>
          <th>Способ восстановления</th>
          <th>Используемые запасные части</th>
          <th>Дата восстановления</th>
          <th>Время простоя техники</th>
          <th>Сервисная компания</th>
        </tr>;
      setRes(resCl);
      setHeader(headerCl);
    }
  
    
    useEffect(() => {
      getDetails();
      if (detail) {
        handleClickCommon();
      }
    }, []);

    return (
        <React.Fragment>
          <section className="section-main-panel">
            <div className="section-instruction">
                Проверьте комплектацию и технические характеристики техники Силант
            </div>
            <div className='section-form'>
                <form method='post' onSubmit={handleSubmit} className="section-form-content">
                    <label htmlFor='factory_number' className="section-form-search-input">Заводской номер:</label>
                    <input
                        type='number'
                        name='factory_number'
                        value={factory_number}
                        onChange={event => setfactory_number(event.target.value)}
                        className='form'
                        placeholder='0000'
                        id='factory_number'
                        required
                    />
                    <input type='submit' value='Поиск' className='section-form-search-btn' />
                </form>
            </div>
            <div className="section-instruction">
              Результат поиска:
            </div>
            <div className="info-block">
              Клиент/Сервисная компания (от кого авторизовались): {user}
            </div>
            <div className="section-header">
              Информация о комплектации и технических характеристиках Вашей техники
            </div>
            <p>Погрузчик с заводским номером {factory_number}</p>
            <div className="section-table-tab-block">
              <button onClick={handleClickCommon} disabled={!factory_number} className="section-table-tab-block-btn">общая инфо</button>
              <button onClick={handleClickService} disabled={!factory_number} className="section-table-tab-block-btn">ТО</button>
              <button onClick={handleClickClaims} disabled={!factory_number} className="section-table-tab-block-btn">рекламации</button>
            </div>
            
            <div className="section-table-content">
               <Table striped responsive bordered="true">
                 <thead>
                  {header}
                 </thead>
                 <tbody>
                   {res}
                 </tbody>
                </Table>
            </div>
            <Link to={{pathname: "/personalaccount"}} state={{from: detailsLoaders}} className="header-auth-btn">Личный кабинет</Link>
          </section>
        </React.Fragment>        
    );
}
export default Response;
