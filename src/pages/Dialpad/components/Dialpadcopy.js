import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import ReactSelectField from "../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { PiPhoneTransfer } from "react-icons/pi";
import { CiPause1 } from "react-icons/ci";
import { MdDialpad, MdOutlineAddIcCall } from "react-icons/md";
import { CiVolumeHigh } from "react-icons/ci";
import { MainContext } from "../../../../Context";
// import { SignalWire } from "@signalwire/js";
import { Relay } from "@signalwire/js";
import { Voice } from "@signalwire/realtime-api";
import { Buffer } from "buffer";
import _ from "lodash";
import requestingSound from "../../../../assets/requesting.wav";
const Dialpad = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  //Events
  const [mute, setMute] = useState(false);
  const [hold, setHold] = useState(false);
  const [deaf, setDeaf] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userState, setUserState] = useState("READY");
  const { Timer } = useContext(MainContext);
  const [token, setToken] = useState(null);
  const [call, setCall] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [audioDeviceId, setAudioDeviceId] = useState(null);
  const [client, setClient] = useState(null);
  const callAudioRef = useRef();
  const remoteAudioRef = useRef();
  async function getAudioOutDevices() {
    const devices = await client?.getAudioOutDevices();
    setAudioDeviceId(devices[0]?.groupId);
  }
  useEffect(() => {
    if (client) getAudioOutDevices();
  }, [client]);

  const handleDialerClick = (type, value) => {
    if (type === "dial") {
      setInputValue((prevValue) => prevValue + value);
      userState === "ON_CALL" && call && call?.dtmf(_.toString(value));
    } else if (type === "delete") {
      setInputValue((prevValue) =>
        prevValue.substring(0, prevValue.length - 1)
      );
    } else if (type === "clear") {
      setInputValue("");
    }
  };
  const handleMakeCall = async () => {
    setUserState("ON_CALL");
    setCallInProgress(true);
    try {
      const options = {
        destinationNumber: inputValue,
        callerNumber: "+12677031136",
        callerName: "Muhammad Umar",
        audio: true,
      };
      const currentCall = await client?.newCall(options);

      setCall(currentCall);
      // Attach the remote audio stream
      setCallInProgress(true);
    } catch (error) {
      console.error("Error making the call:", error);
    }
  };
  const handleDeaf = () => {
    call?.deaf();
    setDeaf(true);
  };
  const handleUndeaf = () => {
    call?.undeaf();
    setDeaf(false);
  };
  const handleMuteCall = () => {
    call?.muteAudio();
    setMute(true);
  };
  const handleUnMuteCall = () => {
    call?.unmuteAudio();
    setMute(false);
  };
  const handleHoldCall = () => {
    call?.hold();
    setHold(true);
  };
  const handleUnHoldCall = () => {
    call?.unhold();
    setHold(false);
  };
  const handleDropCall = () => {
    setUserState("READY");
    call?.hangup();
  };
  const handleIncomingCall = () => {
    setUserState("ON_CALL");
    call?.answer();
  };

  function handleCallUpdate(currentCall) {
    setCall(currentCall);
    switch (currentCall?.state) {
      case "new": // Setup the UI
        call?.setAudioOutDevice(audioDeviceId);
        setCallStatus("new");
        setUserState("ON_CALL");

        break;
      case "trying": // You are trying to call someone and he's ringing now
        // callAudioRef?.current && callAudioRef?.current?.play();
        // remoteAudioRef?.current?.play();
        setCallStatus("trying");
        setUserState("ON_CALL");
        break;
      case "recovering": // Call is recovering from a previous session
        // callAudioRef?.current && callAudioRef?.current?.play();
        break;
      case "ringing": // Someone is calling you
        console.log("Ringing...");
        setCallStatus("incoming");
        setUserState("INCOMING");
        break;
      case "active": // Call has become active
        console.log("Active");
        setUserState("ON_CALL");
        setCallStatus("active");
        // callAudioRef?.current && callAudioRef?.current?.puase();
        // remoteAudioRef?.current?.play();
        break;
      case "hangup": // Call is over
        setUserState("READY");
        setCallStatus("hangup");
        // callAudioRef?.current && callAudioRef?.current?.puase();
        break;
      case "destroy": // Call has been destroyed
        setUserState("READY");
        setCallStatus("destroy");
        // callAudioRef?.current && callAudioRef?.current?.puase();
        break;
      default:
        break;
    }
  }
  function handleNotification(notification) {
    console.log("notification", notification.type, notification);
    switch (notification.type) {
      case "callUpdate":
        handleCallUpdate(notification.call);
        break;
      case "userMediaError":
        // Permission denied or invalid audio/video params on `getUserMedia`
        break;
    }
  }
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ call?.remoteStream;:", call?.remoteStream);
    // audioElement.play();
  }, [call]);
  useEffect(() => {
    if (!token) {
      const fetchToken = async () => {
        try {
          const response = await fetch(
            "https://kki9ew2.signalwire.com/api/relay/rest/jwt",
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${Buffer.from(
                  "5de25e8d-290d-4b31-a7a3-c3914a6d68d8:PT2b49a60637f0aca688588707eebd9c0e7253f96f58c24b3d"
                ).toString("base64")}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          console.log("🚀 ~ fetchToken ~ data:", data);
          setToken(data.jwt_token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      };
      fetchToken();
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      const initializeClient = async () => {
        try {
          const clientInstance = new Voice.Client({
            token,
            // project: "5de25e8d-290d-4b31-a7a3-c3914a6d68d8",
          });
          clientInstance.connect();
          clientInstance?.on("signalwire.ready", (client) => {
            setClient(client);
            // You are connected with Relay!
            console.log(client, "yadkl;fjadskl;jf");
          });
          clientInstance?.on("signalwire.error", (error) => {
            // You are connected with Relay!
            console.log(error, "yadkl;jf");
          });
          clientInstance.on("signalwire.notification", handleNotification);
        } catch (error) {
          console.error("Error initializing SignalWire client:", error);
        }
      };
      initializeClient();
    }
  }, [token]);
  // useEffect(() => {
  //   if (call && call.remoteStream) {
  //     if (remoteAudioRef.current) {
  //       remoteAudioRef.current.srcObject = call.remoteStream;
  //       remoteAudioRef.current.play().catch((error) => {
  //         console.error("Error playing the remote audio stream:", error);
  //       });
  //     }
  //   }
  // }, [call]);
  return (
    <div>
      <div class="grid pt-10 place-items-center ">
        <div class="mx-auto w-80  rounded-xl relative overflow-hidden border border-gray-300 p-4 shadow-xl">
          {userState === "READY" && (
            <div>
              {/* <div>
              <label for="underline_select" class="sr-only">
                Underline select
              </label>
              <select
                id="underline_select"
                class="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center"
              >
                <option>Call From</option>
                <option value="FO">+12345678902</option>
                <option value="US">+12345678902</option>
                <option value="CA">+12345678902</option>
                <option value="FR">+12345678902</option>
                <option value="DE">+12345678902</option>
              </select>
            </div> */}
              <div class="flex flex-col h-full justify-center text-black">
                <div class="w-full text-center">
                  <input
                    class="bg-transparent text-center p-4 border-b border-gray-300"
                    placeholder="Phone Number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div class="inline-grid grid-cols-3 my-4 gap-6 mx-auto font-extrabold text-gray-dark">
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 1)}
                    >
                      <p className="text-xl">1</p>
                      <p className="text-sm text-gray-400">.</p>{" "}
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 2)}
                    >
                      <p className="text-xl">2</p>
                      <p className="text-sm text-gray-400">ABC</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 3)}
                    >
                      <p className="text-xl">3</p>
                      <p className="text-sm text-gray-400">DEF</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 4)}
                    >
                      <p className="text-xl">4</p>
                      <p className="text-sm text-gray-400">GHI</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 5)}
                    >
                      <p className="text-xl">5</p>
                      <p className="text-sm text-gray-400">JKL</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 6)}
                    >
                      <p className="text-xl">6</p>
                      <p className="text-sm text-gray-400">MNO</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 7)}
                    >
                      <p className="text-xl">7</p>
                      <p className="text-sm text-gray-400">PQRS</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 8)}
                    >
                      <p className="text-xl">8</p>
                      <p className="text-sm text-gray-400">TUVW</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 9)}
                    >
                      <p className="text-xl">9</p>
                      <p className="text-sm text-gray-400">XYZ</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", "+")}
                    >
                      <p className="text-2xl">+</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", 0)}
                    >
                      <p className="text-xl">0</p>
                    </div>
                    <div
                      class="border border-gray-300 hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                      onClick={() => handleDialerClick("dial", "#")}
                    >
                      <p className="text-xl">#</p>
                    </div>
                  </div>
                  <div
                    class="bg-green-500 mx-auto justify-center mb-5 flex hover:bg-green-400 text-white items-center h-16 cursor-pointer w-16 rounded-full  "
                    onClick={handleMakeCall}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          {userState === "ON_CALL" && (
            <div className="text-center">
              <div>
                <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {call?.state}
                </span>
              </div>
              <div className="w-[100px] m-auto">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                  alt=""
                  className="mx-auto"
                />
              </div>
              <p className="p-5">{inputValue}</p>
              <div className="pb-5">
                <Timer />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div
                  className={`${
                    mute ? "bg-black text-white" : ""
                  } border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  onClick={!mute ? handleMuteCall : handleUnMuteCall}
                >
                  <AiOutlineAudioMuted size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={` border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                >
                  <PiPhoneTransfer size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={`${
                    hold ? "bg-black text-white" : ""
                  } border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  onClick={!hold ? handleHoldCall : handleUnHoldCall}
                >
                  <CiPause1 size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={`${
                    deaf ? "bg-black text-white" : ""
                  } border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  onClick={!deaf ? handleDeaf : handleUndeaf}
                >
                  <CiVolumeHigh size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={` border border-gray-700 rounded-full h-16 w-16 m-auto cursor-pointer`}
                  onClick={() => setUserState("READY")}
                >
                  <MdDialpad size={27} className="m-auto mt-[17px]" />
                </div>
                <div
                  className={` border border-gray-700 rounded-full h-16 w-16 m-auto`}
                >
                  <MdOutlineAddIcCall size={27} className="m-auto mt-[17px]" />
                </div>
              </div>
              <div
                class="bg-red-500 mx-auto justify-center m-5 flex hover:bg-red-400 text-white items-center h-16 cursor-pointer w-16 rounded-full  "
                onClick={handleDropCall}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
            </div>
          )}
          {userState === "INCOMING" && (
            <div className="text-center">
              <div className="w-[100px] m-auto">
                <img
                  src="https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                  alt=""
                  className="mx-auto"
                />
              </div>
              <p className="p-5">+923174660027</p>
              <div className="grid grid-cols-2">
                <div
                  class="bg-red-500 mx-auto justify-center m-5 flex hover:bg-red-400 text-white items-center h-16 cursor-pointer w-16 rounded-full"
                  onClick={handleDropCall}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>

                <div
                  class="bg-green-500 mx-auto justify-center m-5 flex hover:bg-green-400 text-white items-center h-16 cursor-pointer w-16 rounded-full"
                  onClick={handleIncomingCall}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
      <audio ref={callAudioRef} src={requestingSound} loop />
      <audio ref={remoteAudioRef} autoPlay playsInline muted={false}></audio>
    </div>
  );
};

export default Dialpad;
