import React, { useState } from "react";
// import {} from "../Data/Reducers/hometocollection.reducer"
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Mainfooter";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { viewPro } from "../Data/Reducers/viewProduct.reducer";
import { toast } from "react-toastify";
import { postWishlistApi } from "../Data/Services/Oneforall";
import { Link } from "react-router-dom";

const Allproducts = () => {
  const products = useSelector((state) => state.allProduct).products;
  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;
  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const [loader, setLoader] = useState(false); // loaders state

  const dispatch = useDispatch();
  const history = useHistory();

  const addWishlist = async (item) => {
    // console.log("item: ", item);
    // console.log("item id : ", item._id);

    if (username === "" && email === "" && address === "" && phone === "") {
      return history.push("/LoginSignup");
    } else {
      const { _id } = item;

      const url = `https://goldapp-backend-server.onrender.com/addtowishlist?productId=${_id}`;

      const result = await postWishlistApi(url, item, headers);

      // console.log("result: ", result);

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

  return (
    <>
      <Header />

      <div className="market-product-container">
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
          {products.map((item) => {
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
                  <i class="fas fa-heart" onClick={() => addWishlist(item)}></i>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Allproducts;
