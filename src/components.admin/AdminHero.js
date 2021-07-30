import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import "../styles.admin/adminHero.css";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  getallOrderApi,
  getAllProductApi,
  getAllUser,
  getProductApi,
} from "../Data/Services/Oneforall";
import Adminprofile from "./AdminProfile";

const Adminhero = () => {
  useEffect(() => {
    getUser();
    getProduct();
    getOrder();
  }, []);

  const token = useSelector((state) => state.adminReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const [loader, setLoader] = useState(false); // loaders state

  const [user, setUser] = useState(0); // user state

  const [product, setProduct] = useState(0); // product state

  const [order, setOrder] = useState(0); // order state

  const [feedback, setFeedback] = useState(0); // feedback state

  const getUser = async () => {
    setLoader(true);

    const url = `http://localhost:5800/getalluser`;

    const result = await getAllUser(url, headers);
    // console.log("result users: ", result.data);

    setUser(result.data.length - 1);

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getProduct = async () => {
    setLoader(true);

    const url = `http://localhost:5800/getallproduct`;

    const result = await getAllProductApi(url, headers);
    // console.log("result product: ", result);

    setProduct(result.data.allproducts.length);

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getOrder = async () => {
    setLoader(true);

    const url = `http://localhost:5800/allorder`;

    const result = await getallOrderApi(url, headers);
    // console.log("result order: ", result.data.orders.length);

    setOrder(result.data.orders.length);

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getFeedback = async () => {};

  return (
    <>
      <AdminNav />
      <div>
        <div className="herocontainer">
          <h2>Admin Pannel</h2>
          <Adminprofile />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "70px",
            }}
          >
            {loader ? (
              <Loader type="Puff" color="crimson" height={100} width={100} />
            ) : (
              <div style={{ marginTop: "-70px" }}>
                <div className="herocontent">
                  <div className="user-card">
                    <h3>Users</h3>
                    <p> {user} </p>
                  </div>
                  <div className="product-card">
                    <h3>Products</h3>
                    <p>{product}</p>
                  </div>
                  <div className="order-card">
                    <h3>Orders</h3>
                    <p> {order} </p>
                  </div>
                  <div className="feedback-card">
                    <h3>Feedback</h3>
                    <p>0</p>
                  </div>
                </div>
                <div className="second">
                  <div className="user"></div>
                </div>
              </div>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Adminhero;
