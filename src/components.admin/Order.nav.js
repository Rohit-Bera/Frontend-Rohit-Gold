import React, { useEffect, useState } from "react";

import "../styles.admin/order.nav.css";
import { NavLink, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { getallOrderApi } from "../Data/Services/Oneforall";

const Ordernav = () => {
  useEffect(() => {
    getOrder();
  }, []);

  const token = useSelector((state) => state.adminReducer).token;

  const [orders, setOrder] = useState(0); //for orders

  const [dispatch, setDispatch] = useState(0); // for delivered products

  const [undispatch, setUndispatch] = useState(0); // for undelivered products

  const getOrder = async () => {
    const url = "https://rohit-goldapp-backend.herokuapp.com/allorder";

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const result = await getallOrderApi(url, headers);

    // console.log("result.data :", result.data);

    setOrder(result.data.orders.length);
    // console.log("result.data.orders: ", result.data.orders);

    //for delievered product
    const Deliever = result.data.orders;

    let countDeliever = 0;
    Deliever.forEach((item) => {
      // console.log("item: ", item);
      if (item.delieveryStatus === true) {
        countDeliever++;
      }
    });

    // console.log("count of delievered :", countDeliever);
    setDispatch(countDeliever);

    const undeliver = result.data.orders;

    //for undelievered
    let countUndeliever = 0;
    undeliver.forEach((item) => {
      // console.log("item: ", item);
      if (item.delieveryStatus === false) {
        countUndeliever++;
      }
    });

    // console.log("count of undelievered :", countUndeliever);
    setUndispatch(countUndeliever);
  };

  return (
    <>
      <div className="order-nav">
        <nav>
          <div>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/orders/allorders"
            >
              <div className="total">
                <h3>Orders</h3>
                <p>{orders}</p>
              </div>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/orders/dispacth"
            >
              <div className="total">
                <h3>Delievered Product</h3>
                <p>{dispatch}</p>
              </div>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to="/adminpannel/orders/notdispatch"
            >
              <div className="total">
                <h3>Undelievered Product</h3>
                <p>{undispatch}</p>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Ordernav;
