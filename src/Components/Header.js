import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchedProduct } from "../Data/Reducers/searchProduct.reducer";
import logo from "../Images/logo2.jpg";
import "../Style/header.css";
import { getSearchedProductApi } from "../Data/Services/Oneforall";
import { toast } from "react-toastify";

const Header = () => {
  const [search, setSearch] = useState();

  const dispatch = useDispatch();

  const takeinput = (e) => {
    const value = e.target.value;

    setSearch(value);
  };

  const searchproduct = async () => {
    // console.log("searched product : ", search);

    // dispatch(searchedProduct({ search }));

    if (search === undefined || search === null) {
      return toast.error("enter search product", { position: "bottom-right" });
    }

    const url = `http://localhost:5800/getSearchProduct/${search}`;

    const response = await getSearchedProductApi(url);
    // console.log("response: ", response);

    const data = response.product.data;
    // console.log("data: ", data);

    dispatch(searchedProduct({ search, data }));
  };

  const referesh = (e) => {
    e.preventDefault();
  };

  return (
    <div className="appfile">
      <div>
        <div className="dologo">
          <img src={logo} alt="logo=img" />
        </div>
        <div className="logotitle">
          <h3>Gold & Diamonds</h3>
        </div>
      </div>
      <div className="logoname">
        <p>
          <span className="first">Rohit's Gold</span>
          <br />
          <span>
            Peace in <br />
            <span className="first">Beauty</span>
          </span>
        </p>
      </div>

      <div className="search">
        <form onSubmit={referesh}>
          <input
            type="text"
            name="searchproduct"
            value={search}
            onChange={takeinput}
          />
          <Link to="/home/searchproduct">
            <button class="btn" onClick={searchproduct}>
              <i class="fas fa-search"></i>
            </button>
          </Link>
        </form>
      </div>

      <div className="navbar">
        <div className="nav-in">
          <i class="fas fa-home"></i>
          <Link to="/" className="line">
            <p>Home</p>
          </Link>
        </div>
        <div className="nav-in">
          <i class="far fa-user"></i>

          <Link to="/LoginSignup" className="line">
            <p>Profile</p>
          </Link>
        </div>
        <div className="nav-in">
          <i class="far fa-heart"></i>

          <Link to="/Wishlist" className="line">
            <p>Wishlist</p>
          </Link>
        </div>
        <div className="nav-in">
          <i class="fas fa-shopping-cart"></i>

          <Link to="/Cart" className="line">
            <p>Cart</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
