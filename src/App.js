import "./App.css";
import { Routes, Route } from "react-router-dom";
import SelectMain from "./Page/Select/SelectMain";
import Order from "./Page/Order/OrderMain";
import OrderList from "./Page/Order/OrderList";
import Navi from "./component/Navi";
import ItemList from "./Page/Analyze/ItemList";
import History from "./Page/Log/History";
function App() {
  return (
    <>
      <Navi />
      <Routes>
        <Route path="/" element={<SelectMain />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/Analyze" element={<ItemList />} />
        <Route path="/Log" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
