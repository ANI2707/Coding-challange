import Header from "./components/Header";
import Table from "./components/Table";
import Stats from "./components/Stats";

import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import { MonthProvider, useMonth } from "./providers/MonthContext";
import Body from "./components/Body";

function App() {
  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <MonthProvider>
        <Header />
        <Table />
        <Body/>
      </MonthProvider>
    </div>
  );
}

export default App;
