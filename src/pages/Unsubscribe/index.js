import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const backendURL = process.env.REACT_APP_BACKEND_URL_PRODUCTION;

export default function UnsubscribePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lead = queryParams.get("lead");
  const user = queryParams.get("user");
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleUnsubscribe = async () => {
    // Replace with your API call
    console.log("Unsubscribed with feedback:", feedback);
    const params = {
      userId: user,
      lead: lead,
      reason: feedback,
    };
    try {
      const response = await axios.post(`${backendURL}/unsubscribed`, params);
      if (response?.data?.statusCode !== 200) {
        setUnsubscribed(false);

        return toast.error(response.data.message);
      }
      toast.success(response.data.message || "Successfully unsubscribed.");
      return setUnsubscribed(true);
    } catch (error) {
      setUnsubscribed(false);
      return toast.error(
        error.message || "Something went wrong while unsubscribing."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        {!unsubscribed ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Unsubscribe from Emails
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              We're sorry to see you go. Click the button below to unsubscribe
              from all future emails.
            </p>

            {/* Optional Feedback */}
            <textarea
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Tell us why you're unsubscribing (optional)..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              onClick={handleUnsubscribe}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all"
            >
              Unsubscribe
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              You're Unsubscribed
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You have successfully been removed from our email list. If this
              was a mistake, you can resubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
