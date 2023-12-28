import React, { useMemo, useState } from "react";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import "./css/style.css"

    
const useSortableData = (items, config = null) => {
  const[sortConfig, setSortConfig] = useState(config);
  console.log('items: ', items);
  console.log('sortConfig: ', sortConfig);

  const sortedItems = useMemo(() => {      
    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a,b) => {
        let keyA = a[sortConfig.key]
        let keyB = b[sortConfig.key]
        const includedObj = ['technique_model', 'engine_model', 'transmission_model', 'drive_axle_model', 'steerable_axle_model', 'service_company']

        if (includedObj.includes(sortConfig.key)) {
          keyA = keyA.name;
          keyB = keyB.name;
        }
        
        if (sortConfig.key === 'client') {
          keyA = keyA.first_name;
          keyB = keyB.first_name;
        }
        if (keyA < keyB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (keyA > keyB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);
    
  const requestSort = key => {

    let direction = 'ascending';
    if (sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
      ) {
      direction = 'descending';
    }
    setSortConfig({key, direction});
    };
    return { items: sortedItems, requestSort };
  };

  function LoadersAll(props) {
    const {items, requestSort, sortConfig } = useSortableData(props.detailsloaders);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined
    };
  
    return (
        <React.Fragment>
          <Table striped responsive bordered="true">
            <thead>
              <tr>
                <th>
                  {sortConfig != null && sortConfig.direction == 'ascending' && <img src={arrow_up} alt="Arrow Up" />}
                  {sortConfig != null && sortConfig.direction == 'descending' && <img src={ arrow_down } />}
                  <button type="button" onClick={() =>
                    requestSort('factory_number')} className="table-header-sorting-button">
                      Зав. № машины
                  </button>
                </th>
                <th>
                  <button type="button" className="table-header-sorting-button" onClick={() =>
                    requestSort('technique_model')}>
                      Модель техники
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('engine_model')} className="table-header-sorting-button">
                      Модель двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('engine_number')} className="table-header-sorting-button">
                      Заводской номер двигателя
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('transmission_model')} className="table-header-sorting-button">
                      Модель трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('transmission_number')} className="table-header-sorting-button">
                      Заводской номер трансмиссии
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('steerable_axle_model')} className="table-header-sorting-button">
                      Модель ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('drive_axle_number')} className="table-header-sorting-button">
                      Зав. № ведущего моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('drive_axle_model')} className="table-header-sorting-button">
                      Модель управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('steerable_axle_number')} className="table-header-sorting-button">
                      Зав. № управляемого моста
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('supply_contract')} className="table-header-sorting-button">
                      Договор поставки №, дата
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('date_of_shipment_from_the_factory')} className="table-header-sorting-button">
                      Дата отгрузки с завода
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('consignee')} className="table-header-sorting-button">
                      Грузополучатель (конечный потребитель)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('delivery_address')} className="table-header-sorting-button">
                      Адрес поставки (эксплуатации)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('equipment')} className="table-header-sorting-button">
                      Комплектация (доп. опции)
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('client')} className="table-header-sorting-button">
                      Клиент
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() =>
                    requestSort('service_company')} className="table-header-sorting-button">
                      Сервисная компания
                  </button>
                </th>
              </tr> 
            </thead>
            <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td><Link to={{pathname: "/"}} state={{from: item}} className="section-main-panel-table-row-link">{item.factory_number}</Link></td>
                    {/* <td className="section-main-panel-table-row-link">{item.factory_number}</td> */}
                    <td><Link to={{pathname: "/details"}} state={{from: [item.technique_model]}} className="section-main-panel-table-row-link">{item.technique_model.name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_model.name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.engine_model]}} className="section-main-panel-table-row-link">{item.engine_number}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_model.name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.transmission_model]}} className="section-main-panel-table-row-link">{item.transmission_number}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_model.name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.drive_axle_model]}} className="section-main-panel-table-row-link">{item.drive_axle_number}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_model.name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.steerable_axle_model]}} className="section-main-panel-table-row-link">{item.steerable_axle_number}</Link></td>
                    <td className="section-main-panel-table-row-link">{item.supply_contract}</td>
                    <td className="section-main-panel-table-row-link">{item.date_of_shipment_from_the_factory}</td>
                    <td className="section-main-panel-table-row-link">{item.consignee}</td>
                    <td className="section-main-panel-table-row-link">{item.delivery_address}</td>
                    <td className="section-main-panel-table-row-link">{item.equipment}</td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.client]}} className="section-main-panel-table-row-link">{item.client.first_name}</Link></td>
                    <td><Link to={{pathname: "/details"}} state={{from: [item.service_company]}} className="section-main-panel-table-row-link">{item.service_company.name}</Link></td>
                  </tr>
                ))}
            </tbody>
          </Table>

        </React.Fragment>
    )
}

export default LoadersAll;