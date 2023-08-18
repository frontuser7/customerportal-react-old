import React from "react";
import PNF from "../../Assets/SVG/404.svg";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="png-main">
      <img src={PNF} className="pnf" alt="Page Not Found" />
    </div>
  );
}

export default PageNotFound;
