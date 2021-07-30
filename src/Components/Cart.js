import React, { useEffect, useState } from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import product from "../Images/product.jpg";
import Loader from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { toast } from "react-toastify";
import { deleteOrderApi, getmyOrderApi } from "../Data/Services/Oneforall";
import Footer from "./Mainfooter";

const Cart = () => {
  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  useEffect(() => {
    myOrders();
  }, []);

  const [order, setMyorder] = useState([]);
  const dispatch = useDispatch();

  const history = useHistory();

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  if (username === "" && email === "" && address === "" && phone === "") {
    // toast.error("have account login / signup");
    history.push("/LoginSignup");
  }

  const myOrders = async () => {
    setLoader(true);
    const url = `http://localhost:5800/myorders`;

    const result = await getmyOrderApi(url, headers);

    // console.log("result : ", result);

    // console.log("result.product : ", result.myorders[0].product);
    // console.log("result.product : ", result.myorders);

    setMyorder(result.myorders);

    // if (result.myorders.length !== 0) {
    //   setNull(true);
    // }

    if (result) {
      setLoader(false);
      const order = result.myorders;
      order.filter((item) => {
        if (item.delieveryStatus === false) {
          setNull(true);
        }
      });
    } else {
      setLoader(false);
    }
  };

  const cancelOrder = async (item) => {
    setLoader(true);
    // console.log("item: ", item._id);

    const _id = item._id;

    const url = `http://localhost:5800/cancelorder/${_id}`;

    const result = await deleteOrderApi(url, headers, item);
    // console.log("response: ", result);

    if (result.status == 200) {
      toast.success("order deleted successfully! ", {
        position: "bottom-right",
      });
    } else if (result.status == 404) {
      toast.error("order not found ", { position: "bottom-right" });
    } else {
      toast.dark("something went wrong! ", { position: "bottom-right" });
    }

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }

    myOrders();

    window.location.reload();
  };

  return (
    <>
      <Header />
      <div>
        <div className="myprofile">
          <ProfileHeader />
          <div className="cart-box">
            <div className="heading">
              <span></span>
              <h2>Placed Orders</h2>
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
                <h3>No product added to cart</h3>
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
              if (item.delieveryStatus === false) {
                return (
                  <div className="product">
                    <div className="product-img">
                      <img src={item.product.productImage[0]} />
                    </div>
                    <div className="product-desc">
                      <h3> Order Id: {item._id} </h3>
                      <h3> {item.product.productName} </h3>
                    </div>
                    <div className="product-price">
                      <h3>{item.product.price} rs</h3>
                    </div>
                    <div className="product-button">
                      <button onClick={() => cancelOrder(item)}>
                        Delete Order
                      </button>
                    </div>
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

export default Cart;
