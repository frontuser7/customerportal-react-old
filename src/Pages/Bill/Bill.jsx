import React from "react";
import "./Bill.css";
import axios from "axios";
import { BASE_URL } from "../../Config/Config";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

function Bill() {
  // get sessionUUID from redux store
  const tablepin = useSelector((state) => state.session);
  const [billData, setBillData] = useState(null);
  const [taxItems, setTaxItems] = useState(null);
  const [withouttaxItems, setWithoutTaxItems] = useState(null);

  let { session_uuid } = tablepin;
  // urls
  const getBill_URL = `${BASE_URL}/api/waiter/get/bill/details/${session_uuid}/0/2/`;

  const getBill = async () => {
    await axios
      .get(getBill_URL)
      .then((res) => {
        if (res.data.code === 200) {
          setBillData(res.data.data);
          setTaxItems(res.data.data.session_confirmed_item[0].item_with_taxes);
          setWithoutTaxItems(
            res.data.data.session_confirmed_item[0].item_without_taxes
          );
          //   console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBill();
  }, []);

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-start m-2">
        <h6 className="Bill_details fw-bold">
          Order Id : {billData && <span>{billData.order_id}</span>}
        </h6>
        <div className="d-flex flex-column justify-content-center align-items-start">
          <h6 className="Bill_details fw-bold">
            Date :{" "}
            {billData && (
              <span>{moment(billData.datetime).format("MMMM Do YYYY")}</span>
            )}
          </h6>
          <h6 className="Bill_details fw-bold">
            Time :{" "}
            {billData && (
              <span>{moment(billData.created_at).format("h:mm a")}</span>
            )}
          </h6>
        </div>
      </div>
      <div className="bill-card d-flex justify-content-center m-auto border rounded-4">
        <table className="table m-2">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">QTY</th>
              <th scope="col">Rate</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {taxItems &&
              taxItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.order_detail[0].item_name}</td>
                    <td>{item.order_detail[0].item_count}</td>
                    <td>{item.order_detail[0].item_price}</td>
                    <td>{item.order_detail[0].item_total_price}</td>
                  </tr>
                );
              })}
          </tbody>
          <tbody>
            <tr>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0">Sub Total</td>
              <td className="border-0">
                {billData && billData.item_with_taxes_total_exclude_tax}
              </td>
            </tr>
            {billData &&
              billData.taxes_calculation.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={
                        billData.taxes_calculation.length - 1 === index
                          ? ""
                          : "border-0"
                      }
                    ></td>
                    <td
                      className={
                        billData.taxes_calculation.length - 1 === index
                          ? ""
                          : "border-0"
                      }
                    ></td>
                    <td
                      className={
                        billData.taxes_calculation.length - 1 === index
                          ? ""
                          : "border-0"
                      }
                    >
                      {item.tax_name}
                    </td>
                    <td
                      className={
                        billData.taxes_calculation.length - 1 === index
                          ? ""
                          : "border-0"
                      }
                    >
                      {item.tax_amount}
                    </td>
                  </tr>
                );
              })}
            {withouttaxItems &&
              withouttaxItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.order_detail[0].item_name}</td>
                    <td>{item.order_detail[0].item_count}</td>
                    <td>{item.order_detail[0].item_price}</td>
                    <td>{item.order_detail[0].item_total_price}</td>
                  </tr>
                );
              })}
            <tr>
              <td className="border-0"></td>
              <td className="border-0"></td>
              <td className="border-0">Sub Total</td>
              <td className="border-0">
                {billData && billData.item_without_taxes_total}
              </td>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Bill Total</th>
              {billData && <th>{billData.total_after_service_tax}</th>}
            </tr>
            <tr>
              <th className="border-0"></th>
              <th className="border-0"></th>
              <th className="border-0">Amount to be paid</th>
              {billData && <th className="border-0">{billData.grand_total}</th>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bill;
