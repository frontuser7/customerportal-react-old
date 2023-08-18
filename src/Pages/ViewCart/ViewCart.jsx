import React, { useState } from "react";
import ShowItems from "../../Components/ShowItems/ShowItems";
import { useSelector, useDispatch } from "react-redux";
import MenuCard from "../../Components/MenuCard/MenuCard";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addPersonalDetails } from "../../Store/personalDetailsSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewCart() {
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [kycStatus, setKYCStatus] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const addToCartData = useSelector((state) => state.menuList.data);

  // function for create new session and navigate to menu
  const tablepin = useSelector((state) => state.session);
  const ids = useSelector((state) => state.resto_TableId);
  const langData = useSelector((state) => state.restoData);
  const userPersonalDetails = useSelector((state) => state.personalDetails);

  // console.log(userPersonalDetails);

  // Destructure data
  let { session_uuid } = tablepin;
  let { restaurant_id, table_id } = ids;
  let { currency } = langData;
  let { name, email, mobile } = userPersonalDetails;

  // urls
  const placeOrder_URL = `${BASE_URL}api/userapi/order/place/`;
  const getKYC_URL = `${BASE_URL}api/check/personal/permission/${restaurant_id}`;

  let cartData = [];
  if (addToCartData) {
    addToCartData.item.forEach((item) => {
      if (item.count > 0) {
        cartData.push(item);
      }
    });
  }

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getKYC = async () => {
    await axios
      .get(getKYC_URL)
      .then((res) => {
        setKYCStatus(res.data?.data.permission_list[0]);
        if (
          res.data?.data.permission_list[0].personal_email ||
          res.data?.data.permission_list[0].personal_name ||
          res.data?.data.permission_list[0].personal_phone_no
        ) {
          setShow(true);
        } else {
          placeOrder();
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network Error", "error");
      });
  };

  const placeOrder = async () => {
    let data = new FormData();
    data.append("session_uuid", session_uuid);
    data.append("language_code", "en-us");
    data.append("instruction", "");
    data.append("name", name);
    data.append("email", email);
    data.append("phone_number", mobile);
    await axios
      .post(placeOrder_URL, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          navigate(`/ordersummery/${restaurant_id}/${table_id}`);
          notify("Order Placed Successfully", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  const handleClick = async () => {
    getKYC();
  };

  const submitKYC = () => {
    dispatch(
      addPersonalDetails({
        name: details.name,
        email: details.email,
        mobile: details.mobile,
      })
    );
    placeOrder();
    setShow(!show);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center menuPage">
      <ToastContainer />
      <div className="row justify-content-start align-items-center mt-2 w-100">
        {addToCartData &&
          addToCartData.item.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.count > 0 && (
                  <div key={index} className="col-6 col-md-4 col-lg-3 mt-2">
                    <MenuCard
                      id={item.id}
                      index={index}
                      logo={item.logo}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      itemcount={item.count}
                      currency={currency}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      <div className="position-fixed bottom-0 w-100">
        <ShowItems
          buttonName={"Place Order"}
          backgroundColor={"#C3EDC0"}
          color={"#436840"}
          handleClick={handleClick}
          currency={currency}
        />
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
            <div className="fw-bold">
              Please fill up the details to place order
            </div>
            {kycStatus.personal_name && (
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={details.name}
                onChange={(e) => {
                  handleDetails(e);
                }}
                name="name"
              />
            )}
            {kycStatus.personal_email && (
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={details.email}
                onChange={(e) => {
                  handleDetails(e);
                }}
                name="email"
              />
            )}
            {kycStatus.personal_phone_no && (
              <input
                type="number"
                className="form-control"
                placeholder="Mobile No."
                value={details.mobile}
                onChange={(e) => {
                  handleDetails(e);
                }}
                name="mobile"
              />
            )}
            <Button variant="success" onClick={submitKYC}>
              Place Order
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewCart;
