//this components only forms. MyProfile will render only when th user is signed in
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../Style/profile.css";
import { useSelector } from "react-redux";
import Header from "./Header";

const Forms = () => {
  const history = useHistory();

  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  if (username !== "" && email !== "" && address !== "" && phone !== "") {
    history.push("/Myprofile/Overview");
  }

  return (
    <>
      <Header />
      <div className="height">
        <div className="profile">
          <div className="login">
            <Link to="/Login" className="line btn">
              <button>Log-In</button>
            </Link>
          </div>
          <div className="signup">
            <Link to="/Signup" className="line btn">
              <button>Sign-Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
