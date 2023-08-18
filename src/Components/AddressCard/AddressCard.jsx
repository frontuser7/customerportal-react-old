import React from "react";
import "./AddressCard.css";
import { BiCurrentLocation } from "react-icons/bi";
import { useSelector } from "react-redux";

function AddressCard() {
  const restoData = useSelector((state) => state.restoData);
  let { address, phone_number } = restoData;
  return (
    <div className="addresscard rounded-4 d-flex flex-column justify-content-center align-items-center gap-1">
      <div className="text-center fw-bold fs-5 d-flex align-items-center gap-2">
        <BiCurrentLocation /> Get In Touch
      </div>
      <div className=" mb-2">
        <div className="d-flex gap-1">
          <div>Address:</div>
          <div>{address}</div>
        </div>
        <div className="d-flex gap-1">
          <div>Phone No: </div>
          <div>{phone_number}</div>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
