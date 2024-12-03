import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { SidebarCom } from "./components/Sidebar";
import { getUserCompaignsApi } from "../../redux/services/compaign";
import SidebarSkeleton from "../../components/SidebarSkeleton";
import { useForm } from "react-hook-form";
import TextAreaField from "../../components/FormFields/TextAreaField/TextAreaField";
import { sendEmailReply } from "../../redux/services/unibox.";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
const CommonBox = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const { replies, isLoading } = useSelector((state) => state.unibox);
  const [campaign, setCampaign] = useState({});
  const [selectedReply, setSelectedReply] = useState({});
  useEffect(() => {
    const query = `no_limit=true`;
    dispatch(getUserCompaignsApi(token, user_id, query));
  }, [user_id, token, dispatch]);
  function getRelativeTime(dateString) {
    const date = new Date(dateString); // Convert the date key to a Date object
    const now = new Date();

    const diffInMs = now - date; // Difference in milliseconds
    const diffInMinutes = Math.round(diffInMs / (1000 * 60)); // Convert to minutes

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minute");
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.round(diffInMinutes / 60);
      return rtf.format(-diffInHours, "hour");
    } else {
      const diffInDays = Math.round(diffInMinutes / 1440);
      return rtf.format(-diffInDays, "day");
    }
  }
  const handleCampaignDataFromChild = (data) => {
    setCampaign(data);
  };
  function extractNameAndEmail(input) {
    const regex = /"([^"]+)"\s+<([^>]+)>/; // Regex to match the name and email
    const match = input.match(regex);
    if (match) {
      const name = match[1]; // Captures the text inside quotes
      const email = match[2]; // Captures the text inside angle brackets
      return { name, email };
    }
    return null;
  }
  const handleReplyClick = (reply) => {
    setSelectedReply(reply);
  };
  const formSubmit = (data) => {
    const splitSubject = (selectedReply?.subject).split("Re:");
    const params = {
      replyToEmailId: selectedReply?.references,
      replyBody: data?.reply_body,
      subject: splitSubject[splitSubject?.length - 1],
      to_email: extractNameAndEmail(selectedReply.from)?.email,
      from_email: extractNameAndEmail(selectedReply.to)?.email,
      user_id: user_id,
      campaign_id: campaign?.id,
    };
    dispatch(sendEmailReply(token, params));
  };
  const handleOnSearchReply = (event) => {
    const query = event.target.value;
  };
  return (
    <Layout
      component={
        <div className="">
          <main className=" flex w-full h-full shadow-lg rounded border">
            <SidebarCom setCampaignData={handleCampaignDataFromChild} />
            <section className="flex flex-col pt-3 w-4/12 bg-white  dark:bg-gray-900 overflow-y-scroll border h-[88vh]">
              {/* <label className="px-3">
                <input
                  className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 w-full"
                  placeholder="Search..."
                  onKeyUp={handleOnSearchReply}
                />
              </label> */}

              {isLoading ? (
                <SidebarSkeleton />
              ) : (
                <>
                  <Heading
                    text={replies[0]?.id ? "Sent" : "Campaign Replies"}
                    className="text-center font-extrabold text-lg"
                  />
                  <ul className="mt-6">
                    {Array.isArray(replies) && replies?.length > 0 ? (
                      replies?.map((reply, index) => (
                        <li
                          className={`${
                            reply.body === selectedReply?.body
                              ? "bg-black text-white"
                              : ""
                          } py-5 border-b px-3 transition hover:bg-indigo-100 dark:hover:bg-gray-700 cursor-pointer`}
                          key={index}
                          onClick={() => handleReplyClick(reply)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                              {extractNameAndEmail(reply.from)?.name ||
                                reply.from}
                            </h3>
                            <p className="text-md text-gray-400">
                              {getRelativeTime(
                                reply?.createdAt ? reply?.createdAt : reply.date
                              )}
                            </p>
                          </div>
                          <div
                            className="text-md italic text-gray-400"
                            dangerouslySetInnerHTML={{
                              __html: reply.body.slice(0, 50),
                            }}
                          ></div>
                        </li>
                      ))
                    ) : (
                      <div className="flex flex-col items-center h-[83vh] pt-[30vh]">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/11696/11696623.png"
                          alt=""
                          width={100}
                        />
                        <p className="text-center">No Replies Found</p>
                      </div>
                    )}
                  </ul>
                </>
              )}
            </section>
            <section className="w-6/12 px-4 flex flex-col bg-white border-2 dark:bg-gray-900">
              {selectedReply?.from ? (
                <>
                  <div className="flex justify-between items-center h-48 border-b-2 mb-8">
                    <div className="flex space-x-4 items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src="https://bit.ly/2KfKgdy"
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-lg">
                          {extractNameAndEmail(selectedReply.from)?.name ||
                            selectedReply?.from}
                        </h3>
                        <p className="text-light text-gray-400">
                          {extractNameAndEmail(selectedReply.from)?.email}{" "}
                        </p>
                      </div>
                    </div>
                    <div>
                      <ul className="flex text-gray-400 space-x-4">
                        <li className="w-6 h-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                            />
                          </svg>
                        </li>
                        <li className="w-6 h-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <section>
                    <h1 className="font-bold text-2xl border bg-white dark:bg-gray-900 rounded shadow-lg p-3 text-center">
                      {selectedReply?.subject}
                    </h1>
                    <article
                      className="mt-8 leading-7 tracking-wider border rounded-xl p-2 bg-gray-100 dark:bg-gray-900 dark"
                      dangerouslySetInnerHTML={{ __html: selectedReply?.body }}
                    ></article>
                  </section>
                  {!selectedReply?.id && (
                    <form
                      onSubmit={handleSubmit(formSubmit)}
                      className="mt-6 rounded-xl"
                    >
                      <TextAreaField
                        name="reply_body"
                        control={control}
                        errors={errors}
                        placeholder="Reply"
                      />
                      <div className="flex items-center justify-end p-2">
                        <Button
                          type="submit"
                          loading={isLoading}
                          className="py-2 bg-black"
                        >
                          Reply
                        </Button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center h-[83vh] pt-[35vh]">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5058/5058385.png"
                    alt=""
                    width={100}
                  />
                  <p className="text-center">No open content</p>
                </div>
              )}
            </section>
          </main>
        </div>
      }
    />
  );
};

export default CommonBox;
