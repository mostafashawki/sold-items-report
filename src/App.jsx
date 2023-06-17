import { useMemo } from "react";
import DataTable from "./components/DataTable";
import DATA from "./components/data.json"

const App = () => {
  const data = useMemo(() => DATA, []);

  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;
