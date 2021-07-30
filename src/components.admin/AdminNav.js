import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Images/logo2.jpg";
import "../styles.admin/adminNav.css";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminInfo } from "../Data/Reducers/adminstore.reducer";

const AdminNav = () => {
  const adminusername = useSelector((state) => state.adminReducer).username;
  const email = useSelector((state) => state.adminReducer).email;
  const address = useSelector((state) => state.adminReducer).address;
  const phone = useSelector((state) => state.adminReducer).phone;

  const dispacth = useDispatch();

  const history = useHistory();

  const Logout = () => {
    const user = {
      _id: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    };
    // console.log("user: ", user);

    const token = "";
    const data = { user, token };
    const send = { data };

    dispacth(adminInfo({ send }));
  };

  if (adminusername === "" && email === "" && address === "" && phone === "") {
    history.push("/LoginSignup");
  }

  return (
    <>
      <div className="adminnav">
        <div className="dologo">
          <img src={logo} alt="logo=img" />
        </div>
        <div className="logotitle">
          <h3>Gold & Diamonds</h3>
        </div>
        <div className="logoname">
          <p>
            <span className="first">Rohit's Golds</span>
            <br />
            <span>Admin Pannel</span>
          </p>
        </div>
        <div className="navpart">
          <nav>
            <NavLink to="/adminpannel" activeClassName="active-link" exact>
              <h3>Home</h3>
            </NavLink>

            <NavLink
              to="/adminpannel/users"
              activeClassName="active-link"
              exact
            >
              <h3>users</h3>
            </NavLink>
            <NavLink
              to="/adminpannel/products/allProduct"
              activeClassName="active-link"
              exact
            >
              <h3>products</h3>
            </NavLink>
            <NavLink
              to="/adminpannel/UserChats"
              activeClassName="active-link"
              exact
            >
              <h3>UserChats</h3>
            </NavLink>
            <NavLink
              to="/adminpannel/feedback"
              activeClassName="active-link"
              exact
            >
              <h3>feedback</h3>
            </NavLink>
            <NavLink
              to="/adminpannel/orders/allorders"
              activeClassName="active-link"
              exact
            >
              <h3>orders</h3>
            </NavLink>

            <button className="btn" onClick={Logout}>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
