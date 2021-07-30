import React from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Mainfooter";

const Profile = () => {
  const history = useHistory();

  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;
  const _id = useSelector((state) => state.storeReducer)._id;

  if (username === "" && email === "" && address === "" && phone === "") {
    history.push("/Profile");
  }

  return (
    <>
      <Header />
      <div>
        <div className="myprofile">
          <ProfileHeader />
          <div className="mypofile-box">
            <div>
              <h2>Profile Details</h2>
            </div>
            <div>
              <form>
                <div className="flexi">
                  <h3>User ID :</h3>
                  <h4>{_id}</h4>
                </div>
                <div className="flexi">
                  <h3>Username :</h3>
                  <h4>{username}</h4>
                </div>
                <div className="flexi">
                  <h3>Email ID :</h3>
                  <h4>{email} </h4>
                </div>
                <div className="flexi">
                  <h3>Address :</h3>
                  <h4>{address}</h4>
                </div>
                <div className="flexi">
                  <h3>Phone :</h3>
                  <h4>{phone}</h4>
                </div>
                <div className="flexi">
                  <Link to="/Myprofile/Edit" className="btn">
                    <button>Edit Profile</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
