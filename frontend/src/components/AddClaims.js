import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


const AddClaimsForm = () => {
  const location = useLocation();
  const { state } = location;
  const details = state.from;
  const navigate = useNavigate();

  const [machine, setMachine] = useState('');
  const [dateRefusal, setDateRefusal] = useState('');
  const [operatingTime, setOperatingTime] = useState('');
  const [machineComponents, setMachineComponents] = useState('');
  const [failureNode, setFailureNode] = useState('');
  const [recoveryMethod, setRecoveryMethod] = useState('');
  const [partsUsed, setPartsUsed] = useState('');
  const [dateRestoration, setDateRestoration] = useState('');
  const [equipmentDowntime, setEquipmentDowntime] = useState('');

  const token = localStorage.getItem('token');
  const [machineComponentsAll, setMachineComponentsAll] = useState([]);
  const [recoveryMethodAll, setRecoveryMethodAll] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/v1/complaints/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({
        date_of_refusal: dateRefusal,
        operating_time: operatingTime,
        machine_components: machineComponents,
        failure_node: failureNode,
        recovery_method: recoveryMethod,
        parts_used: partsUsed,
        date_of_restoration: dateRestoration,
        equipment_downtime: equipmentDowntime,
        machine,
    }),
    });

    if (response.ok) {
    const responseData = await response.json();
    navigate("/")
    }
  };

  async function getRecoveryMethod() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/recovery/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

    });

    if (response.ok) {
      const recoveryMethodList = await response.json();
      setRecoveryMethodAll(recoveryMethodList);
    };
  };

  async function getMachineComponents() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/type_failure/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

    });

    if (response.ok) {
      const machineComponentsList = await response.json();
      setMachineComponentsAll(machineComponentsList);
      console.log(`FAILURE ${machineComponents}`)
    };
  };
  useEffect(() => {
    getRecoveryMethod();
    getMachineComponents();
  }, []);

  return (
    <React.Fragment>
    <Header />
    <div className="container">
    <div className="section-main-panel">
    <div>
        <h2>Добавить рекламации</h2>
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
            Дата отказа:
            <input
              type="date"
              value={dateRefusal}
              onChange={(e) => setDateRefusal(e.target.value)}
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
            Узел отказа:
            <select
              value={machineComponents}
              onChange={(e) => setMachineComponents(e.target.value)}
            >
              <option value="">Узел отказа</option>
                {machineComponentsAll.map((loader) => (
                  <option key={loader.name} value={loader.id}>
                    {loader.name}
                </option>
              ))}
            </select>
          </label>
          <br />  
          <label>
            Описание отказа:
            <input
              type="text"
              value={failureNode}
              onChange={(e) => setFailureNode(e.target.value)}
            />
          </label>
          <br />
          <label>
            Способ восстановления:
            <select
              value={recoveryMethod}
              onChange={(e) => setRecoveryMethod(e.target.value)}
            >
              <option value="">Способ восстановления</option>
                {recoveryMethodAll.map((loader) => (
                  <option key={loader.name} value={loader.id}>
                    {loader.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Используемые запасные части:
            <input
              type="text"
              value={partsUsed}
              onChange={(e) => setPartsUsed(e.target.value)}
            />
          </label>
          <br />
          <label>
            Дата восстановления:
            <input
              type="date"
              value={dateRestoration}
              onChange={(e) => setDateRestoration(e.target.value)}
            />
          </label>
          <br />
          <label>
            Время простоя техники:
            <input
              type="text"
              value={equipmentDowntime}
              onChange={(e) => setEquipmentDowntime(e.target.value)}
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

export default AddClaimsForm;
