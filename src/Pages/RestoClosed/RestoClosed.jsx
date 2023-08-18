import React from "react";
import "./RestoClosed.css";
import logo from "../../Assets/SVG/restoClosed.svg";

function RestoClosed() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={logo} className="restocloseLogo" alt="img" />
      <h3 className="restostatus text-center mt-3">
        Restaurant <br /> is <br /> offline
      </h3>
    </div>
  );
}

export default RestoClosed;
