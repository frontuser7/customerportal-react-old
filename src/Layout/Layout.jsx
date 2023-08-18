import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Routing from "../Route/Routing";
import { Provider } from "react-redux";
import store from "../Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useLocation } from "react-router-dom";

let persist = persistStore(store);

function Layout() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <div>
          {!location.pathname.includes("restaurantisclosedtoday") && <Navbar />}
          <Routing />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default Layout;
