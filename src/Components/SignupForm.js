import React from "react";
import "../Style/signup.css";
import Profile from "./Profile";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Myprofile from "./Myprofile.profile";
import { toast } from "react-toastify";
import { postUsersignup } from "../Data/Services/Oneforall";
import { useDispatch } from "react-redux";
import { storeData } from "../Data/Reducers/store.reducer";

const Signup = () => {
  //--------------------------------------------------------------states

  //post-data-state
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: null,
    address: "",
    phone: null,
  });

  //loader - state
  const [loader, setLoader] = useState(false);

  //redux state
  const dispatch = useDispatch();

  //history state
  const history = useHistory();

  //--------------------------------------------------------------functions

  //prevents referesh after refreshing
  const referesh = (e) => {
    //on submit it will not refersh
    e.preventDefault();
  };

  //takes input from users with name and value.
  const forminput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUsers({ ...users, [name]: value });
  };

  //post-api - post in database.
  const postUsers = async () => {
    // console.log("Users :", users);
    setLoader(true);
    const url = "https://goldapp-backend-server.onrender.com/signup";
    try {
      const send = await postUsersignup(url, users);
      // console.log("send signup profle: ", send);

      if (send.error) {
        setLoader(false);
        toast.error("signup Failed ");
      } else {
        setLoader(false);
        toast.success("SignedUp Successfully");
      }

      const { password } = users;
      // console.log("password: ", password);
      dispatch(storeData({ send, password }));

      return history.push("/Myprofile/Profile");
    } catch (error) {
      // console.log("error: ", error);
      setLoader(false);
    }
    setUsers({
      ...users,
      ["username"]: "",
      ["email"]: "",
      ["password"]: "",
      ["address"]: "",
      ["phone"]: "",
    });
  };

  return (
    <div>
      <Profile />
      <div className="signup-box">
        <div className="main-box">
          <form onSubmit={(e) => referesh(e)}>
            <div className="flexi">
              <h3>User-Name</h3>
              <input
                type="text"
                required
                name="username"
                value={users.username}
                onChange={forminput}
                placeholder="name.."
              />
            </div>
            <div className="flexi">
              <h3>Email</h3>
              <input
                type="text"
                required
                name="email"
                value={users.email}
                onChange={forminput}
                placeholder="email.."
              />
            </div>
            <div className="flexi">
              <h3>Password</h3>
              <input
                type="password"
                required
                name="password"
                value={users.password}
                onChange={forminput}
              />
            </div>
            <div className="flexi">
              <h3>Address</h3>
              <textarea
                className="add"
                required
                name="address"
                value={users.address}
                onChange={forminput}
                placeholder="residential address"
              ></textarea>
            </div>
            <div className="flexi">
              <h3>Phone</h3>
              <input
                type="text"
                required
                name="phone"
                value={users.phone}
                onChange={forminput}
                placeholder="phone no"
              />
            </div>
            <div className="flexi">
              <button className="btn" onClick={postUsers}>
                Register to continue
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {loader ? (
                <Loader
                  type="ThreeDots"
                  color="crimson"
                  height={80}
                  width={80}
                />
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
