import React from "react";
import useCalling from "../../../../context/CallingContext/useCalling";
import Button from "../../../../components/Button";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { MdDialpad } from "react-icons/md";
import _ from "lodash";
import { FiDelete, FiPhoneCall } from "react-icons/fi";

const Dialer = () => {
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
  return (
    <div>
      <div className=" dark:bg-gray-900 mx-auto w-80  rounded-xl relative overflow-hidden  p-4 shadow-xl border bg-cyan-500 bg-opacity-10">
        {(userState === USER_STATE.READY ||
          userState === USER_STATE.ON_CALL_KEYPAD) && (
          <div>
            <div className="flex flex-col h-full justify-center">
              <div className="w-full text-center">
                <div className="relative">
                  <input
                    className="bg-transparent w-full text-center p-2 border-b border-gray-300  dark:text-white text-lg outline-none"
                    placeholder="Phone Number"
                    value={inputValue}
                    onChange={(e) => setInputValue_(e.target.value)}
                  />
                  <FiDelete
                    color="red"
                    size={20}
                    onClick={() => handleDialerClick("delete")}
                    className=" absolute cursor-pointer -mt-8 right-0"
                  />
                </div>
                <div className="inline-grid grid-cols-3 my-4 gap-6 mx-auto font-extrabold dark:text-white">
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 1)}
                  >
                    <p className="text-xl">1</p>
                    <p className="text-sm text-gray-400">.</p>{" "}
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 2)}
                  >
                    <p className="text-xl">2</p>
                    <p className="text-sm text-gray-400">ABC</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 3)}
                  >
                    <p className="text-xl">3</p>
                    <p className="text-sm text-gray-400">DEF</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 4)}
                  >
                    <p className="text-xl">4</p>
                    <p className="text-sm text-gray-400">GHI</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 5)}
                  >
                    <p className="text-xl">5</p>
                    <p className="text-sm text-gray-400">JKL</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 6)}
                  >
                    <p className="text-xl">6</p>
                    <p className="text-sm text-gray-400">MNO</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 7)}
                  >
                    <p className="text-xl">7</p>
                    <p className="text-sm text-gray-400">PQRS</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 8)}
                  >
                    <p className="text-xl">8</p>
                    <p className="text-sm text-gray-400">TUVW</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 9)}
                  >
                    <p className="text-xl">9</p>
                    <p className="text-sm text-gray-400">XYZ</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", "+")}
                  >
                    <p className="text-2xl">+</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", 0)}
                  >
                    <p className="text-xl">0</p>
                  </div>
                  <div
                    className="hover:bg-gray-300 cursor-pointer justify-center flex flex-col items-center h-16 w-16 rounded-full"
                    onClick={() => handleDialerClick("dial", "#")}
                  >
                    <p className="text-xl">#</p>
                  </div>
                </div>
                {userState === USER_STATE.READY && (
                  <Button
                    variant="primary"
                    className="lg:w-[240px] flex justify-center mx-auto py-3 bg-black hover:bg-gray-800 dark:bg-white dark:text-black"
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
                )}

                {userState === USER_STATE.ON_CALL_KEYPAD && (
                  <Button
                    variant="primary"
                    className="lg:w-[240px] flex justify-center mx-auto py-3 bg-black hover:bg-gray-800 dark:bg-white dark:text-black"
                    onClick={() => setUserState_(USER_STATE.ON_CALL)}
                  >
                    Show Current Call
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {userState === USER_STATE.ON_CALL && (
          <div
            className="text-center dark:text-white"
            style={{ height: "400px" }}
          >
            <div>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                {/* {call?.state} */}
              </span>
            </div>
            <div className="w-[100px] m-auto py-5">
              <img
                src="https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png"
                alt=""
                className="mx-auto rounded-full"
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
            <div className="flex gap-5 justify-center">
              <div
                className={`${
                  callMuted ? "bg-gray-300" : ""
                } border border-gray-700 dark:border-white  rounded-full h-16 w-16 cursor-pointer`}
                onClick={handleMute}
              >
                <AiOutlineAudioMuted size={27} className="m-auto mt-[17px]" />
              </div>
              <div
                className={` border border-gray-700 dark:border-white  rounded-full h-16 w-16  cursor-pointer`}
                onClick={() => setUserState_(USER_STATE.ON_CALL_KEYPAD)}
              >
                <MdDialpad size={27} className="m-auto mt-[17px]" />
              </div>
            </div>
            <div className="flex flex-row-reverse justify-center m-5 gap-5">
              {incoming === true && (
                <button
                  className="bg-green-500 justify-center flex hover:bg-green-400 text-white items-center h-16 cursor-pointer w-16 rounded-full  "
                  onClick={() => handleAcceptCall()}
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
              )}
              <button
                className="bg-red-500 justify-center flex hover:bg-red-400 text-white items-center h-16 cursor-pointer w-16 rounded-full  "
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
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialer;
