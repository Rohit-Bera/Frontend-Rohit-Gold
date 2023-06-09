import React, { useEffect, useState, useRef } from "react";
import AdminMessages from "./AdminMessages";
import AdminNav from "./AdminNav";
import "../styles.admin/adminMessenger.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationAdminApi,
  getMessageforAdminApi,
  postMessageforAdminApi,
} from "../Data/Services/Oneforall";
import Conversation from "./conversation";
import { conversation, messages } from "../Data/Reducers/chat.reducer";
import { useHistory } from "react-router-dom";

const AdminMessenger = () => {
  useEffect(() => {
    getConversation();
    notifications();
  }, []);

  const [conversations, setConversation] = useState([]);
  const [newMessage, setnewMessage] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentConversation = useSelector(
    (state) => state.chatReducer
  ).conversationId; // current conversation // conversationId
  // console.log("currentConversation: ", currentConversation);
  const message = useSelector((state) => state.chatReducer).message; // messages

  const adminId = useSelector((state) => state.adminReducer)._id; //adminId
  const adminToken = useSelector((state) => state.adminReducer).token; //admintoken
  const headers = { headers: { Authorization: `Bearer ${adminToken}` } };

  const api = "https://goldapp-backend-server.onrender.com";

  const takeInput = (e) => {
    const value = e.target.value;

    setnewMessage(value);
  };
  const referesh = (e) => {
    e.preventDefault();
  };

  const getConversation = async () => {
    const url = `${api}/getConversationforAdmin/${adminId}`;

    const response = await getConversationAdminApi(url, headers);
    // console.log("response admin conversation: ", response);
    setConversation(response);
  };

  const setCurrentConversation = (item) => {
    // console.log("item: ", item);

    const _id = item._id;

    dispatch(conversation({ _id }));

    getMessageforAdmin();

    history.push("/adminpannel/UserChats");
  };

  const getMessageforAdmin = async () => {
    const link = `${api}/getMessagesforAdmin/${currentConversation}`;

    const response = await getMessageforAdminApi(link, headers);
    // console.log("response admin message: ", response);

    dispatch(messages({ response }));
  };

  //setTime intervall
  const notifications = () => {
    setInterval(function () {
      // console.log("its working");
      getMessageforAdmin();
    }, 5000);
  };

  const postMessageofAdmin = async () => {
    // console.log("new message : ", newMessage);
    const message = {
      sender: adminId,
      text: newMessage,
      conversationId: currentConversation,
    };

    const link = `${api}/postMessageforAdmin`;

    const response = await postMessageforAdminApi(link, message, headers);
    // console.log("response: ", response);
    getMessageforAdmin();

    setnewMessage("");
  };

  return (
    <>
      <AdminNav />
      <div className="adminchatbody">
        <div className="adminchatcontainer">
          <div className="chatusers">
            {conversations.map((item) => (
              <div onClick={() => setCurrentConversation(item)}>
                <Conversation conversation={item} />
              </div>
            ))}
          </div>
          {currentConversation !== "" && message !== "" ? (
            <div className="adminchatbox">
              <div className="adminallchat">
                {message === undefined ? "" : <AdminMessages />}
              </div>
              <div className="adminInputs">
                <form onSubmit={referesh}>
                  <input
                    type="text"
                    name="txtmsg"
                    value={newMessage}
                    onChange={takeInput}
                  />
                  <button onClick={postMessageofAdmin}>
                    <i class="far fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <span className="noconversation">
              <p>open chat for conversation</p>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMessenger;
