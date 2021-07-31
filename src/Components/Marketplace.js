import React, { useState } from "react";
import "../Style/marketplace.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

//images
import rosegold from "../frontend/rose-gold.jpg";
import platinum from "../frontend/Platinum-web.jpg";
import wedding from "../frontend/wedding.jpg";
import mangalsutra from "../frontend/Mangalsutra-web.jpg";
import birthday from "../frontend/birthday.jpg";
import engagement from "../frontend/Engagement.jpg";
import festive from "../frontend/Festiv-gift.jpg";
import mother from "../frontend/Mothers-day.jpg";
import alphabet from "../frontend/alphabet.png";
import mangalsutraring from "../frontend/mangalsutraring.png";
import menplatinum from "../frontend/Menplatinum.png";
import zoul from "../frontend/zoul.png";
import envy from "../frontend/envy.png";

import { useSelector, useDispatch } from "react-redux";
import {
  allProduct,
  clickedcollection,
} from "../Data/Reducers/hometocollection.reducer";

//for slider
import Carousel, {
  slidesToShowPlugin,
  autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import Header from "./Header";
import { getProductApi } from "../Data/Services/Oneforall";
import { Link } from "react-router-dom";
import Footer from "./Mainfooter";

const Marketplace = () => {
  const { token } = useSelector((state) => state.storeReducer);
  // console.log("token: ", token);

  const headers = { headers: { Authorization: `Bearer ${token}` } };
  // console.log("headers: ", headers);

  const dispatch = useDispatch();

  const takename = (e) => {
    // console.log("product name: ", e.target.name);

    const collectionname = e.target.name;

    dispatch(clickedcollection({ collectionname }));
  };

  const allProducts = async () => {
    const url = "https://rohit-goldapp-backend.herokuapp.com/getProduct";

    const response = await getProductApi(url);
    // console.log("response: ", response.product.data);

    const products = response.product.data.product;

    dispatch(allProduct({ products }));
  };

  return (
    <>
      <Header />
      <div className="market">
        <div className="market">
          <div className="heading">
            <span></span>
            <h2>New Arrivals</h2>
            <span></span>
          </div>
          <div className="newsection1">
            <Link to="/home/allproducts">
              <button onClick={() => allProducts()}>
                All products <i class="fas fa-arrow-right"></i>
              </button>
            </Link>
            <Link to="/home/rose-gold">
              <img
                src={rosegold}
                name="rose-gold collection"
                onClick={takename}
              />
            </Link>
            <Link to="/home/wedding-jwellery">
              <img src={wedding} name="wedding jwellery" onClick={takename} />
            </Link>
          </div>

          <div className="newsection2">
            <Link to="/home/platinum-collection">
              <img
                src={platinum}
                name="platinum collection"
                onClick={takename}
              />
            </Link>
            <Link to="/home/mangalsutra-collection">
              <img
                src={mangalsutra}
                name="mangalsutra collection"
                onClick={takename}
              />
            </Link>
          </div>

          <div className="heading">
            <span></span>
            <h2>Our collections</h2>
            <span></span>
          </div>
          <div className="img-slider">
            <Carousel
              plugins={[
                "centered",
                "infinite",
                "arrows",
                {
                  resolve: slidesToShowPlugin,
                  autoplayPlugin,
                  options: {
                    numberOfSlides: 3,
                    interval: 4000,
                  },
                },
              ]}
              animationSpeed={1000}
            >
              <Link to="/home/love-alphabet-collection">
                <img
                  src={alphabet}
                  className="colpic"
                  name="love alphabet collection"
                  onClick={takename}
                />
              </Link>
              <Link to="/home/mangalsutra-ring-collection">
                <img
                  src={mangalsutraring}
                  className="colpic"
                  name="mangalsutra ring collection"
                  onClick={takename}
                />
              </Link>
              <Link to="/home/men-platinum-collection">
                <img
                  src={menplatinum}
                  className="colpic"
                  name="men platinum collection"
                  onClick={takename}
                />
              </Link>
              <Link to="/home/zoul-collection">
                <img
                  src={zoul}
                  className="colpic"
                  name="zoul collection"
                  onClick={takename}
                />
              </Link>
              <Link to="/home/envy-collection">
                <img
                  src={envy}
                  className="colpic"
                  name="envy collection"
                  onClick={takename}
                />
              </Link>
            </Carousel>
          </div>

          <div className="heading">
            <span></span>
            <h2>Gifts</h2>
            <span></span>
          </div>
          <div className="gifts-section">
            <div>
              <Link to="/home/birthday-collection">
                <img
                  src={birthday}
                  name="birthday collection"
                  onClick={takename}
                />
              </Link>
            </div>
            <div>
              <Link to="/home/engagement-collection">
                <img
                  src={engagement}
                  name="engagement collection"
                  onClick={takename}
                />
              </Link>
            </div>
            <div>
              <Link to="/home/festive-collection">
                <img
                  src={festive}
                  name="festive collection"
                  onClick={takename}
                />
              </Link>
            </div>
            <div>
              <Link to="/home/mothers-day-collection">
                <img
                  src={mother}
                  name="mothers day collection"
                  onClick={takename}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
