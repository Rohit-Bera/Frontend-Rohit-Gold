import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import "../styles.admin/adminProfile.css";

const Adminprofile = () => {
  const history = useHistory();

  const username = useSelector((state) => state.adminReducer).username;
  const email = useSelector((state) => state.adminReducer).email;
  const address = useSelector((state) => state.adminReducer).address;
  const phone = useSelector((state) => state.adminReducer).phone;

  return (
    <>
      {/* <AdminNav /> */}
      <div>
        <div className="adminprofile">
          <div className="adminprofile-box">
            <div>
              <h2>Admin Profile Details</h2>
            </div>
            <div>
              <form>
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
                {/* <div className="flexi">
                  <Link to="/Myprofile/Edit" className="btn">
                    <button>Edit Profile</button>
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminprofile;
