import React, { useState } from "react";
import ProfileHeader from "./Myprofile.header";
import "../Style/allmyProfile.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Data/Services/Oneforall";
import { toast } from "react-toastify";
import { storeData } from "../Data/Reducers/store.reducer";
import Footer from "./Mainfooter";

const Editprofile = () => {
  const _id = useSelector((state) => state.storeReducer)._id;
  const username = useSelector((state) => state.storeReducer).username;
  const email = useSelector((state) => state.storeReducer).email;
  const address = useSelector((state) => state.storeReducer).address;
  const phone = useSelector((state) => state.storeReducer).phone;
  const password = useSelector((state) => state.storeReducer).password;

  //history state
  const history = useHistory();

  //update user state
  const [input, setInput] = useState({
    username: username,
    email: email,
    password: password,
    address: address,
    phone: phone,
  });

  //dispacth state
  const dispatch = useDispatch();

  // const [id, setId] = useState({ _id });

  const referesh = (e) => {
    e.preventDefault();
  };

  const takeinput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  const updateProfile = async () => {
    // console.log("_id: ", _id);
    const url = `https://rohit-goldapp-backend.herokuapp.com/updateuser/${_id}`;

    const send = await updateUser(url, input);
    // console.log("send update profile: ", send);

    if (send.error) {
      // setLoader(false);
      toast.error("update Failed ");
    } else {
      // setLoader(false);
      toast.success("updated Successfully");
    }

    const { password } = input;
    // console.log("password: ", password);
    dispatch(storeData({ send, password }));

    history.push("/Myprofile/Profile");
  };

  return (
    <>
      <div>
        <div className="myprofile">
          <ProfileHeader />
          <div className="mypofile-box">
            <div>
              <h2>Profile Details</h2>
            </div>
            <div>
              <form onSubmit={(e) => referesh(e)}>
                <div className="flexi stretch">
                  <h3>Username :</h3>
                  <h4>
                    <input
                      type="text"
                      name="username"
                      value={input.username}
                      onChange={takeinput}
                    />
                  </h4>
                </div>
                <div className="flexi stretch">
                  <h3>Email ID :</h3>
                  <h4>
                    <input
                      type="text stretch"
                      name="email"
                      value={input.email}
                      onChange={takeinput}
                    />
                  </h4>
                </div>
                <div className="flexi stretch">
                  <h3>Password :</h3>
                  <h4>
                    <input
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={takeinput}
                    />
                  </h4>
                </div>
                <div className="flexi stretch">
                  <h3>Address :</h3>
                  <h4>
                    <textarea
                      name="address"
                      value={input.address}
                      onChange={takeinput}
                    ></textarea>
                  </h4>
                </div>
                <div className="flexi stretch">
                  <h3>Phone :</h3>
                  <h4>
                    <input
                      type="text"
                      name="phone"
                      value={input.phone}
                      onChange={takeinput}
                    />
                  </h4>
                </div>
                <div className="flexi">
                  <button className="update btn" onClick={updateProfile}>
                    Update Profile
                  </button>
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

export default Editprofile;
