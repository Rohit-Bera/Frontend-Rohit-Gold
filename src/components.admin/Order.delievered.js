import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Ordernav from "./Order.nav";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "../styles.admin/order.allorder.css";
import { getallOrderApi } from "../Data/Services/Oneforall";

const OrderDelievered = () => {
  useEffect(() => {
    getOrder();
  }, []);

  const token = useSelector((state) => state.adminReducer).token;

  const [loader, setLoader] = useState(false); // loaders state

  const [orders, setOrder] = useState([]);

  const [checkNull, setNull] = useState(false); //null state

  const getOrder = async () => {
    setLoader(true);

    const url = "http://localhost:5800/allorder";

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const result = await getallOrderApi(url, headers);

    // console.log("result :", result);

    setOrder(result.data.orders);
    // console.log("result.data.orders: ", result.data.orders);

    //null state
    if (result.data.orders.length === 0) {
      setNull(false);
    }

    const orderno = result.data.orders;
    // const count = 0;
    orderno.forEach((item) => {
      // console.log("item: ", item);
      if (item.delieveryStatus === true) {
        setNull(true);
      } else {
        setNull(false);
      }
    });

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      <AdminNav />
      <Ordernav />

      <div className="order-container">
        <div className="order-header">
          <div className="nav">
            <label>Order</label>
            <label>Owner</label>
            <label>Product</label>
          </div>
        </div>
        <div className="order-body">
          {checkNull ? (
            ""
          ) : (
            <div
              style={{
                color: "crimson",
                fontSize: "20px",
              }}
            >
              <h3>No orders left</h3>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: "70px",
            }}
          >
            {loader ? (
              <Loader type="Puff" color="crimson" height={100} width={100} />
            ) : (
              ""
            )}
          </div>

          {orders.map((item) => {
            //   console.log("item.owner: ", item.owner);
            //   console.log("item.product : ", item.product);
            if (
              item.delieveryStatus === true &&
              item.product.availableStatus === true
            ) {
              return (
                <div className="order-card">
                  <div className="order">
                    <p>OrderId : {item._id}</p>
                    <p className="available">
                      {item.delieveryStatus}
                      <div className="true"></div>delievered
                    </p>
                  </div>
                  <div className="owner">
                    <p> {item.owner.username} </p>
                    <p> {item.owner.email} </p>
                    <p> {item.owner.address} </p>
                    <p> {item.owner.phone} </p>
                  </div>
                  <div className="product">
                    <div>
                      <img src={item.product.productImage[0]} />
                    </div>
                    <div>
                      <p> {item.product.productName} </p>
                      <p> {item.product.category} </p>
                      <p> {item.product.collectionName} </p>
                      <p className="available">
                        {" "}
                        {item.product.availableStatus}
                        <div className="true"></div>available
                      </p>
                    </div>
                  </div>
                </div>
              );
            } //else {
            //   return (
            //     <div className="null">
            //       <h3>no products delievered yet</h3>
            //     </div>
            //   );
            // }
          })}
        </div>
      </div>
    </>
  );
};

export default OrderDelievered;
