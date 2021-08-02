//messenger
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Mainfooter";
import "../Style/chat.css";
import ProfileHeader from "./Myprofile.header";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationUserApi,
  postConversationUserApi,
  postMessageUserApi,
  getMessageUserApi,
} from "../Data/Services/Oneforall";
import { conversation, messages } from "../Data/Reducers/chat.reducer";
import { Redirect, useHistory } from "react-router-dom";

const Chat = () => {
  useEffect(() => {
    getConversation();
    getMessage();
    getConversation();
    notifications();
  }, []);

  const conversationId = useSelector(
    (state) => state.chatReducer
  ).conversationId; // conversationId
  const message = useSelector((state) => state.chatReducer).message; // messages

  const user_id = useSelector((state) => state.storeReducer)._id; // user id

  //for postconversationUser
  const senderId = useSelector((state) => state.storeReducer)._id; // user id
  const receiverId = "60a7db30bab0b92c505d7d46"; //adminId

  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const [newMessage, setnewMessage] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  if (conversationId === undefined && message === undefined) {
    history.push("/LoginSignup");
  }
  const referesh = (e) => {
    e.preventDefault();
  };

  const takeInput = (e) => {
    const text = e.target.value;

    setnewMessage(text);
  };

  const postMessage = async () => {
    // console.log("input text message: ", newMessage);

    const message = {
      sender: user_id,
      text: newMessage,
      conversationId: conversationId,
    };

    const url = `https://rohit-goldapp-backend.herokuapp.com/postMessageforUser`;

    // dispatch(messages({ response }));

    const response = await postMessageUserApi(url, message, headers);

    // console.log("response post message: ", response);
  };

  const getConversation = async () => {
    const link = `https://rohit-goldapp-backend.herokuapp.com/getconversation/${user_id}`;

    const response = await getConversationUserApi(link, headers);
    // console.log("response conversation : ", response);

    if (response.length !== 0) {
      const [{ _id }] = response;
      // console.log("_id: ", _id);

      dispatch(conversation({ _id }));
    } else {
      const _id = "";
      dispatch(conversation({ _id }));
    }
    getMessage();
  };

  const getMessage = async () => {
    // console.log("conversationId: ", conversationId);

    const link = `https://rohit-goldapp-backend.herokuapp.com/getMessagesforUser/${conversationId}`;

    const response = await getMessageUserApi(link, headers);
    // console.log("response message: ", response);

    dispatch(messages({ response }));
  };
  // getMessage();

  const postConversationUser = async () => {
    const link = `https://rohit-goldapp-backend.herokuapp.com/postConversation`;

    const data = { senderId, receiverId }; // should be object and should be the same name as given
    // console.log("members: ", data);
    const response = await postConversationUserApi(link, data, headers);
    // console.log("response post convi: ", response);
  };

  //setTime intervall
  const notifications = () => {
    setInterval(function () {
      // console.log("its working");
      getMessage();
    }, 180000);

    clearTimeout(getMessage());
  };

  if (conversationId === "") {
    return (
      <>
        <Header />
        <div className="myprofile">
          <ProfileHeader />
          <div className="noconversation">
            <p>No conversation yet! :</p>
            <button onClick={postConversationUser}>Start conversation</button>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="myprofile">
          <ProfileHeader />
          <div className="chat-body">
            <div className="chat-container">
              <div className="chat">
                <div className="allchats">
                  <Message />
                </div>
                <div className="chat-submit">
                  <form onSubmit={referesh}>
                    <input
                      type="text"
                      name="txtmsg"
                      value={newMessage}
                      onChange={takeInput}
                    />
                    <button onClick={postMessage}>
                      <i class="far fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
};

export default Chat;
