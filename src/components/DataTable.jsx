import React, { useState, useRef } from 'react';
import "./datatable.css"
import "./toggle.css"

const DataTable = ({ data }) => {
  const [expandValueDetails, setExpandValueDetails] = useState(false);
  const [expandOrdersDetails, setExpandOrdersDetails] = useState(false);
  const parentRef = useRef();

  const handleValueDetailsClick = () => {
    setExpandValueDetails(!expandValueDetails);
  };

  const handleOrdersDetailsClick = () => {
    setExpandOrdersDetails(!expandOrdersDetails);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th onClick={() => setExpandValueDetails(!expandValueDetails)} >
            Total Value {expandValueDetails ? '-' : '+'}
          </th>
          {/* {expandValueDetails && ( */}
            <th>
              Brands
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>BMW</th>
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>Suzuki</th>
              <th className={`toggle-col ${expandValueDetails ? '' : 'hidden'}`}>Volvo</th>
              </th>
          {/* )} */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.month}>
            <td>{item.month}</td>
            <td onClick={() => setExpandOrdersDetails(!expandOrdersDetails)} style={{ cursor: 'pointer' }}>{item.total_value}{' '}
            {expandOrdersDetails ? '▼' : '►'}

            
           {
              item.orders_details.map((order) => (
                <div key={order.order_id} className={`toggle-row ${expandOrdersDetails ? '' : 'hidden'}`}>
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
  );
};

export default DataTable;
