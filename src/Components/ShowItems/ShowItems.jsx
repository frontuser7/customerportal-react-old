import React, { useEffect, useState } from "react";
import "./ShowItems.css";
import Mybutton from "../Button/Mybutton";
import { useSelector } from "react-redux";

function ShowItems({
  buttonName,
  backgroundColor,
  color,
  handleClick,
  currency,
}) {
  const addToCartData = useSelector((state) => state.addToCartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (addToCartData.length > 0) {
      const totalItemsPrice = addToCartData.reduce(
        (accumulator, currentItem) => {
          return accumulator + currentItem.price;
        },
        0
      );
      setTotalPrice(totalItemsPrice);
    } else {
      setTotalPrice(0);
    }
  }, [addToCartData]);

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow">
      <div>
        <div>
          <span className="fw-bold">{addToCartData.length}</span> Item
        </div>
        <div>
          <span className="fw-bold">
            {currency} {totalPrice}
          </span>{" "}
          Plus Taxes
        </div>
      </div>
      <div>
        <Mybutton
          name={buttonName}
          backgroundColor={backgroundColor}
          color={color}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default ShowItems;
