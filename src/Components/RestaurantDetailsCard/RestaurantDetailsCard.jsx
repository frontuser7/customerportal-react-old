import React from "react";
import "./RestaurantDetailsCard.css";
import defaultlogo from "../../Assets/Logo/qr4order_black.png";
import Mybutton from "../Button/Mybutton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSessionSlice } from "../../Store/getSessionSlice";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { addMenuList } from "../../Store/getMenuListSlice";
import { addFilteredItemList } from "../../Store/getFilteredItemsSlice";
import { setActiveCategory } from "../../Store/activeCatBtnSlice";
import { setActiveSubCategory } from "../../Store/activeSubCatBtnSlice";

function RestaurantDetailsCard() {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [session, setSession] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restoData = useSelector((state) => state.restoData);

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const { logo, name, description, is_pin_enable } = restoData;

  // function for create new session and navigate to menu
  const ids = useSelector((state) => state.resto_TableId);
  const tablepin = useSelector((state) => state.session);

  let { restaurant_id, table_id } = ids;
  let { session_uuid } = tablepin;

  // urls
  const createNewSession_url = `${BASE_URL}api/userapi/restaurant/create/session/pin/`;
  const joinwithpin_url = `${BASE_URL}api/userapi/restaurant/get/uuid/pin/`;
  const getMenuList_url = `${BASE_URL}api/userapi/restaurant/all/menu_new/${session_uuid}/en-us`;

  // function for button
  const handleClick = () => {
    if (check) {
      if (is_pin_enable) {
        console.log("Pin is enable");
        setShow(!show);
      } else {
        if (check) {
          startNewSession();
        } else {
          console.log("Pls accept TNC");
        }
      }
    } else {
      console.log("Pls accept TNC");
      notify("Please accept terms & condition", "info");
    }
  };

  // To start with ongoing session
  async function startPinSession() {
    if (session) {
      localStorage.setItem("logo", logo);
      let data = new FormData();
      data.append("session_pin", session);
      await axios
        .post(joinwithpin_url, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            dispatch(addSessionSlice(res.data.data));
            getAllMenu();
          } else {
            notify("Please enter correct pin", "error");
          }
        })
        .catch((err) => {
          notify("Please enter correct pin", "error");
          console.log(err);
        });
      setSession("");
      setShow(!show);
    } else {
      console.log("Pin is mandatory");
      notify("Pin is mandatory", "warning");
    }
  }

  // To start new session
  const handleNewSession = async () => {
    setSession("");
    setShow(!show);
    startNewSession();
  };

  async function startNewSession() {
    if (check) {
      let data = new FormData();
      data.append("restaurant_table", table_id);
      data.append("restaurant", restaurant_id);
      await axios
        .post(createNewSession_url, data)
        .then((res) => {
          if (res.data.status === "success") {
            dispatch(addSessionSlice(res.data.data));
            getAllMenu();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Pls accept TNC");
    }
  }

  // function to getallmenu
  const getAllMenu = async () => {
    await axios
      .get(getMenuList_url)
      .then((res) => {
        dispatch(addMenuList(res.data));
        dispatch(addFilteredItemList(null));
        dispatch(setActiveCategory(null));
        dispatch(setActiveSubCategory(null));

        console.log("Menu", res.data);
        if (res.data.code === 200) {
          navigate(`/menu/${restaurant_id}/${table_id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network issue", "error");
      });
  };

  return (
    <div className="restaurantDetailsCard py-3 rounded-4 d-flex flex-column justify-content-center align-items-center">
      <div
        className={`d-flex ${
          logo ? "" : "flex-column"
        } justify-content-evenly align-items-center w-100`}
      >
        <img
          className="restologo rounded m-2"
          src={logo ? BASE_URL + logo : defaultlogo}
          alt="logo"
        />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="fs-4 fw-bold text-center">{name}</div>
          {description && (
            <div className="mb-3 text-center restodescription">
              {description}
            </div>
          )}
          <div>
            <Mybutton
              name="Tap To Start"
              backgroundColor="#FF9B9B"
              color="#fff"
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <div>
          <input
            value={check}
            onChange={(e) => {
              setCheck(e.target.checked);
            }}
            type="checkbox"
            className="me-2"
          />
        </div>
        <div className="tnc">
          I agree to the Terms and Conditions and Privacy Policy.
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(!show);
        }}
        centered
      >
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <div className="fw-bold">Join with pin or start new session</div>
            <input
              value={session}
              onChange={(e) => setSession(e.target.value)}
              type="number"
              className="form-control"
            />
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={() => {
                startPinSession();
              }}
            >
              Join
            </button>
            <div className="description">- OR -</div>
            <Button variant="warning" onClick={handleNewSession}>
              Start New Session
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default RestaurantDetailsCard;
