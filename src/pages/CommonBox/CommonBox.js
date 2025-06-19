// import React, { useEffect, useState } from "react";
// import Layout from "../../layout/Layout";
// import { useDispatch, useSelector } from "react-redux";
// import SidebarCom from "./components/Sidebar";
// import { getUserCompaignsApi } from "../../redux/services/compaign";
// import SidebarSkeleton from "../../components/SidebarSkeleton";
// import { useForm } from "react-hook-form";
// import TextAreaField from "../../components/FormFields/TextAreaField/TextAreaField";
// import { sendEmailReply } from "../../redux/services/unibox.";
// import Button from "../../components/Button";
// import Heading from "../../components/Heading";
// import {
//   HiOutlineCalendar,
//   HiOutlineClock,
//   HiOutlineMail,
//   HiOutlineUser,
// } from "react-icons/hi";
// import { load } from "cheerio";
// import moment from "moment";
// import _ from "lodash";

// const CommonBox = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();
//   const dispatch = useDispatch();
//   const { token, user_id } = useSelector((state) => state.auth);
//   const { replies, isLoading } = useSelector((state) => state.unibox);
//   const [campaign, setCampaign] = useState({});
//   const [selectedReply, setSelectedReply] = useState({});
//   const [isReplying, setIsReplying] = useState(false);
//   function htmlToText(html) {
//     const $ = load(html);
//     return $.text().trim();
//   }
//   useEffect(() => {
//     const query = `no_limit=true`;
//     dispatch(getUserCompaignsApi(token, user_id, query));
//   }, [user_id, token, dispatch]);
//   function getRelativeTime(dateString) {
//     const date = new Date(dateString); // Convert the date key to a Date object
//     const now = new Date();

//     const diffInMs = now - date; // Difference in milliseconds
//     const diffInMinutes = Math.round(diffInMs / (1000 * 60)); // Convert to minutes

