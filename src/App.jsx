import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AllCouponsScreen from "./screens/AllCouponsScreen";
import AllUsersScreen from "./screens/AllUsersScreen";
import CoinWalletScreen from "./screens/CoinWalletScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SingleOrderScreen from "./screens/SingleOrderScreen";
import SingleUserScreen from "./screens/SingleUserScreen";
import Categories from "./screens/Categories.jsx";
import TermsandConditions from "./screens/TermsandConditions.jsx";
import Privacypolicy from "./screens/Privacypolicy.jsx";

const App = () => {
  const loc = useLocation().pathname;
  const [authToken, setAuthToken] = useState("");
  useEffect(() => {
    setAuthToken(sessionStorage.getItem("authToken"));
  });


  return (
    <>
      {loc === "/" ? (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          
        </Routes>
      ) : (
        <>
         {loc!=="/privacy-policy" && loc!=="/terms-and-conditions" && <Navbar />}
          <main>
            {loc!=="/privacy-policy" && loc!=="/terms-and-conditions" && <Sidebar />}
            <Routes>
              <Route path="/overview" element={<HomeScreen />} />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/orders" element={<OrderScreen />} />
              <Route path="/users" element={<AllUsersScreen />} />
              <Route path="/coinwallet" element={<CoinWalletScreen />} />
              <Route path="/coupons" element={<AllCouponsScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/order/:order_id" element={<SingleOrderScreen />} />
              <Route path="/user/:id" element={<SingleUserScreen />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/terms-and-conditions" element={<TermsandConditions />} />
              <Route path="/privacy-policy" element={<Privacypolicy />} />
            </Routes>
          </main>
          
        </>
      )}
    </>
  );
};

export default App;
