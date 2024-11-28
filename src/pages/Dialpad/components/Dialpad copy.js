import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { PiPhoneTransfer } from "react-icons/pi";
import { CiPause1 } from "react-icons/ci";
import { MdDialpad, MdOutlineAddIcCall } from "react-icons/md";
import { CiVolumeHigh } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Device } from "@twilio/voice-sdk";
import Button from "../../../components/Button";
import _ from "lodash";
import { getCallTokenApi } from "../../../redux/services/twilio";
import useCalling from "../../../context/CallingContext/useCalling";

const Dialpad = () => {
  // const USER_STATE = {
  //   CONNECTING: "Connecting",
  //   READY: "Ready",
  //   ON_CALL: "On call",
  //   OFFLINE: "Offline",
  // };
  // const stateColor = {
  //   [USER_STATE.CONNECTING]: "#B7AC44",
  //   [USER_STATE.READY]: "#DAD870",
  //   [USER_STATE.ON_CALL]: "#FF5C4D",
  //   [USER_STATE.OFFLINE]: "#FFB52E",
  // };
  const dispatch = useDispatch();
  const {
    Timer,
    connection,
    incoming,
    handleAcceptCall,
    timer,
    USER_STATE,
    stateColor,
    userState,
    inputValue,
    setTimer,
    setInputValue_,
    handleDialerClick,
    setUserState_,
    handleMakeCall,
    handleDropCall,
    handleMute,
    callMuted,
  } = useCalling();
  //Events
  // const { user, token } = useSelector((state) => state.auth);
  // const { callToken } = useSelector((state) => state.twilio);
  // const [device, setDevice] = useState(null);
  // const [connection, setConnection] = useState(null);
  // const [inputValue, setInputValue] = useState("");
  // const [userState, setUserState] = useState(USER_STATE.READY);
  // const [selectedPhoneNumber, setSelectedPhoneNumber] =
  //   useState("+12314278305");

  // const init = async () => {
  //   if (callToken) {
  //     try {
  //       console.log("Token connected successfully!!", callToken);
  //       const device = new Device(callToken, {
  //         logLevel: 1,
  //         edge: "ashburn",
  //       });
  //       device.register();
  //       setDevice(device);
  //       device.addListener("connect", (device) => {
  //         console.log("Connect event listener added .....");
  //         return device;
  //       });
  //       device.on("registered", () => {
  //         console.log("Agent registered");
  //         setUserState(USER_STATE.READY);
  //       });
  //       device.on("connect", (connection) => {
  //         console.log("Call connect");
  //         setConnection(connection);
  //         setUserState(USER_STATE.ON_CALL);
  //       });
  //       device.on("disconnect", () => {
  //         console.log("Disconnect event");
  //         setUserState(USER_STATE.READY);
  //         setConnection(null);
  //       });
  //       device.on("incoming", (call) => {
  //         setConnection(call);
  //         setUserState(USER_STATE.ON_CALL);
  //       });

  //       return () => {
  //         device.destroy();
  //         setDevice(undefined);
  //         setUserState(USER_STATE.OFFLINE);
  //       };
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   dispatch(
  //     getCallTokenApi(token, {
  //       from_phone: selectedPhoneNumber,
  //       accountSid: user.accountSid,
  //       identity: _.toLower(user.firstname),
  //       authToken: user.authToken,
  //       api_key_sid: user.api_key_sid,
  //       api_key_secret: user.api_key_secret,
  //       twiml_app_sid: user.twiml_app_sid,
  //     })
  //   );
  //   return () => {};
  // }, [token, user, dispatch]);
  // //Callback
  // useEffect(() => {
  //   init();
  // }, [callToken]);

  // const handleMakeCall = async () => {
  //   const params = {
  //     To: inputValue, // The recipient's phone number
  //   };
  //   const call = await device.connect({
  //     params,
  //     rtcConstraints: {
  //       audio: true,
  //     },
  //   });
  //   call.on("accept", () => {
  //     setConnection(connection);
  //     setUserState(USER_STATE.ON_CALL);
  //     console.log("call accepted");
  //   });
  //   call.on("disconnect", () => {
  //     console.log("The call has been disconnected.");
  //     setUserState(USER_STATE.READY);
  //     setConnection(null);
  //   });
  //   call.on("reject", () => {
  //     setUserState(USER_STATE.READY);
  //     console.log("The call was rejected.");
  //   });
  //   call.on("error", (error) => {
  //     console.log("An error has occurred: ", error);
  //   });
  //   call.on("mute", (isMuted, call) => {
  //     isMuted ? console.log("muted") : console.log("unmuted");
  //   });
  //   call.on("reconnected", () => {
  //     console.log("The call has regained connectivity.");
  //   });
  // };
  // //End
  // // const { Timer } = useContext(MainContext);

  // const handleDialerClick = (type, value) => {
  //   if (type === "dial") {
  //     setInputValue((prevValue) => prevValue + value);
  //   } else if (type === "delete") {
  //     setInputValue((prevValue) =>
  //       prevValue.substring(0, prevValue.length - 1)
  //     );
  //   } else if (type === "clear") {
  //     setInputValue("");
  //   }
  // };
  // // Handle ending a call
  // const handleDropCall = () => {
  //   console.log("🚀 ~ handleDropCall ~ connection:", connection);
  //   if (connection) {
  //     connection.disconnect(); // End the call
  //     console.log("Call ended manually");
  //     setConnection(null);
  //     setUserState(USER_STATE.READY);
  //   } else {
  //     console.error("No active connection to disconnect");
  //   }
  // };
  return (
    <div>
      <div className="grid pt-10 place-items-center ">
        <div className="mx-auto w-80  rounded-xl relative overflow-hidden  p-4 shadow-xl">
          {userState === USER_STATE.READY && (
            <div>
              <div className="flex flex-col h-full justify-center text-black">
                <div className="w-full text-center">
                  <input
                    className="bg-transparent text-center p-4 border-b border-gray-300  outline-none"
                    placeholder="Phone Number"
                    value={inputValue}
                    onChange={(e) => setInputValue_(e.target.value)}
                  />
                  <div className="inline-grid grid-cols-3 my-4 gap-6 mx-auto font-extrabold text-gray-dark">
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 1)}
                    >
                      <p className="text-xl">1</p>
                      <p className="text-sm text-gray-400">.</p>{" "}
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 2)}
                    >
                      <p className="text-xl">2</p>
                      <p className="text-sm text-gray-400">ABC</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 3)}
                    >
                      <p className="text-xl">3</p>
                      <p className="text-sm text-gray-400">DEF</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 4)}
                    >
                      <p className="text-xl">4</p>
                      <p className="text-sm text-gray-400">GHI</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 5)}
                    >
                      <p className="text-xl">5</p>
                      <p className="text-sm text-gray-400">JKL</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 6)}
                    >
                      <p className="text-xl">6</p>
                      <p className="text-sm text-gray-400">MNO</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 7)}
                    >
                      <p className="text-xl">7</p>
                      <p className="text-sm text-gray-400">PQRS</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 8)}
                    >
                      <p className="text-xl">8</p>
                      <p className="text-sm text-gray-400">TUVW</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 9)}
                    >
                      <p className="text-xl">9</p>
                      <p className="text-sm text-gray-400">XYZ</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", "+")}
                    >
                      <p className="text-2xl">+</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 0)}
                    >
                      <p className="text-xl">0</p>
                    </div>
                    <div
                      className="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", "#")}
                    >
                      <p className="text-xl">#</p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="py-3 px-32 bg-black hover:bg-gray-800"
                    onClick={handleMakeCall}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          )}
          {userState === USER_STATE.ON_CALL && (
            <div className="text-center">
              <div>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {/* {call?.state} */}
                </span>
              </div>
              <div className="w-[100px] m-auto">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                  alt=""
                  className="mx-auto"
                />
              </div>
              {/* <p className="p-5">{inputValue}</p> */}
              <div className="text-center">
                {connection?.parameters?.From ||
                  connection?.parameters?.To ||
                  inputValue ||
                  "090078609"}
              </div>
              <div className="pb-5">
                <Timer />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div
                  className={` border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  onClick={handleMute}
                >
                  <AiOutlineAudioMuted size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={` border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  // onClick={() => setUserState_(USER_STATE.READY)}
                >
                  <MdDialpad size={27} className="m-auto mt-[17px]" />
                </div>
              </div>
              <div>
                {incoming === true && (
                  <div className="d-flex justify-content-center mt-4 mb-2 mx-1">
                    <button
                      className="btn btn-success rounded-circle p-3"
                      onClick={handleAcceptCall}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>{" "}
                    </button>
                  </div>
                )}
                <div
                  className="bg-red-500 mx-auto justify-center m-5 flex hover:bg-red-400 text-white items-center h-16 cursor-pointer w-16 rounded-full  "
                  onClick={() => handleDropCall()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialpad;
