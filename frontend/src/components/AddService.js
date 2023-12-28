import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const AddServiceForm = () => {
  const location = useLocation();
  const { state } = location;
  const details = state.from;
  const navigate = useNavigate();

  const [machine, setMachine] = useState('');
  const [typeMaintenance, setTypeMaintenance] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');
  const [operatingTime, setOperatingTime] = useState('');
  const [order, setOrder] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [companyExecutor, setCompanyExecutor] = useState('');
  const token = localStorage.getItem('token');
  const [typeMaintanceAll, setTypeMaintanceAll] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/v1/maintenance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        machine,
        type_maintenance: typeMaintenance,
        maintenance_date: maintenanceDate,
        operating_time: operatingTime,
        order,
        order_date: orderDate,
        company_executor: companyExecutor,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      navigate("/")
    }
  };

  async function getTypeMaintance() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/type_maintenance/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

    });

    if (response.ok) {
      const typeMaintanceList = await response.json();
      setTypeMaintanceAll(typeMaintanceList);
    };
  };

  useEffect(() => {
    getTypeMaintance();
  }, []);

  return (
    <React.Fragment>
    <Header />
    <div className="container">
    <div className="section-main-panel">
    <div>
        <h2>Добавить ТО</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Машина:
            <select
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
            >
              <option value="">Машина</option>
                {details.map((loader) => (
                  <option key={loader.factory_number} value={loader.id}>
                    {loader.factory_number}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Вид ТО:
            <select
              value={typeMaintenance}
              onChange={(e) => setTypeMaintenance(e.target.value)}
            >
              <option value="">Вид ТО</option>
                {typeMaintanceAll.map((loader) => (
                  <option key={loader.name} value={loader.id}>
                    {loader.name}
                </option>
              ))}
            </select>
          </label>
          <br />  
          <label>
            Дата проведения ТО:
            <input
              type="date"
              value={maintenanceDate}
              onChange={(e) => setMaintenanceDate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Наработка м/час:
            <input
              type="number"
              value={operatingTime}
              onChange={(e) => setOperatingTime(e.target.value)}
            />
          </label>
          <br />
          <label>
            Номер заказ-наряда:
            <input
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </label>
          <br />
          <label>
            Дата заказ-наряда:
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </label>
          <br /><label>
            Организация, проводившая ТО:
            <input
              type="text"
              value={companyExecutor}
              onChange={(e) => setCompanyExecutor(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className="section-table-tab-block-btn">Отправить</button>
        </form>
      </div>
    </div>
    </div>
    <Footer />
    </React.Fragment>
    );
  };

export default AddServiceForm;
