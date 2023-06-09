//message
import React, { useEffect, useRef } from "react";
import "../Style/message.css";
import { format } from "timeago.js";

import { useDispatch, useSelector } from "react-redux";
import { getMessageUserApi } from "../Data/Services/Oneforall";
import { messages } from "../Data/Reducers/chat.reducer";

const Message = () => {
  useEffect(() => {
    getMessage();
  });

  const dispatch = useDispatch();

  const conversationId = useSelector(
    (state) => state.chatReducer
  ).conversationId; // conversationId
  // console.log("conversationId: ", conversationId);

  const message = useSelector((state) => state.chatReducer).message; // messages
  // console.log("message: ", message);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const user_id = useSelector((state) => state.storeReducer)._id; // user id
  const token = useSelector((state) => state.storeReducer).token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getMessage = async () => {
    // console.log("conversationId: ", conversationId);

    const link = `https://goldapp-backend-server.onrender.com/getMessagesforUser/${conversationId}`;

    const response = await getMessageUserApi(link, headers);
    // console.log("response message: ", response);

    dispatch(messages({ response }));
  };

  if (message !== undefined) {
    return (
      <>
        {message.map((item) => {
          // console.log(item);
          if (item.sender === user_id) {
            return (
              <div className="message own" ref={scrollRef}>
                <div className="msgbody">
                  <div className="msgtop">{item.text}</div>
                  <div className="msgbottom">{format(item.createdAt)}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="message" ref={scrollRef}>
                <div className="msgbody">
                  <div className="msgtop">{item.text}</div>
                  <div className="msgbottom">{format(item.createdAt)}</div>
                </div>
              </div>
            );
          }
        })}
      </>
    );
  } else {
    return <>something went wrong</>;
  }
};

export default Message;
