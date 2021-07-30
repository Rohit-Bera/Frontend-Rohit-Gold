import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messages } from "../Data/Reducers/chat.reducer";
import { getMessageforAdminApi } from "../Data/Services/Oneforall";
import "../styles.admin/adminMessage.css";

import { format } from "timeago.js";

const AdminMessages = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const conversationId = useSelector(
    (state) => state.chatReducer
  ).conversationId; // current conversation

  const message = useSelector((state) => state.chatReducer).message; // messages
  // console.log("message: ", message);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const adminId = useSelector((state) => state.adminReducer)._id; //adminId
  const adminToken = useSelector((state) => state.adminReducer).token; //admintoken
  const headers = { headers: { Authorization: `Bearer ${adminToken}` } };

  return (
    <>
      {message.map((item) => {
        if (item.sender === adminId) {
          return (
            <div className="message own" ref={scrollRef}>
              <div>
                <div className="msgtop">{item.text}</div>
                <div className="msgbottom">{format(item.createdAt)}</div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="message" ref={scrollRef}>
              <div>
                <div className="msgtop">{item.text}</div>
                <div className="msgbottom">{format(item.createdAt)}</div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default AdminMessages;
