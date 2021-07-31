import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { postWishlistApi } from "../Data/Services/Oneforall";
import { Link } from "react-router-dom";
import { viewPro } from "../Data/Reducers/viewProduct.reducer";
import Header from "../Components/Header";
import Footer from "./Mainfooter";

const Searchproduct = () => {
  const search = useSelector((state) => state.searchedProduct).searchvalue; // search product
  const product = useSelector((state) => state.searchedProduct).products; // the result of search
  const data = product.product;
  // console.log("data: ", data);

  const history = useHistory(); //history state

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false); // loaders state

  //
  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  //add wishlist
  const addWishlist = async (item) => {
    // console.log("item: ", item);
    setLoader(true);
    // console.log("item id : ", item._id);

    if (username === "" && email === "" && address === "" && phone === "") {
      return history.push("/LoginSignup");
    } else {
      const { _id } = item;

      const url = `https://rohit-goldapp-backend.herokuapp.com/addtowishlist?productId=${_id}`;

      const result = await postWishlistApi(url, item, headers);

      // console.log("result: ", result);
      if (result) {
        setLoader(false);
      } else {
        setLoader(false);
      }

      if (result.status === 302) {
        toast.error("product exist in wishlist", { position: "bottom-right" });
      } else if (result.status === 200) {
        toast.success("added to wishlist", { position: "bottom-right" });
      } else {
        toast.error("something went wrong", { position: "bottom-right" });
      }
    }
  };

  const takeProduct = (item) => {
    // console.log("item: ", item);

    dispatch(viewPro({ item }));
  };

  if (data.length !== 0) {
    return (
      <>
        <Header />
        <div style={{ marginBottom: "10px" }}>
          <div className="market-product-container">
            <label>searching for results : {search}</label>
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
            <div className="market-product-body">
              {data.map((item) => {
                // console.log("item: ", item.productImage[0]);
                return (
                  <div className="product-card">
                    <div>
                      <img src={item.productImage[0]} />

                      <div className="headers">
                        <div>
                          <p>{item.productName}</p>
                          <span>Price : {item.price} &#8377;</span>
                        </div>
                        <div>
                          <Link to="/home/productcollection/viewproduct">
                            <button
                              className="view"
                              onClick={() => takeProduct(item)}
                            >
                              view product
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <span className="wishlist">
                      <i
                        class="fas fa-heart"
                        onClick={() => addWishlist(item)}
                      ></i>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="market-product-container">
          <div style={{ height: "47.7vh" }}>
            <label>searching for results : {search}</label>
            <h2 style={{ color: "crimson" }}>
              No products found for related searches
            </h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Searchproduct;
