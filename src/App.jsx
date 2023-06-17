import DataTable from "./components/DataTable";

const App = () => {
  const data = [
    {
      month: '2020-01',
      total_value: '100000',
      value_details_by_brand: [
        {
          BMW: 100000,
        },
        {
          Suzuki: 25000,
        },
        {
          Volvo: 25000,
        },
      ],
      orders_details: [
        {
          order_id: '1234',
          quantity: '1',
          unit_price: '10000',
          total_amount: '10000',
        },
        {
          order_id: '1235',
          quantity: '1',
          unit_price: '10000',
          total_amount: '10000',
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;