//     const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
//     if (diffInMinutes < 60) {
//       return rtf.format(-diffInMinutes, "minute");
//     } else if (diffInMinutes < 1440) {
//       const diffInHours = Math.round(diffInMinutes / 60);
//       return rtf.format(-diffInHours, "hour");
//     } else {
//       const diffInDays = Math.round(diffInMinutes / 1440);
//       return rtf.format(-diffInDays, "day");
//     }
//   }
//   const handleCampaignDataFromChild = (data) => {
//     setCampaign(data);
//   };
//   function extractNameAndEmail(input) {
//     const regex = /"([^"]+)"\s+<([^>]+)>/; // Regex to match the name and email
//     const match = _.isString(input) && input?.length > 0 && input.match(regex);
//     if (match) {
//       const name = match[1]; // Captures the text inside quotes
//       const email = match[2]; // Captures the text inside angle brackets
//       return { name, email };
//     }
//     return null;
//   }
//   const handleReplyClick = (reply) => {
//     setSelectedReply(reply);
//   };
//   const formSubmit = (data) => {
//     const splitSubject = (selectedReply?.subject).split("Re:");
//     const params = {
//       replyToEmailId: selectedReply?.references,
//       replyBody: data?.reply_body,
//       subject: splitSubject[splitSubject?.length - 1],
//       to_email: extractNameAndEmail(selectedReply.from)?.email,
//       from_email: extractNameAndEmail(selectedReply.to)?.email,
//       user_id: user_id,
//       campaign_id: campaign?.id,
//     };
//     dispatch(sendEmailReply(token, params));
//   };
//   const handleOnSearchReply = (event) => {
//     const query = event.target.value;
//   };
//   return (
//     <Layout
//       component={
//         <main className="h-[90vh] flex w-full shadow-lg rounded bg-white">
//           <div className="">
//             <Heading
//               text={"Common-Box"}
//               className="bg-white p-5 text-xl dark:bg-gray-800 font-extrabold"
//             />
//             <SidebarCom setCampaignData={handleCampaignDataFromChild} />
//           </div>
//           <section className="flex flex-col w-5/6   dark:bg-gray-800">
//             {isLoading ? (
//               <SidebarSkeleton />
//             ) : (
//               <div className="">
//                 {/* Inbox Section */}
//                 <div className="flex-1  p-6 overflow-auto h-[90vh]">
//                   <h2 className="text-xl font-bold mb-6">Inbox</h2>
//                   <div className="space-y-2">
//                     {Array.isArray(replies) &&
//                       replies?.length > 0 &&
//                       replies?.map((email, index) => (
//                         <div
//                           key={index}
//                           onClick={() => handleReplyClick(email)}
//                           className={`p-4 rounded-lg cursor-pointer transition-all ${
//                             email.body === selectedReply?.body
//                               ? "bg-blue-50 border-blue-200"
//                               : "hover:bg-gray-50 border-transparent"
//                           } border`}
//                         >
//                           <div className="flex justify-between items-start mb-2">
//                             <h3 className="font-semibold text-gray-800 dark:text-gray-300">
//                               {email?.subject}
//                             </h3>
//                             <span className="text-sm text-gray-500">
//                               {getRelativeTime(
//                                 email?.createdAt ? email?.createdAt : email.date
//                               )}{" "}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                             <HiOutlineUser className="text-gray-400" />
//                             <span>
//                               {" "}
//                               {extractNameAndEmail(email?.from || "")?.name ||
//                                 email.from}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 line-clamp-2">
//                             {htmlToText(email?.body || "")?.slice(0, 100)}
//                           </p>
//                           <div className="flex items-center gap-2 mt-2">
//                             <span
//                               className={`text-xs px-2 py-1 rounded-full ${
//                                 email?.status === "Unread"
//                                   ? "bg-blue-100 text-blue-700"
//                                   : "bg-gray-100 text-gray-600"
//                               }`}
//                             >
//                               Read
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>
//           {/* Details Section */}
//           <div className="w-96 bg-white shadow-sm border-l border-gray-200 p-6 overflow-auto">
//             <h2 className="text-xl font-bold mb-6 text-gray-800">Details</h2>
//             {selectedReply?.subject ? (
//               <div className="space-y-6">
//                 <div className="pb-6 border-b border-gray-200">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                     {selectedReply?.subject}
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <HiOutlineUser className="text-gray-400" />
//                       <span>
//                         {" "}
//                         {extractNameAndEmail(selectedReply.from)?.name ||
//                           selectedReply?.from}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <HiOutlineMail className="text-gray-400" />
//                       <span>
//                         {" "}
//                         {extractNameAndEmail(selectedReply.from)?.name ||
//                           selectedReply?.from}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <HiOutlineCalendar className="text-gray-400" />
//                       <span>
//                         {(selectedReply?.date || selectedReply?.createdAt) &&
//                           moment(
//                             selectedReply?.date
//                               ? selectedReply?.date
//                               : selectedReply?.createdAt
//                           ).format("YYYY-MM-DD")}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <HiOutlineClock className="text-gray-400" />
//                       <span>
//                         {" "}
//                         {moment(
//                           selectedReply?.date
//                             ? selectedReply?.date
//                             : selectedReply?.createdAt
//                         ).format("HH:mm A")}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <h4 className="font-semibold text-gray-800">Content</h4>
//                   <p className="text-gray-600 whitespace-pre-line">
//                     {/* {htmlToText(selectedReply?.body)} */}
//                     <div
//                       className="text-md italic text-gray-400"
//                       dangerouslySetInnerHTML={{
//                         __html: selectedReply?.body,
//                       }}
//                     ></div>
//                   </p>
//                 </div>

//                 {/* Reply Section */}
//                 <div className="pt-6 border-t border-gray-200">
//                   {!isReplying ? (
//                     <button
//                       onClick={() => setIsReplying(true)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                       Reply
//                     </button>
//                   ) : (
//                     <div className="space-y-4">
//                       <h4 className="font-semibold text-gray-800">
//                         Your Reply
//                       </h4>
//                       <form
//                         onSubmit={handleSubmit(formSubmit)}
//                         className="mt-6 rounded-xl"
//                       >
//                         <TextAreaField
//                           name="reply_body"
//                           control={control}
//                           errors={errors}
//                           placeholder="Reply"
//                         />
//                         <div className="flex items-center justify-end p-2">
//                           <Button
//                             type="submit"
//                             loading={isLoading}
//                             className="py-2 bg-black"
//                           >
//                             Reply
//                           </Button>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setIsReplying(false);
//                             }}
//                             className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-[80%] text-gray-400">
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />
//                   <path
//                     d="M8 15C8.5 16 10 17 12 17C14 17 15.5 16 16 15"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                   <path
//                     d="M9 10H9.01M15 10H15.01"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <p className="text-lg">No open content</p>
//               </div>
//             )}
//           </div>
//         </main>
//       }
//     />
//   );
// };

