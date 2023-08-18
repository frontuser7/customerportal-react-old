import React from "react";
import "./Navbar.css";
import defaultlogo from "../../Assets/Logo/qr4order_black.png";
import { MdLanguage } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BsFillCartFill } from "react-icons/bs";
import { MdNavigateBefore } from "react-icons/md";
import { PiCallBellFill } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../Config/Config";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  // for notification
  const notify = (notification, type) =>
    toast(notification, {
      autoClose: 2000,
      theme: "colored",
      type: type,
      position: "bottom-center",
    });

  const navigate = useNavigate();
  const location = useLocation();

  const restoData = useSelector((state) => state.restoData);
  const tablepin = useSelector((state) => state.session);

  let { logo, is_browse_only } = restoData;
  let { session_uuid } = tablepin;

  const waiterHelp_URL = `${BASE_URL}api//userapi/waiter/help/${session_uuid}`;

  const waiterHelp = async () => {
    await axios
      .get(waiterHelp_URL)
      .then((res) => {
        if (res.data.code == 200) {
          notify(res.data.message, "success");
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  return (
    <div className="navbar p-2 d-flex justify-content-between align-items-center sticky-top bg-white">
      <ToastContainer />
      {!location.pathname.includes("shops") && (
        <div className="d-flex justify-content-between align-items-center gap-3">
          <MdNavigateBefore
            onClick={() => {
              navigate(-1);
            }}
            size={"30px"}
          />
          <img
            src={logo ? BASE_URL + logo : defaultlogo}
            alt="logo"
            className="logo rounded ms-2"
          />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center gap-3 ms-auto me-2">
        {!is_browse_only && (
          <>
            {location.pathname.includes("menu") && (
              <PiCallBellFill onClick={waiterHelp} size={"20px"} />
            )}
          </>
        )}
        <MdLanguage size={"20px"} />
        <TbReload
          size={"20px"}
          onClick={() => {
            window.location.reload();
          }}
        />
        {!location.pathname.includes("shops") && (
          <BsFillCartFill size={"20px"} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
