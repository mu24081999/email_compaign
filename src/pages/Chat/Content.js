import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const messagesData = [
  {
    body: "<p>This is the initial content of the editor.</p></body>",
    direction: "outbound-api",
    from: "+14155992510",
    to: "+923174660027",
  },
  {
    body: "<p>This is the initial content of the editor.</p></body>",
    direction: "outbound-api",
    from: "+14155992510",
    to: "+923174660027",
  },
  {
    body: "<p>This is the initial content of the editor.</p></body>",
    direction: "outbound-api",
    from: "+923174660027",
    to: "+14155992510",
  },

  {
    body: "<p>This is the initial content of the editor.</p></body>",
    direction: "outbound-api",
    from: "+14155992510",
    to: "+923174660027",
  },
];
const Content = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [filteredData, setFilteredData] = useState([]);
  const [currentMessages, setCurrentMessages] = useState(messagesData);
  useEffect(() => {
    const uniqueMessages = messagesData.reduce((acc, message) => {
      const key = `${message.from}-${message.to}`;
      if (!acc[key]) {
        acc[key] = message;
      }
      return acc;
    }, {});
    const uniqueMessagesArray = Object.values(uniqueMessages);
    setFilteredData(uniqueMessagesArray);
  }, []);
  const handleCurrentMessages = (selectedMessage) => {
    const filteredMessages = messagesData?.filter(
      (msg) =>
        msg.from === selectedMessage?.from || msg.to === selectedMessage?.to
    );
    setCurrentMessages(filteredMessages);
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <div className="h-[90vh] overflow-hidden">
        {/* <!-- component --> */}
        {/* <!-- This is an example component --> */}
        <div className=" container mx-auto shadow-lg border">
          {/* <!-- headaer --> */}
          <div className="px-5 py-5 flex justify-between items-center bg-white dark:bg-gray-900 border-b-2">
            <div className="font-semibold text-2xl">Chatbot</div>
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
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              {/* <!-- end search compt -->
        <!-- user list --> */}
              {Array.isArray(filteredData) &&
                filteredData?.map((msg, index) => (
                  <div
                    className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-600 hover:bg-opacity-25 cursor-pointer"
                    key={index}
                    onClick={() => handleCurrentMessages(msg)}
                  >
                    <div className="w-full px-2">
                      <div className="text-lg font-semibold">{msg?.from}</div>
                      <span className="text-gray-500 flex justify-end">
                        {moment(msg?.dateSent).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                ))}

              {/* <!-- end user list --> */}
            </div>
            {/* <!-- end chat list -->
      <!-- message --> */}
            <div>
              <div className="border-b py-[2.7vh] px-2 font-extrabold">
                +14155992510
              </div>

              <div className="w-full px-5 flex flex-col justify-between">
                <div className=" h-[65vh] overflow-scroll">
                  {Array.isArray(currentMessages) ? (
                    currentMessages?.map((msg, index) => (
                      <div className="">
                        <div className="flex flex-col mt-5">
                          <div className="flex justify-end mb-4">
                            <div
                              className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                              dangerouslySetInnerHTML={{ __html: msg.body }}
                            ></div>
                            <span>{msg?.from}</span>
                          </div>
                          <div className="flex justify-start mb-4">
                            <img
                              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                              className="object-cover h-8 w-8 rounded-full"
                              alt=""
                            />
                            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quaerat at praesentium, aut ullam delectus
                              odio error sit rem. Architecto nulla doloribus
                              laborum illo rem enim dolor odio saepe,
                              consequatur quas?
                            </div>
                          </div>
                        </div>
                        <div className="py-5 absolute bottom-5 w-[100vh]">
                          <input
                            className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                            type="text"
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
