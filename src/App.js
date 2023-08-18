import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
