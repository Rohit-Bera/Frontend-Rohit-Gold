import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUser } from "../Data/Services/Oneforall";
import AdminNav from "./AdminNav";
import "../styles.admin/adminUser.css";

import Loader from "react-loader-spinner";

const Adminusers = () => {
  useEffect(() => {
    getMembers();
  }, []);

  const [user, setUsers] = useState([]);

  const [loader, setLoader] = useState(false); // loaders state

  const [checkNull, setNull] = useState(false); //null state

  const getMembers = async () => {
    setLoader(true);
    const url = "https://goldapp-backend-server.onrender.com/getalluser";

    const response = await getAllUser(url);
    console.log("response: ", response.data);

    setUsers(response.data);
    if (response) {
      setLoader(false);

      const users = response.data;

      users.filter((item) => {
        if (item.userType < 1) {
          setNull(true);
        }
      });
    } else {
      setLoader(false);
    }
  };

  //   console.log("user: ", user);

  return (
    <>
      <AdminNav />
      <div>
        {checkNull ? (
          ""
        ) : (
          <div
            style={{
              color: "crimson",
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h3>No Users joined yet!</h3>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: "70px",
          }}
        >
          {loader ? (
            <Loader type="Puff" color="crimson" height={100} width={100} />
          ) : (
            ""
          )}
        </div>
        <div className="adminuser">
          <div className="users-container">
            {user.map((item) => {
              if (item.userType !== "admin") {
                return (
                  <div className="user-card">
                    <p>{item._id}</p>
                    <p>{item.username}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminusers;
