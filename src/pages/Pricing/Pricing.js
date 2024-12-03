import React, { useEffect, useState } from "react";
import { LuCrown } from "react-icons/lu";
import Switcher from "../../components/FormFields/Switcher/Switcher";
import { useForm } from "react-hook-form";
import StripePayment from "../../components/payment/PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentIntendApi,
  createSubscriptionApi,
} from "../../redux/services/subscription";
import Modal from "../../components/Modal";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
const Pricing = ({ isValid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  console.log("🚀 ~ Pricing ~ isOpen:", isOpen);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const { token, isAuthenticated, user_id } = useSelector(
    (state) => state.auth
  );
  const { paymentIntend } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();
  const typeWatcher = watch("type");
  const [selected, setSelected] = useState({});
  const [pricing, setPricing] = useState({
    starter: {
      name: "Starter",
      yearly_price: 9.0,
      description: "Essentials for all small sized businesses or startups",
      monthly_price: 14.0,
      yearly_discount_percentage: 30,
      original_amount: 14.0,
      discount_price: 0,
      discount_amount: 0,
      benefits: [
        "Common-Box",
        "1500 Contact Uploads",
        "10,000 Emails Monthly",
        "Unlimited Emails Annually",
        "Unlimited Email Warm-ups",
        "5 Email Templates",
        "5 Email Sequences",
        "50 Email Validation Credits",
        "1 Free Virtual Mobile Number",
        "Free 100 Minutes Calling",
        "Make & Recieve Calls",
        "Free Call Logs & Recording",
        "SMS Marketing",
        "24/7 Email Support",
      ],
    },
    professional: {
      name: "Professional",
      yearly_price: 30.0,
      monthly_price: 45.0,
      yearly_discount_percentage: 0,
      description: "Essentials for all small sized businesses or startups",
      original_amount: 45.0,
      discount_price: 0,
      discount_amount: 0,
      benefits: [
        "Common-Box",
        "10,000 Contacts Uploads",
        "50,000 Emails Monthly",
        "Unlimited Emails Annually",
        "Unlimited Email Warm-ups",
        "20 Email Templates",
        "20 Email Sequences",
        "250 Email Validation Credits",
        "2 Free Virtual Mobile Number",
        "Free 200 Minutes Calling",
        "Make & Recieve Calls",
        "Free Call Logs & Recording",
        "SMS Marketing",
        "24/7 Email Support",
      ],
    },
    agency: {
      name: "Agency",
      yearly_price: 55.0,
      monthly_price: 75.0,
      description: "Essentials for all small sized businesses or startups",
      yearly_discount_percentage: 0,
      original_amount: 75.0,
      discount_price: 0,
      discount_amount: 0,
      benefits: [
        "Common-Box",
        "100,000 Contacts Uploads",
        "20,000 Emails Monthly",
        "Unlimited Emails Annually",
        "Unlimited Email Warm-ups",
        "Unlimited Email Templates",
        "Unlimited Email Sequences",
        "500 Email Validation Credits",
        "3 Free Virtual Mobile Number",
        "Free 400 Minutes Calling",
        "Make & Recieve Calls",
        "Free Call Logs & Recording",
        "SMS Marketing",
        "24/7 Email Support",
        "24/7 Email Support",
      ],
    },
    advance: {
      benefits: [
        "Common-Box",
        "Unlimited Contacts Uploads",
        "Unlimited Emails Monthly",
        "Unlimited Emails Annually",
        "Unlimited Email Warm-ups",
        "Unlimited Email Templates",
        "Unlimited Email Sequences",
        "Advance Email Analytics",
        "24/7 Email Support",
      ],
    },
  });
  function calculateDiscountAmount(number, percentage) {
    const amount = number * ((100 - percentage) / 100);
    return amount.toFixed(2);
  }
  useEffect(() => {
    if (typeWatcher === true) {
      setPricing((prev) => {
        return {
          ...prev,
          starter: {
            ...prev?.starter,
            monthly_price: calculateDiscountAmount(
              prev.starter.original_amount,
              25
            ),
            yearly_price: (
              calculateDiscountAmount(prev.starter.original_amount, 25) * 12
            ).toFixed(2),
            discount_amount: (
              (prev?.starter?.original_amount -
                calculateDiscountAmount(prev.starter.original_amount, 25)) *
              12
            ).toFixed(),
          },
          professional: {
            ...prev?.professional,
            monthly_price: calculateDiscountAmount(
              prev.professional.original_amount,
              25
            ),
            yearly_price: (
              calculateDiscountAmount(prev.professional.original_amount, 25) *
              12
            ).toFixed(2),
            discount_amount: (
              prev?.professional?.original_amount -
              calculateDiscountAmount(prev.professional.original_amount, 25)
            ).toFixed(),
          },
          agency: {
            ...prev?.agency,
            monthly_price: calculateDiscountAmount(
              prev.agency.original_amount,
              25
            ),
            yearly_price: (
              calculateDiscountAmount(prev.agency.original_amount, 25) * 12
            ).toFixed(2),
            discount_amount: (
              (prev?.agency?.original_amount -
                calculateDiscountAmount(prev.agency.original_amount, 25)) *
              12
            ).toFixed(2),
          },
        };
      });
    } else {
      setPricing((prev) => {
        return {
          ...prev,
          starter: {
            ...prev?.starter,
            monthly_price: prev.starter.original_amount,
            discount_amount: 0.0,
            yearly_price: 0.0,
          },
          professional: {
            ...prev?.professional,
            monthly_price: prev.professional.original_amount,
            discount_amount: 0.0,
            yearly_price: 0.0,
          },
          agency: {
            ...prev?.agency,
            monthly_price: prev.agency.original_amount,
            discount_amount: 0.0,
            yearly_price: 0.0,
          },
        };
      });
    }
  }, [typeWatcher]);
  useEffect(() => {
    if (isAuthenticated && isValid) navigateTo("/");
  }, [isAuthenticated, navigateTo, isValid]);
  const getPaymentIntend = async (obj) => {
    dispatch(
      createPaymentIntendApi(token, {
        amount: parseInt(
          (typeWatcher
            ? obj?.monthly_price * 100 * 12
            : obj?.monthly_price * 100
          ).toFixed(2)
        ),
      })
    );
    setSelected(obj);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  function getDateAfterOneMonth() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  }
  function getDateAfterOneYear() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }
  console.log(
    "🚀 ~ getDateAfterOneMonth ~ getDateAfterOneMonth:",
    moment(new Date(getDateAfterOneMonth())).format("YYYY-MM-DD")
  );

  const afterPayment = async () => {
    const data = {
      user_id: user_id,
      plan_name: selected?.name,
      monthly_price: selected?.monthly_price,
      discount_percentage: selected?.discount_percentage,
      start_date: moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss"),
      end_date: typeWatcher
        ? moment(new Date(getDateAfterOneYear())).format("YYYY-MM-DD")
        : moment(new Date(getDateAfterOneMonth())).format("YYYY-MM-DD"),
      yearly_price: typeWatcher ? selected?.yearly_price : 0.0,
    };
    console.log("🚀 ~ afterPayment ~ data:", data);
    await dispatch(createSubscriptionApi(token, data));
    setIsOpen(false);
    setIsSubscribed(true);
  };
  useEffect(() => {
    if (isSubscribed) {
      navigateTo("/");
    }
  }, [isSubscribed, navigateTo]);
  return (
    <div>
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                " polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="flex justify-center gap-5 pt-5">
          <Switcher name="type" control={control} errors={errors} />
          <p className="my-1 text-xl font-extrabold">Yearly</p>
        </div>
        <div className=" mx-auto mt-5 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3 gap-5">
          <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0">
            <h3
              id="tier-hobby"
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              Starter
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              {typeWatcher && (
                <del className="text-xl font-semibold text-gray-900">
                  ${pricing?.starter?.original_amount}
                </del>
              )}
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                ${pricing?.starter?.monthly_price}
              </span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <span className="text-sm font-semibold text-gray-900">
              You'll save ${pricing?.starter?.discount_amount} annually
            </span>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {pricing?.starter?.description}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
            >
              {pricing?.starter?.benefits?.map((item, index) => (
                <li className="flex gap-x-3" key={index}>
                  <svg
                    className="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => getPaymentIntend(pricing?.starter)}
              className="w-full mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
            >
              Get started today
            </button>
          </div>
          <div className="relative rounded-3xl bg-gray-900 p-8 shadow-2xl ring-1 ring-gray-900/10 sm:p-10">
            <h3
              id="tier-enterprise"
              className="text-base font-semibold leading-7 text-indigo-400"
            >
              Professional
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <p className="mt-4 flex items-baseline gap-x-2">
                {typeWatcher && (
                  <del className="text-xl font-semibold text-white">
                    ${pricing?.professional?.original_amount}
                  </del>
                )}
                <span className="text-5xl font-semibold tracking-tight text-white">
                  ${pricing?.professional?.monthly_price}
                </span>
                <span className="text-base text-gray-500">/month</span>
              </p>
            </p>
            <span className="text-sm font-semibold text-white">
              You'll save ${pricing?.starter?.discount_amount} annually
            </span>
            <p className="mt-6 text-base leading-7 text-white">
              {pricing?.professional?.description}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-300 sm:mt-10"
            >
              {pricing?.professional?.benefits?.map((item, index) => (
                <li className="flex gap-x-3" key={index}>
                  <svg
                    className="h-6 w-5 flex-none text-indigo-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => getPaymentIntend(pricing?.professional)}
              className="w-full mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
            >
              Get started today
            </button>
          </div>
          <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0 border-2 border-yellow-400">
            <h3
              id="tier-hobby"
              className="text-base font-semibold leading-7 text-yellow-400 flex justify-between"
            >
              Agency
              <>
                <LuCrown size={40} />
              </>
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              {typeWatcher && (
                <del className="text-xl font-semibold text-gray-900">
                  ${pricing?.agency?.original_amount}
                </del>
              )}
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                ${pricing?.agency?.monthly_price}
              </span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <span className="text-sm font-semibold text-gray-900">
              You'll save ${pricing?.agency?.discount_amount} annually
            </span>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {pricing?.agency?.description}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
            >
              {pricing?.agency?.benefits?.map((item, index) => (
                <li className="flex gap-x-3" key={index}>
                  <svg
                    className="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => getPaymentIntend(pricing?.agency)}
              className="w-full mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
            >
              Get started today
            </button>
          </div>
          {/* <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10 lg:mx-0 border-2 border-yellow-400">
            <h3
              id="tier-hobby"
              className="text-base font-semibold leading-7 text-yellow-400 flex justify-between"
            >
              Agency
              <>
                <LuCrown size={40} />
              </>
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <del className="text-xl font-semibold text-gray-900">
                ${pricing?.agency?.original_amount}
              </del>
              <span className="text-5xl font-semibold tracking-tight text-gray-900">
                ${pricing?.agency?.monthly_price}
              </span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <span className="text-sm font-semibold text-gray-900">
              You'll save ${pricing?.agency?.discount_amount} annually
            </span>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {pricing?.agency?.description}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10"
            >
              {pricing?.agency?.benefits?.map((item, index) => (
                <li className="flex gap-x-3" key={index}>
                  <svg
                    className="h-6 w-5 flex-none text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => getPaymentIntend(pricing?.agency)}
              className="w-full mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
            >
              Get started today
            </button>
          </div> */}
        </div>
      </div>
      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Payment Form"
          body=<StripePayment
            userId={user_id}
            planName={selected?.name}
            amount={paymentIntend?.amount}
            currency={"usd"}
            clientSecret={paymentIntend?.client_secret}
            afterPayment={afterPayment}
          />
          // onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          size="md"
        />
      </div>
    </div>
  );
};

export default Pricing;
