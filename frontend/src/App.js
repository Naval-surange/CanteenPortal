import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import PrimarySearchAppBar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Register from "./components/register/register";
import DashBoard from "./components/dashboard/dashboard";
import UserDashBoard from "./components/user_dashboard/userdashboard";
import EditBuyer from "./components/user_dashboard/edit";
import Dishes from "./components/user_dashboard/dishes";
import Buy from "./components/user_dashboard/buy";
import VendorDashBoard from "./components/vendor_dashboard/vendordashboard";
import Wallet from "./components/wallet/wallet";
import VendorWallet from "./components/vendor_dashboard/vendorWallet";
import AddFood from "./components/add_food/addFood";
import Favs from "./components/user_dashboard/favs";
import EditFood from "./components/vendor_dashboard/editFood";
import Orders from "./components/vendor_dashboard/orders";
import StudentOrders from "./components/user_dashboard/orders";
import EditVendor from "./components/vendor_dashboard/edit";
import Stats from "./components/vendor_dashboard/stats";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <PrimarySearchAppBar />
      </ThemeProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/userdashboard" element={<UserDashBoard />} />
          <Route path="/userdashboard/wallet" element={<Wallet />} />
          <Route path="/userdashboard/dishes" element={<Dishes />} />
          <Route path="/userdashboard/edit" element={<EditBuyer />} />
          <Route path="/userdashboard/buy" element={<Buy />} />
          <Route path="/userdashboard/favs" element={<Favs />} />
          <Route path="/userdashboard/orders" element={<StudentOrders />} />
          <Route path="/vendordashboard" element={<VendorDashBoard />} />
          <Route path="/vendordashboard/editFood" element={<EditFood />} />
          <Route path="/vendordashboard/addFood" element={<AddFood />} />
          <Route path="/vendordashboard/orders" element={<Orders />} />
          <Route path="/vendordashboard/wallet" element={<VendorWallet />} />
          <Route path="/vendordashboard/edit" element={<EditVendor />} />
          <Route path="/vendordashboard/stats" element={<Stats />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
