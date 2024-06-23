import Header from "./components/Header";
import Table from "./components/Table";
import Stats from "./components/Stats";
import { MonthProvider } from "../providers/MonthContext";

function App() {
  return (
    <>
      <MonthProvider>
        <Header />
        <Table />
        <Stats />
      </MonthProvider>
    </>
  );
}

export default App;
