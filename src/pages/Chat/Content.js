import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClaimedNumbersApi,
  getUserMessages,
} from "../../redux/services/twilio";
import useSocket from "../../context/SocketContext/useSocket";
const Content = () => {
  const lastMessageRef = useRef(null); // Ref for the last message

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      console.log(
        "🚀 ~ scrollToBottom ~ lastMessageRef.current:",
        lastMessageRef.current.scrollHeight
      );
      lastMessageRef.current.scrollTo({
        top: lastMessageRef.current.scrollHeight,
        behavior: "smooth", // Optional: adds a smooth scrolling effect
      });
    }
  };

  // Scroll to the last message when messages change

  const dispatch = useDispatch();
  const { user, token, user_id } = useSelector((state) => state.auth);
  const { sendSMS, messagesArray } = useSocket();
  const { claimedNumbers, sms } = useSelector((state) => state.twilio);
  const [defaultMessages, setDefaultMessages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [claimedPhoneNumber, setClaimedPhoneNumber] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputValue, setInputValue] = useState();
  // Scroll whenever `currentMessages` change
  useEffect(() => {
    if (claimedNumbers) setClaimedPhoneNumber(claimedNumbers);
    return () => {};
  }, [claimedNumbers]);
  useEffect(() => {
    if (messagesArray) setDefaultMessages(messagesArray);
    return () => {};
  }, [messagesArray]);
  useEffect(() => {
    if (sms) setDefaultMessages(sms);
    return () => {};
  }, [sms]);
  useEffect(() => {
    // Check if both numbers are in the claimedNumbers array
    const myNumbersArray = claimedPhoneNumber.map((item) => item.phoneNumber);

    const chatRooms = Array.from(
      new Set(
        defaultMessages
          .map((message) => {
            // Check if any of your numbers are in the `from` field
            if (myNumbersArray.includes(message.from)) {
              return message.to;
            }
            // Check if any of your numbers are in the `to` field
            if (myNumbersArray.includes(message.to)) {
              return message.from;
            }
            return null;
          })
          .filter((number) => number !== null) // Remove null values
      )
    );
    const fileteredMessages = defaultMessages?.filter((message) =>
      claimedPhoneNumber.some(
        (number) =>
          number.phoneNumber === message.to ||
          number.phoneNumber === message.from
      )
    );
    setFilteredData(chatRooms);
  }, [claimedPhoneNumber, defaultMessages]);

  const handleCurrentMessages = (number) => {
    const filteredMessages = defaultMessages?.filter(
      (msg) => msg.from === number || msg.to === number
    );
    const sortedData = filteredMessages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    setCurrentMessages(sortedData);
    setSelectedMessage(number);
    scrollToBottom();
  };
  useEffect(() => {
    dispatch(
      getClaimedNumbersApi(token, {
        accountSid: user.accountSid,
        authToken: user.authToken,
      })
    );
    dispatch(
      getUserMessages(token, {
        accountSid: user?.accountSid,
        authToken: user?.authToken,
      })
    );
    return () => {};
  }, [token, dispatch, user]);
  useEffect(() => {
    const lastMessageElement = document.getElementById("lastMessage");
    if (lastMessageElement) {
      lastMessageElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    if (event.key === "Enter") {
      const params = {
        userId: user_id,
        authToken: user.authToken,
        accountSid: user.accountSid,
        from: user.twilio_selected_number,
        body: inputValue,
        to: selectedMessage,
        from_name: user?.firstname + " " + user.lastname,
      };
      const newMessage = {
        user_id: user_id,
        body: inputValue,
        from: user.twilio_selected_number,
        to: selectedMessage,
        dateSent: new Date(),
      };
      setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
      await sendSMS(params);
    }
  };
  return (
    <div>
      <div className="h-[90vh] overflow-hidden">
        {/* <!-- component --> */}
        {/* <!-- This is an example component --> */}
        <div className=" container mx-auto shadow-lg border">
          {/* <!-- headaer --> */}
          <div className="px-5 py-5 flex justify-between items-center bg-white dark:bg-gray-900 border-b-2">
            <div className="font-semibold text-2xl">Conversations</div>
          </div>
          {/* <!-- end header --> */}
          {/* <!-- Chatting --> */}
          <div className="flex flex-row justify-between bg-white dark:bg-gray-900 h-[81vh]">
            {/* <!-- chat list --> */}
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              {/* <!-- search compt --> */}
              <div className="border-b-2 py-4 px-3">
                <input
                  type="text"
                  placeholder="search chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full "
                />
              </div>
              {/* <!-- end search compt -->
        <!-- user list --> */}
              {Array.isArray(filteredData) &&
                filteredData?.map((msg, index) => {
                  const filteredData = defaultMessages.filter(
                    (key) => key.to === msg
                  );
                  const lastIndex = filteredData?.length - 1;
                  const lastMessage = filteredData[lastIndex];
                  const lastBody = lastMessage.body;
                  return (
                    <div
                      className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-600 hover:bg-opacity-25 cursor-pointer 
                      ${msg === selectedMessage ? "bg-gray-300" : ""}
                      `}
                      key={index}
                      onClick={() => handleCurrentMessages(msg)}
                    >
                      <div className="w-full px-2">
                        <div className="text-lg font-semibold">{msg}</div>
                        <span className="text-gray-500 flex flex-row-reverse justify-between">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: lastBody.slice(0, 20),
                            }}
                          ></span>
                          <span className="text-gray-400 relative">
                            <div className="absolute bottom-0 w-52">
                              {moment(lastMessage?.dateSent).format(
                                "DD MMM YYYY"
                              )}
                            </div>
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}

              {/* <!-- end user list --> */}
            </div>
            {/* <!-- end chat list -->
      <!-- message --> */}
            <div className="w-full relative">
              <div className="border-b py-[2.7vh] px-2 font-extrabold">
                {selectedMessage || "."}
              </div>

              <div className="w-full px-5 flex flex-col justify-between">
                <div
                  className=" h-[65vh] py-5  w-full overflow-scroll"
                  ref={lastMessageRef}
                  id="currentMessages"
                >
                  {Array.isArray(currentMessages) ? (
                    currentMessages?.map((msg, index) => (
                      <div key={index}>
                        <div className="flex flex-col mt-5">
                          {msg?.from === selectedMessage?.from ? (
                            <div className="flex justify-start mb-4">
                              <div
                                className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white float-start"
                                dangerouslySetInnerHTML={{ __html: msg.body }}
                              ></div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex justify-end  mb-4">
                                <div
                                  className="mr-2 w-fit py-3 px-4 bg-blue-400 float-start rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                  dangerouslySetInnerHTML={{ __html: msg.body }}
                                ></div>
                                <span className="text-xs">
                                  {moment(msg?.dateSent).format("DD MMM YYYY")}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="py-5 absolute bottom-5 w-[95%]">
                          <input
                            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                            type="text"
                            onKeyUp={handleFormSubmit}
                            onChange={handleInputChange}
                            placeholder="type your message here..."
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
