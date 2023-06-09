import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../Style/marketplace.css";

import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

import { postOrderApi } from "../Data/Services/Oneforall";

import history, { useHistory } from "react-router-dom";

// slider
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Footer from "./Mainfooter";

const ViewProduct = () => {
  //users
  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  //products
  const availableStatus = useSelector((state) => state.viewPro).availableStatus;
  // console.log("availablestatus: ", availableStatus);
  const category = useSelector((state) => state.viewPro).category;
  const collectionName = useSelector((state) => state.viewPro).collectionName;
  const price = useSelector((state) => state.viewPro).price;
  const productImage = useSelector((state) => state.viewPro).productImage;
  // console.log("productImage: ", productImage.length);
  const productName = useSelector((state) => state.viewPro).productName;
  const purity = useSelector((state) => state.viewPro).purity;
  const weight = useSelector((state) => state.viewPro).weight;
  const _id = useSelector((state) => state.viewPro)._id;

  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const history = useHistory();
  const [loader, setLoader] = useState(false); // loaders state

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const placeOrder = async () => {
    const data = {
      availableStatus,
      category,
      collectionName,
      price,
      productImage,
      productName,
      purity,
      weight,
      _id,
    };

    if (username === "" && email === "" && address === "" && phone === "") {
      return history.push("/LoginSignup");
    } else {
      const url = `https://goldapp-backend-server.onrender.com/placeorder?productId=${_id}`;

      const result = await postOrderApi(url, data, headers);
      // console.log("result: ", result);

      if (result.status == 200) {
        toast.success("added to cart", { position: "bottom-right" });
      } else {
        toast.error("something went wrong", { position: "bottom-right" });
      }
    }
  };

  if (productImage.length === 4) {
    return (
      <>
        <Header />
        <div className="view-product">
          <div className="view">
            <div className="img">
              <Carousel
                className="slider"
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2500}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .30s"
                transitionDuration={200}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[
                  "tablet",
                  "mobile",
                  "superLargeDesktop",
                  "desktop",
                ]}
                itemClass="carousel-item-padding-80-px"
              >
                <img src={productImage[0]} />
                <img src={productImage[1]} />
                <img src={productImage[2]} />
                <img src={productImage[3]} />
              </Carousel>
            </div>
            <div className="details">
              <h3>
                <span>Product Id </span> : {_id}
              </h3>
              <h3>
                <span>Product Name </span> : {productName}
              </h3>
              <h3>
                <span>Collection Name </span> : {collectionName}
              </h3>
              <h3>
                <span>Category </span> : {category}
              </h3>
              <h3>
                <span>Price </span> : {price}
              </h3>
              <h3>
                <span>Purity </span> : {purity}
              </h3>
              <h3>
                <span>Weight </span> : {weight}
              </h3>

              <label>
                <button onClick={placeOrder}>place order</button>
              </label>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (productImage.length === 3) {
    return (
      <>
        <Header />
        <div className="view-product">
          <div className="view">
            <div className="img">
              <Carousel
                className="slider"
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2500}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .30s"
                transitionDuration={200}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[
                  "tablet",
                  "mobile",
                  "superLargeDesktop",
                  "desktop",
                ]}
                itemClass="carousel-item-padding-80-px"
              >
                <img src={productImage[0]} />
                <img src={productImage[1]} />
                <img src={productImage[2]} />
              </Carousel>
            </div>
            <div className="details">
              <h3>
                <span>Product Id </span> : {_id}
              </h3>
              <h3>
                <span>Product Name </span> : {productName}
              </h3>
              <h3>
                <span>Collection Name </span> : {collectionName}
              </h3>
              <h3>
                <span>Category </span> : {category}
              </h3>
              <h3>
                <span>Price </span> : {price}
              </h3>
              <h3>
                <span>Purity </span> : {purity}
              </h3>
              <h3>
                <span>Weight </span> : {weight}
              </h3>

              <label>
                <button onClick={placeOrder}>place order</button>
              </label>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (productImage.length === 2) {
    return (
      <>
        <Header />
        <div className="view-product">
          <div className="view">
            <div className="img">
              <Carousel
                className="slider"
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2500}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .30s"
                transitionDuration={200}
                containerClass="carousel-container"
                removeArrowOnDeviceType={[
                  "tablet",
                  "mobile",
                  "superLargeDesktop",
                  "desktop",
                ]}
                itemClass="carousel-item-padding-80-px"
              >
                <img src={productImage[0]} />
                <img src={productImage[1]} />
              </Carousel>
            </div>
            <div className="details">
              <h3>
                <span>Product Id </span> : {_id}
              </h3>
              <h3>
                <span>Product Name </span> : {productName}
              </h3>
              <h3>
                <span>Collection Name </span> : {collectionName}
              </h3>
              <h3>
                <span>Category </span> : {category}
              </h3>
              <h3>
                <span>Price </span> : {price}
              </h3>
              <h3>
                <span>Purity </span> : {purity}
              </h3>
              <h3>
                <span>Weight </span> : {weight}
              </h3>

              <label>
                <button onClick={placeOrder}>place order</button>
              </label>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else if (productImage.length === 1) {
    return (
      <>
        <Header />
        <div className="view-product">
          <div className="view">
            <div className="img">
              <img src={productImage[0]} />
            </div>
            <div className="details">
              <h3>
                <span>Product Id </span> : {_id}
              </h3>
              <h3>
                <span>Product Name </span> : {productName}
              </h3>
              <h3>
                <span>Collection Name </span> : {collectionName}
              </h3>
              <h3>
                <span>Category </span> : {category}
              </h3>
              <h3>
                <span>Price </span> : {price}
              </h3>
              <h3>
                <span>Purity </span> : {purity}
              </h3>
              <h3>
                <span>Weight </span> : {weight}
              </h3>

              <label>
                <button onClick={placeOrder}>place order</button>
              </label>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
};

export default ViewProduct;
