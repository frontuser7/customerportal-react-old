import React from "react";
import "./LandingSvgCard.css";
import food1 from "../../Assets/SVG/dish1.svg";
import food2 from "../../Assets/SVG/dish2.svg";
import food3 from "../../Assets/SVG/dish6.svg";
import food4 from "../../Assets/SVG/dish4.svg";
import food5 from "../../Assets/SVG/dish3.svg";

function LandingSvgCard() {
  return (
    <div className="landingSvgCard rounded-4 d-flex justify-content-center align-items-center overflow-hidden">
      <div className="position-relative d-flex justify-content-center align-items-center">
        <img src={food5} alt="food" className="food" />
        <img src={food1} alt="food" className="food1 position-absolute" />
        <img src={food2} alt="food" className="food2 position-absolute" />
        <img src={food3} alt="food" className="food3 position-absolute" />
        <img src={food4} alt="food" className="food4 position-absolute" />
      </div>
    </div>
  );
}

export default LandingSvgCard;
