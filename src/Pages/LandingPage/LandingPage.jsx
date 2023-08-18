import React, { useEffect } from "react";
import "./LandingPage.css";
import LandingSvgCard from "../../Components/LandingSvgCard/LandingSvgCard";
import RestaurantDetailsCard from "../../Components/RestaurantDetailsCard/RestaurantDetailsCard";
import AddressCard from "../../Components/AddressCard/AddressCard";
import { BiLogoFacebook, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { restoData } from "../../Store/getRestaurantSlice";
import { getLangData } from "../../Store/geLanguageSlice";
import { restoTableId } from "../../Store/restoTableIdSlice";
import { addMenuItems } from "../../Store/addRemoveItemsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const dispatch = useDispatch();

  let { restaurant_id, table_id } = useParams();

  dispatch(
    restoTableId({
      restaurant_id,
      table_id,
    })
  );

  // clear addtocart storage
  dispatch(
    addMenuItems({
      page: "landing",
    })
  );

  const data = useSelector((state) => state.restoData);
  let { address, phone_number } = data;

  // urls
  let getRestoData_url = `${BASE_URL}api/userapi/restaurant/landing/${restaurant_id}/${table_id}/`;
  let getLangData_url = `${BASE_URL}api/userapi/language/list/${restaurant_id}`;

  // api call to get restaurant data
  const getRestaurantDetails = async () => {
    await axios
      .get(getRestoData_url)
      .then((res) => {
        console.log(res.data?.data);
        if (!res.data?.data.status) {
          navigate("/restaurantisclosedtoday");
        } else {
          // store data in redux store
          dispatch(restoData(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  // api call to get language
  const getRestoLang = async () => {
    await axios
      .get(getLangData_url)
      .then((res) => {
        dispatch(getLangData(res.data.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRestaurantDetails();
    getRestoLang();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2 mb-4">
      <ToastContainer />
      <LandingSvgCard />
      <RestaurantDetailsCard />
      {(address || phone_number) && <AddressCard />}
      <div className="w-100 copyright">
        <hr className="border opacity-50 w-100" />
        <div className="text-center">Copyright © All rights reserved.</div>
        <div className="d-flex gap-2 justify-content-center align-items-center mt-1">
          <BiLogoFacebook />
          <BiLogoTwitter />
          <BiLogoYoutube />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
