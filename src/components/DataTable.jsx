import React, { useState, useEffect, useRef } from 'react';
import "./datatable.css"
import "./toggle.css"

const DataTable = ({ data }) => {
  const [expandValueDetails, setExpandValueDetails] = useState(false);
  const [expandOrdersDetails, setExpandOrdersDetails] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const selectRef = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  

  //The event listeners are added only once when the component is mounted
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Tab') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    //cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  useEffect(() => {
    
    let filtered = [];
    
    // Apply the filter to the original data
    
    if (selectedCountries.length > 0) {
      filtered = data.filter((item) =>
      item.orders_details.some((order) =>
        selectedCountries.includes(order.country)
      ))
    }
    setFilteredData(filtered);
  }, [data, selectedCountries]);

const handleRetrieveAllData = () => {
  console.log('handleRetrieveAllData')
  //take a deep copy of the original
  setFilteredData(JSON.parse(JSON.stringify(data)));
}


  const handleCountrySelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCountries(selectedOptions);
  };
  

  return (
    <div className={`table-container`}>
      <h1>Sales Report</h1>
    <div className="dropdown-container" ref={selectRef}>
    <button className="dropdown-toggle" onClick={handleRetrieveAllData}>
      Retrieve All Data
      </button> |
      <button className="dropdown-toggle" onClick={()=>setShowDropdown(!showDropdown)}>
        Show Orders by Countries
      </button> 
      
      {showDropdown && (
        <select
          multiple
          value={selectedCountries}
          onChange={handleCountrySelection}
          className="country-dropdown"
          style={{ zIndex: 1 }}
        >
          {
            
            data.flatMap((item) => item.orders_details.map((order) => order.country))
    .filter((value, index, self) => self.indexOf(value) === index).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </select>
      )}
    </div>
    <table>
      <thead>
        <tr>
          <th colSpan="3"></th>
          <th colSpan="3">{expandValueDetails ? 'Amounts sold by Brand': ''}</th>
        </tr>
        <tr>
          <th>Month</th>
          <th onClick={() => setExpandValueDetails(!expandValueDetails)} >
            Total Value {expandValueDetails ? '-' : '+'}
          </th>
            
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>BMW</th>
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>Suzuki</th>
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>Volvo</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.month}>
            <td>{item.month}</td>
            <td onClick={() => selectedMonth === item.month ? setSelectedMonth(null): setSelectedMonth(item.month)} style={{ cursor: 'pointer' }}>{item.total_value}{' '}
            {selectedMonth === item.month ? '▼' : '►'}

            
           {
              item.orders_details.map((order) => (
                <ul key={order.order_id} className={`toggle-row ${selectedMonth === item.month ? '' : 'hidden'}`}>
                  <td colSpan={expandValueDetails ? 6 : 4} >
                    <li>
                      <strong>Order ID:</strong> {order.order_id}
                    </li>
                    <li>
                      <strong>Quantity:</strong> {order.quantity}
                    </li>
                    <li>
                      <strong>Unit Price:</strong> {order.unit_price}
                    </li>
                    <li>
                      <strong>Total Amount:</strong> {order.total_amount}
                    </li>
                    <li>
                      <strong>Country:</strong> {order.country}
                    </li>
                  </td>
                </ul>
              ))}
              </td>
              {
              item.value_details_by_brand.map((brand) => (
                <td className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`} key={Object.keys(brand)[0]}>{Object.values(brand)[0]}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataTable;
