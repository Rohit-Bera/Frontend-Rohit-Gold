import React from "react";
import "../Style/footer.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clickedcollection } from "../Data/Reducers/hometocollection.reducer";
import { toast } from "react-toastify";

const Footer = () => {
  const icon = (e) => {
    // console.log("e", e.target.isConnected);

    if (e.target.isConnected) {
      toast.dark("sorry no links.", { position: "bottom-right" });
    }
  };

  const referesh = () => {
    window.location.reload();
  };

  return (
    <footer>
      <div className="foot-link">
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <Link to="/LoginSignup">profile</Link>
        </h3>
        <h3>
          <Link to="/Wishlist">wishlist</Link>
        </h3>
        <h3>
          <Link to="/Cart">Cart</Link>
        </h3>
      </div>
      <div className="foot-form">
        {/* <form>
          <h3>feedback</h3>
          <div className="foot-flex">
            <textarea></textarea>
            <button>send</button>
          </div>
        </form> */}

        <i class="fab fa-instagram" onClick={icon}></i>
        <i class="fab fa-facebook-square" onClick={icon}></i>
        <i class="fab fa-twitter" onClick={icon}></i>

        <div className="rb">
          <span></span>
          copyright under @rohitbera2021
        </div>
      </div>
    </footer>
  );
};

export default Footer;
