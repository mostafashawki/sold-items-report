import { useState, useMemo } from "react";
import DataTable from "./components/DataTable";
import DATA from "./components/data.json"

const App = () => {
  const data = useMemo(() => DATA, []);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div className={`wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="theme-toggle">
        <button title="Change theme" className="transparent-button" onClick={() => setIsDarkTheme(!isDarkTheme)}>
          {isDarkTheme ? '🌞' : '🌚'}
        </button>
      </div>
      <main>
      <DataTable data={data} />
      </main>
    </div>
  );
};

export default App;