// export default CommonBox;
import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import SidebarCom from "./components/Sidebar";
import { getUserCompaignsApi } from "../../redux/services/compaign";
import SidebarSkeleton from "../../components/SidebarSkeleton";
import { useForm } from "react-hook-form";
import TextAreaField from "../../components/FormFields/TextAreaField/TextAreaField";
import { sendEmailReply } from "../../redux/services/unibox.";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { load } from "cheerio";
import moment from "moment";
import _ from "lodash";

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
  const [isReplying, setIsReplying] = useState(false);

  function htmlToText(html) {
    const $ = load(html);
    return $.text().trim();
  }

  useEffect(() => {
    dispatch(getUserCompaignsApi(token, user_id, `no_limit=true`));
  }, [user_id, token, dispatch]);

  function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.round((now - date) / (1000 * 60));
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    if (diffInMinutes < 60) return rtf.format(-diffInMinutes, "minute");
    if (diffInMinutes < 1440)
      return rtf.format(-Math.round(diffInMinutes / 60), "hour");
    return rtf.format(-Math.round(diffInMinutes / 1440), "day");
  }

  function extractNameAndEmail(input) {
    const regex = /"([^"]+)"\s+<([^>]+)>/;
    const match = _.isString(input) && input.match(regex);
    if (match) return { name: match[1], email: match[2] };
    return null;
  }

  const handleReplyClick = (reply) => setSelectedReply(reply);

  const handleCampaignDataFromChild = (data) => setCampaign(data);

  const formSubmit = (data) => {
    const subjectCleaned = selectedReply?.subject?.split("Re:").pop();
    const params = {
      replyToEmailId: selectedReply?.references,
      replyBody: data?.reply_body,
      subject: subjectCleaned,
      to_email: extractNameAndEmail(selectedReply.from)?.email,
      from_email: extractNameAndEmail(selectedReply.to)?.email,
      user_id,
      campaign_id: campaign?.id,
    };
    dispatch(sendEmailReply(token, params));
  };

  return (
    <Layout
      component={
        <main className="h-[90vh] flex w-full shadow-lg rounded bg-white dark:bg-gray-900">
          <div className="w-1/5 border-r border-gray-200 dark:border-gray-700">
            <Heading
              text="Common-Box"
              className="bg-white dark:bg-gray-800 p-5 text-xl font-extrabold"
            />
            <SidebarCom setCampaignData={handleCampaignDataFromChild} />
          </div>

          <section className="flex flex-col w-4/6 dark:bg-gray-800">
            {isLoading ? (
              <SidebarSkeleton />
            ) : (
              <div className="flex-1 p-6 overflow-auto">
                <h2 className="text-xl font-bold mb-6">Inbox</h2>
                <div className="space-y-2">
                  {Array.isArray(replies) && replies.length > 0 ? (
                    replies.map((email, index) => (
                      <div
                        key={index}
                        onClick={() => handleReplyClick(email)}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${
                          email.body === selectedReply?.body
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 border-transparent"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-300">
                            {email?.subject}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {getRelativeTime(email?.createdAt || email.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <HiOutlineUser className="text-gray-400" />
                          <span>
                            {extractNameAndEmail(email?.from)?.name ||
                              email.from}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {htmlToText(email?.body || "").slice(0, 100)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              email?.status === "Unread"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            Read
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic">No messages</div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Email Details + Reply Section */}
          <div className="w-96 bg-white dark:bg-gray-900 shadow-sm border-l border-gray-200 dark:border-gray-700 p-6 overflow-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
              Details
            </h2>
            {selectedReply?.subject ? (
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    {selectedReply?.subject}
                  </h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <HiOutlineUser className="text-gray-400" />
                      <span>
                        {extractNameAndEmail(selectedReply.from)?.name ||
                          selectedReply?.from}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineMail className="text-gray-400" />
                      <span>
                        {extractNameAndEmail(selectedReply.from)?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="text-gray-400" />
                      <span>
                        {moment(
                          selectedReply?.date || selectedReply?.createdAt
                        ).format("YYYY-MM-DD")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineClock className="text-gray-400" />
                      <span>
                        {moment(
                          selectedReply?.date || selectedReply?.createdAt
                        ).format("HH:mm A")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Content
                  </h4>
                  <div
                    className="prose prose-sm max-w-full dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: selectedReply?.body }}
                  />
                </div>

                {/* Reply Section */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  {!isReplying ? (
                    <button
                      onClick={() => setIsReplying(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Reply
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        Your Reply
                      </h4>
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
                        <div className="flex items-center justify-end p-2 space-x-2">
                          <Button
                            type="submit"
                            loading={isLoading}
                            className="py-2 px-4 bg-black text-white hover:bg-gray-800 rounded-lg"
                          >
                            Reply
                          </Button>
                          <button
                            type="button"
                            onClick={() => setIsReplying(false)}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[80%] text-gray-400 dark:text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 15C8.5 16 10 17 12 17C14 17 15.5 16 16 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 10H9.01M15 10H15.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-lg">No open content</p>
              </div>
            )}
          </div>
        </main>
      }
    />
  );
};

export default CommonBox;
