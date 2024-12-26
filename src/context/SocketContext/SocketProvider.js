import { useState, useMemo, useEffect, useRef } from "react";
import SocketContext from "./SocketContext";
import _ from "lodash";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SocketProvider = ({ children }) => {
  const socketURL =
    process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION_ ||
    "https://localhost:8080";
  const dispatch = useDispatch();
  const socket = useMemo(() => io("https://localhost:8080"), []);
  const [me, setMe] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);

  const { user_id, tokem } = useSelector((state) => state.auth);
  useEffect(() => {
    if (socket) {
      socket.on("message_error", (err) => {
        toast.error(err);
      });
      socket.on("sms-sent", (messages) => {
        console.log("🚀 ~ socket.on ~ messages:", messages);
        setMessagesArray(messages);
      });
      socket.on("message_recieved", (messages) => {
        setMessagesArray(messages);
      });
      socket.emit("user-connected", user_id);
      socket.on("updated_me", (userData) => {
        // dispatch(updatedMe(userData));
      });
      socket.on("me", (id) => setMe(id));
    }
  }, [socket, user_id, dispatch]);

  const sendSMS = (params) => {
    console.log("🚀 ~ sendSMS ~ socket connected:", socket.connected);

    if (socket) {
      console.log("🚀 ~ sendSMS ~ socket connected:", socket.connected);
      socket.emit("send-sms", params);
    } else {
      console.error("Socket is not connected. Cannot send SMS.");
    }
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ me, sendSMS, messagesArray }),
    [me, sendSMS, messagesArray]
  );
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
