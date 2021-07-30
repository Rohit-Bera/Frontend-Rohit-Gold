import React from "react";
import "../Style/myprofile.overview.css";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../Data/Reducers/store.reducer";
import { conversation, messages } from "../Data/Reducers/chat.reducer";

const ProfileHeader = () => {
  const customerusername = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;

  const conversationId = useSelector(
    (state) => state.chatReducer
  ).conversationId; // conversationId
  // console.log("conversationId: ", conversationId);
  const message = useSelector((state) => state.chatReducer).message; // messages
  // console.log("message: ", message);

  const dispatch = useDispatch();

  const history = useHistory();

  const logOut = () => {
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

    dispatch(storeData({ send }));

    //for chat message

    const conversationId = "";
    dispatch(conversation({ conversationId }));

    const message = "";
    dispatch(messages({ message }));
  };

  if (
    customerusername === "" &&
    email === "" &&
    address === "" &&
    phone === ""
  ) {
    history.push("/LoginSignup");
  }
  return (
    <div>
      <div className="myprofile">
        <div className="myprofile-box">
          <div className="myaccount">
            <div>
              <h3>My Account</h3>
              <div className="flexi">
                <p>Hi, User...</p>
                <button className="left btn" onClick={logOut}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="overview">
            <NavLink
              to="/Myprofile/Overview"
              className="line"
              activeClassName="active"
              exact
            >
              <button className="btn">Overview</button>
            </NavLink>
          </div>
          <div className="account">
            <ul>
              <li>
                <span>Account</span>
              </li>
              <li>
                <NavLink
                  to="/Myprofile/Profile"
                  className="line"
                  activeClassName="active"
                  exact
                >
                  <button className="btn">Profile</button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Myprofile/Wishlist"
                  className="line"
                  activeClassName="active"
                  exact
                >
                  <button className="btn">My Wishlist</button>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="allorders">
            <ul>
              <li>
                <span>All Orders</span>
              </li>
              <li>
                <NavLink
                  to="/Myprofile/Myorders"
                  className="line"
                  activeClassName="active"
                  exact
                >
                  <button className="btn">My Orders</button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Myprofile/Toorder"
                  className="line"
                  activeClassName="active"
                  exact
                >
                  <button className="btn">Make to Order</button>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="allorders chatprofile">
            <ul>
              <li>
                <NavLink
                  to="/help/chat-with-helpCenter"
                  className="line"
                  activeClassName="active"
                  exact
                >
                  <button className="btn">Help center</button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
