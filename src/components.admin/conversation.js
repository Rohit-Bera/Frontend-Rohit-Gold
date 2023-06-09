import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserByIDApi } from "../Data/Services/Oneforall";
import "../styles.admin/adminMessenger.css";

//admin purpose only
const Conversation = (conversation) => {
  //   console.log("conversation : ", conversation);
  useEffect(() => {
    getUserId();
  }, []);

  const [username, setUsername] = useState([]);

  const adminId = useSelector((state) => state.adminReducer)._id; //adminId

  const api = "https://goldapp-backend-server.onrender.com";

  const customerId = conversation.conversation.members.find(
    (m) => m !== adminId
  );

  const getUserId = async () => {
    const url = `${api}/getUserById/${customerId}`;
    const response = await getUserByIDApi(url);
    console.log("response user: ", response);

    if (response.status === 500) {
      return null;
    } else {
      setUsername(response.userId.username);
    }
    console.log("username: ", response.userId.username);
  };

  if (username === undefined) {
    return <h3>no users</h3>;
  } else {
    return (
      <div className="conversation">
        <h3>{username}</h3>
      </div>
    );
  }
};

export default Conversation;
