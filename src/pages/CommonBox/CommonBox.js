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
  console.log("🚀 ~ CommonBox ~ selectedReply:", selectedReply);
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
  return (
    <Layout
      component={
        <div className="">
          <main class="flex w-full h-full shadow-lg rounded-3xl">
            <SidebarCom setCampaignData={handleCampaignDataFromChild} />
            <section class="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll">
              <label class="px-3">
                <input
                  class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                  placeholder="Search..."
                />
              </label>
              {isLoading ? (
                <SidebarSkeleton />
              ) : (
                <ul class="mt-6">
                  {Array.isArray(replies) &&
                    replies?.length > 0 &&
                    replies?.map((reply, index) => (
                      <li
                        class={`${
                          reply.body === selectedReply?.body
                            ? "bg-black text-white"
                            : ""
                        } py-5 border-b px-3 transition hover:bg-indigo-100 cursor-pointer`}
                        key={index}
                        onClick={() => handleReplyClick(reply)}
                      >
                        <div class="flex justify-between items-center">
                          <h3 class="text-lg font-semibold">
                            {extractNameAndEmail(reply.from)?.name}
                          </h3>
                          <p class="text-md text-gray-400">
                            {getRelativeTime(reply.date)}
                          </p>
                        </div>
                        <div
                          class="text-md italic text-gray-400"
                          dangerouslySetInnerHTML={{
                            __html: reply.body.slice(0, 50),
                          }}
                        ></div>
                      </li>
                    ))}
                </ul>
              )}
            </section>
            <section class="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
              {selectedReply?.from && (
                <>
                  <div class="flex justify-between items-center h-48 border-b-2 mb-8">
                    <div class="flex space-x-4 items-center">
                      <div class="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src="https://bit.ly/2KfKgdy"
                          loading="lazy"
                          class="h-full w-full object-cover"
                        />
                      </div>
                      <div class="flex flex-col">
                        <h3 class="font-semibold text-lg">
                          {extractNameAndEmail(selectedReply.from)?.name}
                        </h3>
                        <p class="text-light text-gray-400">
                          {extractNameAndEmail(selectedReply.from)?.email}{" "}
                        </p>
                      </div>
                    </div>
                    <div>
                      <ul class="flex text-gray-400 space-x-4">
                        <li class="w-6 h-6">
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
                        <li class="w-6 h-6">
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
                    <h1 class="font-bold text-2xl">{selectedReply?.subject}</h1>
                    <article
                      class="mt-8 text-gray-500 leading-7 tracking-wider"
                      dangerouslySetInnerHTML={{ __html: selectedReply?.body }}
                    ></article>
                  </section>
                  <form
                    onSubmit={handleSubmit(formSubmit)}
                    class="mt-6 border rounded-xl bg-gray-50 mb-3"
                  >
                    <TextAreaField
                      name="reply_body"
                      control={control}
                      errors={errors}
                      placeholder="Reply"
                    />
                    <div class="flex items-center justify-end p-2">
                      <Button
                        type="submit"
                        loading={isLoading}
                        className="py-2 bg-black"
                      >
                        Reply
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </section>
          </main>
        </div>
      }
    />
  );
};

export default CommonBox;
