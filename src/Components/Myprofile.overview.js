import React from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Mainfooter";

const Overview = () => {
  return (
    <>
      <Header />
      <div>
        <div className="myprofile">
          <ProfileHeader />
          <div className="overview-box">
            <div className="first">
              <Link to="/Myprofile/Profile">
                <button>
                  <i class="fas fa-user-circle"></i>
                  <h3>My Profile</h3>
                </button>
              </Link>
              <Link to="/Myprofile/Wishlist">
                <button>
                  <i class="fas fa-list"></i>
                  <h3>My Wishlist</h3>
                </button>
              </Link>
            </div>
            <div className="second">
              <Link to="/Myprofile/Myorders">
                <button>
                  <i class="fas fa-box-open"></i>
                  <h3>My Orders</h3>
                </button>
              </Link>
              <Link to="/Myprofile/Toorder">
                <button>
                  <i class="fas fa-boxes"></i>
                  <h3>To Order</h3>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Overview;
