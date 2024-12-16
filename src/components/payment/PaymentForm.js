// PaymentForm.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentRec } from "../../redux/services/payment";
const stripe_public_key = process.env.REACT_APP_STRIPE_PUBLISH_KEY_SANDBOX;
const stripePromise = loadStripe(stripe_public_key);
const PaymentForm = ({ clientSecret, afterPayment }) => {
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // // Create a payment intent
      // const { data } = await axios.post("/create-payment-intent", {
      //   amount,
      //   currency,
      //   userId,
      //   planName,
      // });

      // const { clientSecret } = data;

      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setMessage(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        // Save the payment record
        // await axios.post("/save-payment-record", {
        //   userId,
        //   planName,
        //   amount,
        //   currency,
        //   status: paymentResult.paymentIntent.status,
        // });
        afterPayment && (await afterPayment());
        dispatch(
          await addPaymentRec(token, {
            user_id,
            amount: paymentResult?.paymentIntent?.amount,
            currency: paymentResult?.paymentIntent?.currency,
            status: paymentResult?.paymentIntent?.status,
            paymentMethod:
              paymentResult?.paymentIntent?.payment_method_types[0],
            transactionId: paymentResult?.paymentIntent?.id,
          })
        );
        setMessage("Payment successful!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-100 p-3 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
            className="outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && (
          <div
            className={`text-center mt-2 text-${
              message.includes("successful") ? "green" : "red"
            }-600`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

const StripePayment = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default StripePayment;
