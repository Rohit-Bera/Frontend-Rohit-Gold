import React from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import product from "../Images/product.jpg";
import { useState, useEffect } from "react";

import Loader from "react-loader-spinner";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import {
  deleteWishlistApi,
  getWishlistApi,
  postOrderApi,
} from "../Data/Services/Oneforall";
import { toast } from "react-toastify";
import Footer from "./Mainfooter";

const Wishlist = () => {
  useEffect(() => {
    myWishlist();
  }, []);

  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  //auth
  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const dispacth = useDispatch();

  const history = useHistory();

  const [list, setList] = useState([]);

  const [checkNull, setNull] = useState(false); //null state

  const [loader, setLoader] = useState(false); // loaders state

  if (username === "" && email === "" && address === "" && phone === "") {
    history.push("/LoginSignup");
  }

  const myWishlist = async () => {
    setLoader(true);
    const url = `https://rohit-goldapp-backend.herokuapp.com/mywishlist`;

    const result = await getWishlistApi(url, headers);

    // console.log("result: ", result);

    setList(result.like);

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }

    if (result.like.length !== 0) {
      setNull(true);
    }
  };

  const removeWishlist = async (item) => {
    setLoader(true);
    // console.log("item: ", item);

    const url = `https://rohit-goldapp-backend.herokuapp.com/removefromlist/${item._id}`;

    const result = await deleteWishlistApi(url, headers, item);

    // console.log("result", result);

    if (result.status === 200) {
      toast.success("removed from wishlist", { position: "bottom-right" });
    } else {
      toast.error("something went wrong", { position: "bottom-right" });
    }

    if (result) {
      setLoader(false);
    } else {
      setLoader(false);
    }

    myWishlist();
    window.location.reload();
  };

  const buyNow = async (item) => {
    setLoader(true);
    // console.log("item: ", item.product._id);

    const _id = item.product._id;

    const url = `https://rohit-goldapp-backend.herokuapp.com/placeorder?productId=${_id}`;

    const result = await postOrderApi(url, item, headers);
    // console.log("result: ", result);

    if (result.data.status === 200) {
      toast.success("added to cart", { position: "bottom-right" });
    } else if (result.data.status === 302) {
      toast.error("product already exist", { position: "bottom-right" });
    } else {
      toast.error("something went wrong", { position: "bottom-right" });
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
          <div className="wishlist-box">
            <div className="heading">
              <span></span>
              <h2>Wishlist</h2>
              <span></span>
            </div>
            <div>
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
                  <Loader
                    type="Puff"
                    color="crimson"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                ""
              )}
              {list.map((item) => {
                // console.log("item: ", item);
                // console.log("list: ", list.length);

                return (
                  <div className="product">
                    <div className="product-img">
                      <img src={item.product.productImage[0]} />
                    </div>
                    <div className="product-desc">
                      <div>
                        <h3> {item.product.productName} </h3>
                        <h3> {item.product.collectionName} </h3>
                        <h3> {item.product.category} </h3>
                      </div>
                      <div>
                        <h3>{item.product.purity}</h3>
                        <h3>{item.product.weight}</h3>
                      </div>
                    </div>
                    <div className="product-price">
                      <h3>{item.product.price}</h3>
                    </div>
                    <div className="product-button">
                      <button onClick={() => removeWishlist(item)}>
                        Remove from Wishlist
                      </button>
                      <button onClick={() => buyNow(item)}>Order Now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
