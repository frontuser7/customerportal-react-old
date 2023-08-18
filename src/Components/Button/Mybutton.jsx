import React from "react";
import "./Mybutton.css";

function Mybutton({ name, backgroundColor, color, handleClick }) {
  return (
    <div
      style={{ backgroundColor: `${backgroundColor}`, color: `${color}` }}
      className="mybutton px-4 py-2 fw-bold rounded-2"
      onClick={handleClick}
    >
      {name}
    </div>
  );
}

export default Mybutton;
