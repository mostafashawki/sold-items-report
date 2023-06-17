import React, { useState } from 'react';
import "./datatable.css"
// import "./datatable-dark.css"
import "./toggle.css"

const DataTable = ({ data }) => {
  const [expandValueDetails, setExpandValueDetails] = useState(false);
  const [expandOrdersDetails, setExpandOrdersDetails] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  const handleCountrySelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCountries(selectedOptions);
  };
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  


  // const handleValueDetailsClick = () => {
  //   setExpandValueDetails(!expandValueDetails);
  // };

  // const handleOrdersDetailsClick = () => {
  //   setExpandOrdersDetails(!expandOrdersDetails);
  // };

  return (
    <div className={`table-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="theme-toggle">
        <button onClick={handleThemeToggle}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>
      </div>

    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
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
          {data
            .flatMap((item) => item.orders_details.map((order) => order.country))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((country) => (
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
        {data.filter((item) =>
              item.orders_details.some((order) =>
                selectedCountries.includes(order.country)
              )
            ).map((item) => (
          <tr key={item.month}>
            <td>{item.month}</td>
            <td onClick={() => selectedMonth === item.month ? setSelectedMonth(null): setSelectedMonth(item.month)} style={{ cursor: 'pointer' }}>{item.total_value}{' '}
            {selectedMonth === item.month ? '▼' : '►'}

            
           {
              item.orders_details.map((order) => (
                <div key={order.order_id} className={`toggle-row ${selectedMonth === item.month ? '' : 'hidden'}`}>
                  <td colSpan={expandValueDetails ? 6 : 4}>
                    <div>
                      <strong>Order ID:</strong> {order.order_id}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {order.quantity}
                    </div>
                    <div>
                      <strong>Unit Price:</strong> {order.unit_price}
                    </div>
                    <div>
                      <strong>Total Amount:</strong> {order.total_amount}
                    </div>
                    <div>
                      <strong>Country:</strong> {order.country}
                    </div>
                  </td>
                </div>
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
