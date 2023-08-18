import React, { useEffect, useState } from "react";
import "./MenuCard.css";
import food from "../../Assets/SVG/dish6.svg";
import { BASE_URL } from "../../Config/Config";
import {
  MdOutlineAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItems, removeMenuItems } from "../../Store/addRemoveItemsSlice";
import { updateItemCount } from "../../Store/getMenuListSlice";
import { updateFilteredItemCount } from "../../Store/getFilteredItemsSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

function MenuCard({
  name,
  description,
  price,
  id,
  logo,
  out_of_stock,
  menuItemIndex,
  filteredItemIndex,
  itemcount,
  btnshow,
  currency,
  extraItems,
}) {
  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  const dispatch = useDispatch();
  const [showAdd, setShowAdd] = useState(btnshow || false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(true);

  // get data from redux store
  const Ids = useSelector((state) => state.resto_TableId);
  const tablepin = useSelector((state) => state.session);
  const filteredItemData = useSelector((state) => state.filteredItemList);
  const restoData = useSelector((state) => state.restoData);

  // destructure data
  let { restaurant_id, table_id } = Ids;
  let { session_pin, session_uuid } = tablepin;
  let { is_online_order } = restoData;

  // urls
  const addOrder_url = `${BASE_URL}api/userapi/order/manage/add_on/`;

  // update count in menulist
  const handleAddItems = (name, description, price, id, logo, page) => {
    dispatch(addMenuItems({ name, description, price, id, logo, page }));
  };

  // remove items from cart
  const handleRemoveItems = (id) => {
    dispatch(removeMenuItems(id));
  };

  // add items to cart
  const handleCount = (menuItemIndex, filteredItemIndex, count) => {
    dispatch(updateItemCount({ index: menuItemIndex, count }));
    if (filteredItemData !== null) {
      dispatch(updateFilteredItemCount({ index: filteredItemIndex, count }));
    }
  };

  // handle Add Button
  const handleAddBtn = () => {
    if (extraItems.length) {
      console.log("extra items available");
      setShowModal(!showModal);
    } else {
      handleAddItems(name, description, price, id, logo, "menu");
      setShowAdd(!showAdd);
      handleCount(menuItemIndex, filteredItemIndex, itemcount + 1);
      handleOrder(id, 1);
    }
  };

  // add order to db
  const handleOrder = async (id, type) => {
    const data = {
      order_json: {
        session_uuid: session_uuid,
        item_id: id,
        manage_type: type,
        language_code: "en-us",
        extra_item: [],
      },
    };
    await axios
      .post(addOrder_url, data)
      .then((res) => {
        console.log("order", res);
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  useEffect(() => {
    if (itemcount < 1) {
      setShowAdd(!showAdd);
    }
  }, [itemcount]);
  return (
    <div
      id={id}
      className="Menucard position-relative py-3 rounded-4 text-center border shadow-sm"
    >
      <ToastContainer />
      <img
        src={logo ? BASE_URL + logo : food}
        alt="food"
        className="fooditem my-3"
      />
      <div className="fw-bold mb-2 px-2">{name}</div>
      {description && (
        <div className="description mb-3 text-truncate px-2">{description}</div>
      )}
      <hr />
      {!out_of_stock ? (
        <>
          {!is_online_order && (
            <div>
              {itemcount === 0 && (
                <button
                  className="btn btn-sm btn-warning text-white d-flex justify-content-center align-items-center gap-1 m-auto"
                  onClick={handleAddBtn}
                >
                  <MdOutlineAddCircleOutline />
                  Add
                </button>
              )}
              {itemcount > 0 && (
                <div className="d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center gap-3 border rounded-pill bg-warning px-2 fs-5 text-white">
                    <MdRemoveCircleOutline
                      onClick={() => {
                        handleRemoveItems(id);
                        handleCount(
                          menuItemIndex,
                          filteredItemIndex,
                          itemcount - 1
                        );
                        handleOrder(id, 0);
                      }}
                    />
                    <div className="text-dark fw-bold">{itemcount}</div>
                    <MdOutlineAddCircleOutline
                      onClick={() => {
                        handleAddItems(
                          name,
                          description,
                          price,
                          id,
                          logo,
                          "menu"
                        );
                        handleCount(
                          menuItemIndex,
                          filteredItemIndex,
                          itemcount + 1
                        );
                        handleOrder(id, 1);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="outofstock w-100 text-white">Out of stock</div>
      )}
      <div className="price px-2 py-1 fw-bold">
        {currency} {price}
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(!showModal);
        }}
        centered
      >
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <div className="fw-bold">Want some addon's with this item..?</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Add Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>
                    {!is_online_order && (
                      <div>
                        {itemcount === 0 && (
                          <button
                            className="btn btn-sm btn-warning text-white d-flex justify-content-center align-items-center gap-1 m-auto"
                            onClick={() => {
                              handleAddItems(
                                name,
                                description,
                                price,
                                id,
                                logo,
                                "menu"
                              );
                              setShowAdd(!showAdd);
                              handleCount(
                                menuItemIndex,
                                filteredItemIndex,
                                itemcount + 1
                              );
                              handleOrder(id, 1);
                            }}
                          >
                            <MdOutlineAddCircleOutline />
                            Add
                          </button>
                        )}
                        {itemcount > 0 && (
                          <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center align-items-center gap-3 border rounded-pill bg-warning px-2 fs-5 text-white">
                              <MdRemoveCircleOutline
                                onClick={() => {
                                  handleRemoveItems(id);
                                  handleCount(
                                    menuItemIndex,
                                    filteredItemIndex,
                                    itemcount - 1
                                  );
                                  handleOrder(id, 0);
                                }}
                              />
                              <div className="text-dark fw-bold">
                                {itemcount}
                              </div>
                              <MdOutlineAddCircleOutline
                                onClick={() => {
                                  handleAddItems(
                                    name,
                                    description,
                                    price,
                                    id,
                                    logo,
                                    "menu"
                                  );
                                  handleCount(
                                    menuItemIndex,
                                    filteredItemIndex,
                                    itemcount + 1
                                  );
                                  handleOrder(id, 1);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <h5 className="me-auto">Addon's</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Addon's Name</th>
                  <th>Price</th>
                  <th>Add Addon's</th>
                </tr>
              </thead>
              <tbody>
                {extraItems &&
                  extraItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.extra_item}</td>
                        <td>{item.price}</td>
                        <td>
                          {showModalAdd && (
                            <button className="btn btn-sm btn-warning text-white d-flex justify-content-center align-items-center gap-1 m-auto">
                              <MdOutlineAddCircleOutline />
                              Add
                            </button>
                          )}
                          {!showModalAdd && (
                            <div className="d-flex justify-content-center">
                              <div className="d-flex justify-content-center align-items-center gap-3 border rounded-pill bg-warning px-2 fs-5 text-white">
                                <MdRemoveCircleOutline />
                                <div className="text-dark fw-bold">0</div>
                                <MdOutlineAddCircleOutline />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MenuCard;
