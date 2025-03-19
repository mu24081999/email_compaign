import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClaimedNumbersApi,
  getUserMessages,
} from "../../redux/services/twilio";
import useSocket from "../../context/SocketContext/useSocket";
import Tabs from "../../components/Tabs";
import { load } from "cheerio";
import _ from "lodash";

import { LiaLocationArrowSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
const initialContacts = [
  // {
  //   id: 1,
  //   name: "Sarah Wilson",
  //   phone: "+1 (555) 123-4567",
  // },
  // {
  //   id: 2,
  //   name: "John Cooper",
  //   phone: "+1 (555) 234-5678",
  // },
  // {
  //   id: 3,
  //   name: "Emily Davis",
  //   phone: "+1 (555) 345-6789",
  // },
];

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
  console.log("🚀 ~ Content ~ filteredData:", filteredData);
  const [claimedPhoneNumber, setClaimedPhoneNumber] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [showA2PToast, setShowA2PToast] = useState(false);
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
    event.preventDefault();
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
      // setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
      // await sendSMS(params);
      setShowA2PToast(true);
    }
  };

  function htmlToText(html) {
    const $ = load(html);
    return $.text().trim();
  }

  const [selectedChat, setSelectedChat] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState(initialContacts);
  const [showContacts, setShowContacts] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendSMS = (e) => {
    e.preventDefault();
    // Handle SMS sending logic here
    console.log("Sending SMS to:", newNumber, "Message:", newMessage);
    setIsAddModalOpen(false);
    setNewNumber("");
    setNewMessage("");
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    const newContactData = {
      id: contacts.length + 1,
      name: newContact.name,
      phone: newContact.phone,
    };
    setContacts([...contacts, newContactData]);
    setNewContact({ name: "", phone: "" });
    setIsAddContactModalOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessageObj = {
      id: selectedChat.messages.length + 1,
      text: currentMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessageObj],
      lastMessage: currentMessage,
      time: "Just now",
    };

    setSelectedChat(updatedChat);
    setCurrentMessage("");
  };
  return (
    <div>
      <div className="h-[90vh] flex">
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowContacts(false)}
                className={`text-lg font-bold ${
                  !showContacts ? "text-primary" : "text-gray-600"
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setShowContacts(true)}
                className={`text-lg font-bold ${
                  showContacts ? "text-primary" : "text-gray-600"
                }`}
              >
                Contacts
              </button>
            </div>
            <button
              onClick={() => {
                if (showContacts) {
                  setShowA2PToast(true);
                  setIsAddContactModalOpen(true);
                } else {
                  setIsAddModalOpen(true);
                  setShowA2PToast(true);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {!showContacts
              ? filteredData?.map((conversation) => {
                  const filteredData = defaultMessages.filter(
                    (key) => key.to === conversation
                  );
                  const lastIndex = filteredData?.length - 1;
                  const lastMessage = filteredData[lastIndex];
                  const lastBody = lastMessage.body;
                  return (
                    <div
                      key={conversation}
                      onClick={() => handleCurrentMessages(conversation)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors `}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">
                          {conversation}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {lastMessage?.createdAt
                            ? moment(lastMessage?.createdAt).format("MMM DD")
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {htmlToText(lastBody)?.slice(0, 40)}
                      </p>
                      {/* {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )} */}
                    </div>
                  );
                })
              : // Contacts List
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {contact.phone}
                    </p>
                  </div>
                ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className=" md:flex flex-1 bg-gray-50 flex-col">
          {selectedMessage ? (
            <>
              <div className="p-4 bg-white border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedMessage}
                </h2>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {showA2PToast && (
                    <div
                      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
                      role="alert"
                    >
                      <strong class="font-bold">
                        A2P Verification Required!{" "}
                      </strong>
                      <span class="block sm:inline">
                        You need to perform A2P Verification first to add and
                        send SMS campaign. Please add your business information{" "}
                        <Link
                          className="text-blue-500"
                          to={"/a2p-verification"}
                        >
                          here
                        </Link>
                      </span>
                      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg
                          class="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          onClick={() => setShowA2PToast(false)}
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                  {Array.isArray(currentMessages) ? (
                    currentMessages?.map((msg, index) => (
                      <div
                        key={msg?.id}
                        className={`flex ${
                          msg?.from === selectedMessage?.from
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            msg?.from === selectedMessage?.from
                              ? "bg-white text-gray-800"
                              : "bg-indigo-500 text-white"
                          } shadow`}
                        >
                          <p>{htmlToText(msg?.body)}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg?.from === selectedMessage
                                ? "text-gray-500"
                                : "text-indigo-100"
                            }`}
                          >
                            {moment(msg?.createdAt).format("DD.MM.YYYY")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No Data</div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-200">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyUp={handleFormSubmit}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-500 text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>

        {/* Add New Contact Modal */}
        {isAddContactModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              {/* <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
              <form onSubmit={handleAddContact}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter contact name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddContactModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Add Contact
                  </button>
                </div>
              </form> */}
              {showA2PToast ? (
                <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
                  role="alert"
                >
                  <strong class="font-bold">A2P Verification Required! </strong>
                  <span class="block sm:inline">
                    You need to perform A2P Verification first to add and send
                    SMS campaign. Please add your business information{" "}
                    <Link className="text-blue-500" to={"/a2p-verification"}>
                      here
                    </Link>
                  </span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      class="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={() => {
                        setShowA2PToast(false);
                        setIsAddContactModalOpen(false);
                        setIsAddModalOpen(false);
                      }}
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-4">New Message</h2>
                  <form onSubmit={handleSendSMS}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows="3"
                        placeholder="Type your message"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add New Message Modal */}
        {isAddModalOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {showA2PToast ? (
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
                    role="alert"
                  >
                    <strong class="font-bold">
                      A2P Verification Required!{" "}
                    </strong>
                    <span class="block sm:inline">
                      You need to perform A2P Verification first to add and send
                      SMS campaign. Please add your business information{" "}
                      <Link className="text-blue-500" to={"/a2p-verification"}>
                        here
                      </Link>
                    </span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={() => {
                          setShowA2PToast(false);
                          setIsAddContactModalOpen(false);
                          setIsAddModalOpen(false);
                        }}
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold mb-4">New Message</h2>
                    <form onSubmit={handleSendSMS}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={newNumber}
                          onChange={(e) => setNewNumber(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          rows="3"
                          placeholder="Type your message"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAddModalOpen(false)}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
