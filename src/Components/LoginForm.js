import React from "react";
import "../Style/login.css";
import Profile from "./Profile";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import { postUsersignin } from "../Data/Services/Oneforall";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../Data/Reducers/store.reducer";
import { adminInfo } from "../Data/Reducers/adminstore.reducer";

const Login = () => {
  //---------------------------------------------states
  //post-state
  // const userType = useSelector((state) => state.storeReducer).userType;

  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: null,
  });

  //loader state
  const [loader, setLoader] = useState(false);

  //dispatch state
  const dispatch = useDispatch();

  //history state

  const history = useHistory();
  //---------------------------------------------Functions

  //referesh func.
  const referesh = (e) => {
    e.preventDefault();
    //on submitting doesn't refersh.
  };

  //form Input
  const forminput = (e) => {
    //to get input from user.
    const name = e.target.name;
    const value = e.target.value;
    setUsers({ ...users, [name]: value });
  };

  //post-api
  const postData = async () => {
    // console.log("users : ", users);
    const url = "https://rohit-goldapp-backend.herokuapp.com/signin";
    setLoader(true);
    try {
      const send = await postUsersignin(url, users);
      // console.log("send: ", send);

      const { userType } = send.data.user;
      // console.log("userType: ", userType);

      // console.log("send.error: ", send.error);

      if (send) {
        setLoader(false);
        toast.success("Login Success!");
      }

      if (userType === "admin") {
        dispatch(adminInfo({ send }));
        history.push("/adminpannel");
      } else {
        dispatch(storeData({ send }));
      }

      // history.push("/Myprofile/Overview");
    } catch (error) {
      // console.log("error: ", error);
      setLoader(false);
      toast.error("Login Failed");
    }
    setUsers({ ...users, ["username"]: "", ["email"]: "", ["password"]: "" });
  };

  return (
    <div>
      <Profile />
      <div className="login-box">
        <div className="main-box">
          <form on onSubmit={(e) => referesh(e)}>
            <div className="flexi">
              <h3>User-Name</h3>
              <input
                type="text"
                required
                name="username"
                value={users.username}
                placeholder="Username"
                onChange={forminput}
              />
            </div>
            <div className="flexi">
              <h3>Email-Id</h3>
              <input
                type="text"
                required
                name="email"
                value={users.email}
                placeholder="email"
                onChange={forminput}
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
              <div>
                <button className="one btn" onClick={postData}>
                  Login
                </button>
              </div>
              {/* <div>
                <button className="two btn">Forgot Password ??</button>
              </div> */}
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

export default Login;
