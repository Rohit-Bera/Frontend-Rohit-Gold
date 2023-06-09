import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Ordernav from "./Order.nav";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "../styles.admin/order.allorder.css";
import { getallOrderApi } from "../Data/Services/Oneforall";

const OrdersAllOrders = () => {
  useEffect(() => {
    getOrder();
  }, []);

  const token = useSelector((state) => state.adminReducer).token;

  const [orders, setOrder] = useState([]);

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  const getOrder = async () => {
    setLoader(true);

    const url = "https://goldapp-backend-server.onrender.com/allorder";

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const result = await getallOrderApi(url, headers);

    // console.log("result :", result.data);

    setOrder(result.data.orders);
    // console.log("result.data.orders: ", result.data.orders);

    if (result.data.orders.length !== 0) {
      setNull(true);
    } else {
      setNull(false);
    }

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
              <h3>No orders</h3>
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
            } else if (
              item.delieveryStatus === false &&
              item.product.availableStatus === false
            ) {
              return (
                <div className="order-card">
                  <div className="order">
                    <p>OrderId : {item._id}</p>
                    <p className="available">
                      {item.delieveryStatus}
                      <div className="false"></div>not delievered
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
                        <div className="false"></div>available
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else if (
              item.delieveryStatus === false &&
              item.product.availableStatus === true
            ) {
              return (
                <div className="order-card">
                  <div className="order">
                    <p>OrderId : {item._id}</p>
                    <p>created : {item.createdAt} </p>
                    <p className="available">
                      {item.delieveryStatus}
                      <div className="false"></div>not delievered
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
            //       <h3>No Orders added yet</h3>
            //     </div>
            //   );
            // }
          })}
        </div>
      </div>
    </>
  );
};

export default OrdersAllOrders;
