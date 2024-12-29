import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import IssuesReported from "./pages/IssuesReported";
import BinStatus from './pages/BinStatus';
import WardData from "./pages/WardData";
import Logout from "./pages/Logout";
import PickupHome from "./pages/PickupHome";
import Report from './pages/Report';
import ShowMap from "./pages/showMap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/auth/login" element={<Login />} ></Route>
      <Route path="/adminHome" element={<AdminHome />}>
      <Route path="/adminHome/issues-reported" element={<IssuesReported />}></Route>
      <Route path="/adminHome/binStatus/:wardId" element={<BinStatus />}></Route>
      <Route path="/adminHome/wardData" element={ <WardData/>}></Route>
      </Route>
      <Route path="/auth/logout" element={<Logout />} ></Route>
      <Route path="/pickupHome" element={<PickupHome />}></Route>
      <Route path="/report" element={<Report />}></Route>
      <Route path="/pickupHome/showMap" element={<ShowMap />}></Route>
    </Routes>
  )
}

export default App; 