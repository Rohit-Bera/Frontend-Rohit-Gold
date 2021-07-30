import React, { useEffect, useState } from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import product from "../Images/product.jpg";
import Header from "./Header";

import Loader from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { getmyOrderApi } from "../Data/Services/Oneforall";
import Footer from "./Mainfooter";

const Myorders = () => {
  useEffect(() => {
    myOrders();
  }, []);

  const [order, setMyorder] = useState([]);

  const [checkNull, setNull] = useState(false); //null state

  const [loader, setLoader] = useState(false); // loaders state

  const token = useSelector((state) => state.storeReducer).token;
  // console.log("token: ", token);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const myOrders = async () => {
    const url = `http://localhost:5800/myorders`;

    const result = await getmyOrderApi(url, headers);

    // console.log("result : ", result);

    // console.log("result.product : ", result.myorders[0].product);
    // console.log("result.product : ", result.myorders);

    setMyorder(result.myorders);

    if (result.myorders.length !== 0) {
      setNull(true);
    }

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="myprofile">
          <ProfileHeader />
          <div className="myorder-box">
            <div className="heading">
              <span></span>
              <h2>My Orders</h2>
              <span></span>
            </div>
            {checkNull ? (
              ""
            ) : (
              <div
                style={{
                  color: "crimson",
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>No product added to wishlist</h3>
              </div>
            )}
            {loader ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Loader type="Puff" color="crimson" height={100} width={100} />
              </div>
            ) : (
              ""
            )}
            {order.map((item) => {
              // console.log("item: ", item);

              if (item.delieveryStatus === true) {
                return (
                  <div className="product">
                    <div className="product-img">
                      <img src={item.product.productImage[0]} />
                    </div>
                    <div className="product-desc">
                      <h3> Order Id: {item._id} </h3>
                      <h3> {item.product.productName} </h3>

                      <p> {item.product.weight} </p>
                      <p> {item.product.category} </p>
                      <p> {item.product.collectionName} </p>
                    </div>
                    <div className="product-price">
                      <h3>{item.product.price} rs</h3>
                    </div>
                    <div className="product-status">
                      <h3>Delievered</h3>
                    </div>
                  </div>
                );
              } else if (item.delieveryStatus === false) {
                return (
                  <div className="product">
                    <div className="product-img">
                      <img src={item.product.productImage[0]} />
                    </div>
                    <div className="product-desc">
                      <h3> Order Id: {item._id} </h3>
                      <h3> {item.product.productName} </h3>
                      <p> {item.product.weight} </p>
                      <p> {item.product.category} </p>
                      <p> {item.product.collectionName} </p>
                    </div>
                    <div className="product-price">
                      <h3>{item.product.price} rs</h3>
                    </div>
                    <div className="product-status">
                      <h3>Not delievered</h3>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="null">
                    <h3>no product ordered yet</h3>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myorders;
