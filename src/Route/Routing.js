import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Menu from "../Pages/Menu/Menu";
import ViewCart from "../Pages/ViewCart/ViewCart";
import OrderSummery from "../Pages/OrderSummery/OrderSummery";
import RestoClosed from "../Pages/RestoClosed/RestoClosed";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Bill from "../Pages/Bill/Bill";

function Routing() {
  return (
    <Routes>
      <Route path="/shops/:restaurant_id/:table_id" element={<LandingPage />} />
      <Route path="/menu/:restaurant_id/:table_id" element={<Menu />} />
      <Route path="/viewcart/:restaurant_id/:table_id" element={<ViewCart />} />
      <Route
        path="/ordersummery/:restaurant_id/:table_id"
        element={<OrderSummery />}
      />
      <Route path="/restaurantisclosedtoday" element={<RestoClosed />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/bill/:session_uuid" element={<Bill />} />
    </Routes>
  );
}

export default Routing;
