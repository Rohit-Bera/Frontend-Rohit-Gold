import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Ordernav from "./Order.nav";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import "../styles.admin/order.undeliver.css";
import { getallOrderApi, updateOrderApi } from "../Data/Services/Oneforall";
import { toast } from "react-toastify";

const OrderUndelievered = () => {
  useEffect(() => {
    getOrder();
  }, []);

  const token = useSelector((state) => state.adminReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const [orders, setOrder] = useState([]);

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  const [status, setStatus] = useState({
    delieveryStatus: false,
    owner: {},
    product: {},
    _id: "",
  });

  const getOrder = async () => {
    setLoader(true);
    const url = "https://goldapp-backend-server.onrender.com/allorder";

    const result = await getallOrderApi(url, headers);

    // console.log("result :", result.data);

    setOrder(result.data.orders);
    // console.log("result.data.orders: ", result.data.orders);

    //null state
    if (result.data.orders.length === 0) {
      setNull(false);
    } else {
      setNull(true);
    }

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const takeStatus = (item) => {
    // console.log("item : ", item);

    // console.log("item.delieveryStatus : ", item.delieveryStatus);

    setStatus({
      delieveryStatus: true,
      owner: item.owner,
      product: item.product,
      _id: item._id,
    });
  };

  const delievereProduct = async () => {
    setLoader(true);
    // console.log("status state : ", status);

    const id = status._id;
    const url = `https://goldapp-backend-server.onrender.com/updateorder/${id}`;

    const result = await updateOrderApi(url, status, headers);

    getOrder();

    setStatus({
      delieveryStatus: false,
      owner: {},
      product: {},
      _id: "",
    });

    // console.log("result.data.success: ", result.sucess);

    if (result.status === 200) {
      setLoader(false);
      toast.success("delievered successfull");
    } else {
      setLoader(false);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <AdminNav />
      <Ordernav />

      <div className="order-container-dispatch">
        <div className="order-header-dispatch">
          <div className="nav">
            <label>Order</label>
            <label>Owner</label>
            <label>Product</label>
          </div>
        </div>
        <div className="order-body-dispatch">
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
            // console.log(" checknull : ", checkNull);
            if (checkNull === false) {
              return (
                <div
                  style={{
                    color: "crimson",
                    fontSize: "20px",
                  }}
                >
                  <h3>All products are delievered</h3>
                </div>
              );
            } else {
              if (
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
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="availableStatus"
                          // checked={product.availableStatus}
                          onClick={() => takeStatus(item)}
                        />
                        <span className="slider" />
                      </label>
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
                          {item.product.availableStatus}
                          <div className="false"></div>available
                        </p>
                      </div>
                    </div>
                    <div className="btn">
                      <button onClick={delievereProduct}>Deliever</button>
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
                      <p className="available">
                        {item.delieveryStatus}
                        <div className="false"></div>not delievered
                      </p>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="availableStatus"
                          // checked={product.availableStatus}
                          onClick={() => takeStatus(item)}
                        />
                        <span className="slider" />
                      </label>
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
                    <div className="btn">
                      <button onClick={delievereProduct}>Deliever</button>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </>
  );
};

export default OrderUndelievered;
