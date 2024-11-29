import { useState, useMemo, useEffect } from "react";
import CallingContext from "./CallingContext";
import { IoIosTimer } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCallTokenApi } from "../../redux/services/twilio";
import { Device } from "@twilio/voice-sdk";
import _ from "lodash";
const CalllingContext = ({ children }) => {
  const USER_STATE = {
    CONNECTING: "Connecting",
    READY: "Ready",
    ON_CALL: "On call",
    OFFLINE: "Offline",
    ON_CALL_KEYPAD: "On call keypad",
  };
  const stateColor = {
    [USER_STATE.CONNECTING]: "#B7AC44",
    [USER_STATE.READY]: "#DAD870",
    [USER_STATE.ON_CALL]: "#FF5C4D",
    [USER_STATE.OFFLINE]: "#FFB52E",
  };
  const dispatch = useDispatch();
  //Events
  const { user, token } = useSelector((state) => state.auth);
  const { callToken } = useSelector((state) => state.twilio);
  const [callMuted, setCallMuted] = useState(false);
  const [device, setDevice] = useState(null);
  const [connection, setConnection] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [userState, setUserState] = useState(USER_STATE.READY);
  const [incoming, setIncoming] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] =
    useState("+12314278305");
  const [timer, setTimer] = useState({ hours: 0, mins: 0, sec: 0 });
  const init = async () => {
    if (callToken) {
      try {
        const device = new Device(callToken, {
          logLevel: 1,
          edge: "ashburn",
        });
        device.register();
        setDevice(device);
        device.addListener("connect", (device) => {
          setIncoming(false);
          console.log("Connect event listener added .....");
          return device;
        });
        device.on("registered", () => {
          console.log("Agent registered");
          setUserState(USER_STATE.READY);
        });
        device.on("connect", (connection) => {
          console.log("Call connected");
          setIncoming(false);
          setConnection(connection);
          setUserState(USER_STATE.ON_CALL);
        });
        device.on("disconnect", () => {
          console.log("Disconnect event");
          setIncoming(false);
          setUserState(USER_STATE.READY);
          setConnection(null);
        });
        device.on("incoming", (call) => {
          console.log("🚀 ~ device.on ~ incoming:", call);
          setIncoming(true);
          setConnection(call);
          setUserState(USER_STATE.ON_CALL);
        });

        return () => {
          device.destroy();
          setIncoming(false);
          setDevice(undefined);
          setUserState(USER_STATE.OFFLINE);
        };
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  useEffect(() => {
    dispatch(
      getCallTokenApi(token, {
        from_phone: selectedPhoneNumber,
        accountSid: user.accountSid,
        identity: _.toLower(user.firstname),
        authToken: user.authToken,
        api_key_sid: user.api_key_sid,
        api_key_secret: user.api_key_secret,
        twiml_app_sid: user.twiml_app_sid,
      })
    );
    return () => {};
  }, [token, user, dispatch]);
  //Callback
  useEffect(() => {
    init();
  }, [callToken]);
  const Timer = () => {
    const getTime = () => {
      setTimer((state) => ({
        hours: state.mins === 60 ? state.hours + 1 : state.hours,
        mins: state.sec === 60 ? state.mins + 1 : state.mins,
        sec: state.sec === 60 ? 0 : state.sec + 1,
      }));
    };
    useEffect(() => {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="badge bg-light badge-lg text-dark">
        <span>
          {/* <IoIosTimer size={16} style={{ marginRight: "4%" }} /> */}
          {`${timer.hours < 9 ? "0" + timer.hours : timer.hours} :
          ${timer.mins < 9 ? "0" + timer.mins : timer.mins} :

           ${timer.sec < 9 ? "0" + timer.sec : timer.sec}`}
        </span>
      </div>
    );
  };
  const handleMakeCall = async () => {
    const params = {
      To: inputValue, // The recipient's phone number
    };
    const call = await device.connect({
      params,
      rtcConstraints: {
        audio: true,
      },
    });
    call.on("accept", (call) => {
      setConnection(call);
      setIncoming(false);
      setUserState(USER_STATE.ON_CALL);
      console.log("call accepted", call);
    });
    call.on("disconnect", () => {
      console.log("The call has been disconnected.");
      setUserState(USER_STATE.READY);
      setIncoming(false);
      setConnection(null);
    });
    call.on("reject", () => {
      setUserState(USER_STATE.READY);
      setIncoming(false);
      console.log("The call was rejected.");
    });
    call.on("error", (error) => {
      console.log("An error has occurred: ", error);
      setIncoming(false);
    });
    call.on("mute", (isMuted, call) => {
      isMuted ? setCallMuted(true) : setCallMuted(false);
    });
    call.on("reconnected", () => {
      console.log("The call has regained connectivity.");
    });
  };
  const handleDialerClick = (type, value) => {
    if (connection && type === "dial") {
      connection.sendDigits(value);
    } else {
      if (type === "dial") {
        setInputValue((prevValue) => prevValue + value);
      } else if (type === "delete") {
        setInputValue((prevValue) =>
          prevValue.substring(0, prevValue.length - 1)
        );
      } else if (type === "clear") {
        setInputValue("");
      }
    }
  };
  const handleDropCall = () => {
    console.log("🚀 ~ handleDropCall ~ connection:", connection);
    if (connection) {
      connection.disconnect(); // End the call
      console.log("Call ended manually");
      setConnection(null);
      setUserState(USER_STATE.READY);
    } else {
      console.error("No active connection to disconnect");
    }
  };
  const setInputValue_ = (value) => {
    setInputValue(value);
  };
  const setUserState_ = (value) => {
    setUserState(value);
  };
  const handleMute = () => {
    if (connection) {
      connection.mute(!callMuted);
    }
  };
  const handleAcceptCall = () => {
    if (connection) {
      setIncoming(false);
      connection.accept();
    }
  };
  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      timer,
      USER_STATE,
      stateColor,
      userState,
      inputValue,
      callMuted,
      connection,
      incoming,
      handleAcceptCall,
      setUserState_,
      Timer,
      setTimer,
      setInputValue_,
      handleDialerClick,
      handleMakeCall,
      handleDropCall,
      handleMute,
    }),
    [
      timer,
      USER_STATE,
      stateColor,
      userState,
      inputValue,
      callMuted,
      connection,
      incoming,
      setUserState_,
      Timer,
      setTimer,
      setInputValue_,
      handleDialerClick,
      handleMakeCall,
      handleDropCall,
      handleMute,
      handleAcceptCall,
    ]
  );
  return (
    <CallingContext.Provider value={value}>{children}</CallingContext.Provider>
  );
};

export default CalllingContext;
