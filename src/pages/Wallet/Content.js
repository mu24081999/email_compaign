import React, { useState, useEffect } from "react";
import { FaDollarSign, FaWallet } from "react-icons/fa";
import Heading from "../../components/Heading";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField/InputField";
import Button from "../../components/Button";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import Modal from "../../components/Modal";
import StripePayment from "../../components/payment/PaymentForm";
import { createPaymentIntendApi } from "../../redux/services/subscription";
import { addWalletApi } from "../../redux/services/wallet";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getWalletApi } from "../../redux/services/wallet";
import { getLogsApi } from "../../redux/services/walletLogs";
import moment from "moment/moment";
const pricing = {
  US: {
    local_sms_inbound: 0.0079,
    local_call_inbound: 0.018,
    local_sms_outbound: 0.0079,
    local_call_outbound: 0.018,
    tollfree_sms_inbound: 0.0079,
    tollfree_call_inbound: 0.026,
    tollfree_sms_outbound: 0.0079,
    tollfree_call_outbound: 0.018,
    local_number: 3.5,
    tollfree: 4.5,
  },
  UK: {
    local_sms_inbound: 0.0075,
    local_call_inbound: 0.01,
    local_sms_outbound: 0.0463,
    local_call_outbound: 0.015,
    tollfree_sms_inbound: 0.0075,
    tollfree_call_inbound: 0.0575,
    tollfree_sms_outbound: 0.0463,
    tollfree_call_outbound: 0.015,
    local_number: 4.2,
    tollfree: 6.2,
  },
  CAN: {
    local_sms_inbound: 0.0079,
    local_call_inbound: 0.018,
    local_sms_outbound: 0.0079,
    local_call_outbound: 0.018,
    tollfree_sms_inbound: 0.0079,
    tollfree_call_inbound: 0.026,
    tollfree_sms_outbound: 0.0079,
    tollfree_call_outbound: 0.018,
    local_number: 3.5,
    tollfree: 4.5,
  },
};
const Content = () => {
  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const countryWatcher = watch("country");
  const countryCode = countryWatcher?.value;
  const profitMargin = 10;
  const dispatch = useDispatch();
  const { paymentIntend } = useSelector((state) => state.subscription);
  const { token, user_id } = useSelector((state) => state.auth);
  const { logs } = useSelector((state) => state.logs);
  const { wallet } = useSelector((state) => state.wallet);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const amountWatcher = watch("amount");
  const topups = [5, 10, 20, 50, 100];
  const getProfitPricing = (basePrice, profitMarging) => {
    const profit = (basePrice / 100) * profitMargin;
    const profitPrice = basePrice + profit;
    return profitPrice.toFixed(4);
  };
  const handleAddTransaction = async (formData) => {
    dispatch(
      createPaymentIntendApi(token, {
        amount: _.toString(formData.amount * 100),
      })
    );
    setIsOpen(true);
  };
  const afterPayment = async () => {
    const credit = paymentIntend?.amount / 100;
    const data = {
      credit: credit,
      user_id: user_id,
    };
    await dispatch(addWalletApi(token, data));
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getWalletApi(token, user_id));
    dispatch(getLogsApi(token, user_id));
  }, [user_id, token, dispatch]);

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-wrap flex-col gap-5">
          {/*  */}
          <div>
            <div className="flex flex-col gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow ">
              <div className="flex justify-start gap-5">
                <div>
                  <FaWallet size={60} className=" text-black opacity-90" />
                </div>
                <div>
                  <Heading
                    className="font-extrabold font-mono text-3xl"
                    text={"$" + (wallet?.credit || 0)}
                  />
                  <p className="text-sm">You can add more balance .</p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(handleAddTransaction)}>
                  <div className="grid lg:grid-cols-9 sm:grid-cols-4 gap-5  ">
                    <div className="col-span-8">
                      <InputField
                        name="amount"
                        type="number"
                        control={control}
                        svg={<FaDollarSign />}
                        errors={errors}
                        min={10}
                        // placeholder="Enter your email address"
                        label="Amount"
                        rules={{
                          required: {
                            value: true,
                            message: "Field required!",
                          },
                        }}
                      />{" "}
                    </div>
                    <div className="w-36">
                      <Button type="submit" className="py-3">
                        Add Balance
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-5 bg-white dark:bg-gray-900">
          <Heading
            text={"Add Topup"}
            className=" font-extrabold text-2xl mb-4"
          ></Heading>
          <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-5">
            {topups?.map((amount, index) => (
              <div
                onClick={() => handleAddTransaction({ amount: amount })}
                key={index}
                className="text-center border bg-gray-100 px-12 py-2 text-xl font-extrabold  hover:bg-gray-50 dark:bg-gray-900 rounded cursor-pointer"
              >
                ${amount}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-5 grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
        <div>
          <div className="flex flex-col gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow h-[53vh]">
            <div className="font-extrabold text-xl">Credit Logs</div>
            <div className="overflow-scroll max-h-[55vh] dark:bg-gray-900">
              {logs?.length > 0 ? (
                logs?.map((log, index) => (
                  <div key={index} className="px-5 py-2 border relative">
                    <div className="flex justify-between">
                      <div className="font-bold">{log.description}</div>
                      <div className=" right-5 text-md ">
                        <span>
                          {log?.type === "plus"
                            ? "+"
                            : log?.type === "minus" && "-"}
                        </span>
                        ${log?.amount}
                      </div>
                    </div>
                    <div className="text-sm font-gray">
                      {moment(log?.createdAt).format("DD.MMM.YYYY , HH:mm")}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Logs yet.</p>
              )}
            </div>
          </div>
        </div>
        <div className=" h-[53vh] overflow-scroll flex flex-col gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow">
          <div className="font-extrabold text-xl">
            Calls/SMS Pricing Calculator
          </div>
          <div>
            <div>
              <ReactSelectField
                name="country"
                placeholder="Country"
                defaultValue={{ label: "United States", value: "US" }}
                control={control}
                errors={errors}
                label="Country"
                options={[
                  {
                    label: "United States",
                    value: "US",
                  },
                  // {
                  //   label: "United Kingdom",
                  //   value: "UK",
                  // },
                  {
                    label: "Canada",
                    value: "CAN",
                  },
                ]}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-5 ">
            <div className="border bg-gray-100 dark:bg-gray-900 pb-5 pt-2">
              <div className="font-bold text-2xl dark:bg-gray-300  dark:text-black p-2">
                SMS
              </div>
              <div className="ps-5">
                <ul className=" list-disc grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                  <li className=" list-none gap-5 ">
                    <span className="font-bold">Inbound:</span>
                    <ul>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.local_sms_inbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Local</span>
                      </li>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.tollfree_sms_inbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Toll-free</span>
                      </li>
                    </ul>
                  </li>
                  <li className="list-none ">
                    <span className="font-bold">Outbound:</span>

                    <ul>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.local_sms_outbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Local</span>
                      </li>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.tollfree_sms_outbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Toll-free</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border bg-gray-100 dark:bg-gray-900 pb-5 pt-2">
              <div className="font-bold text-2xl dark:bg-gray-300  dark:text-black p-2">
                Voice
              </div>
              <div className="ps-5">
                <ul className=" list-disc grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
                  <li className=" list-none gap-5 ">
                    <span className="font-bold">Inbound:</span>
                    <ul>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.local_call_inbound,
                            profitMargin
                          )}
                          /call
                        </span>{" "}
                        <span className="font-bold">- Local</span>
                      </li>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.tollfree_call_inbound,
                            profitMargin
                          )}
                          /call
                        </span>{" "}
                        <span className="font-bold">- Toll-free</span>
                      </li>
                    </ul>
                  </li>
                  <li className="list-none ">
                    <span className="font-bold">Outbound:</span>

                    <ul>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.local_call_outbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Local</span>
                      </li>
                      <li>
                        {" "}
                        <span>
                          $
                          {getProfitPricing(
                            pricing[countryCode]?.tollfree_call_outbound,
                            profitMargin
                          )}
                          /sms
                        </span>{" "}
                        <span className="font-bold">- Toll-free</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border bg-gray-100 dark:bg-gray-900">
              <div className="font-bold text-2xl dark:bg-gray-300  dark:text-black p-2">
                Phone Number
              </div>
              <ul className=" list-disc px-5 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 p-3 ">
                <li className="flex gap-5 ">
                  <span className="font-bold">Local Number:</span>
                  <span>${pricing[countryCode]?.local_number}</span>
                </li>
                <li className="flex gap-5 ">
                  <span className="font-bold">Toll-Free Number:</span>
                  <span>${pricing[countryCode]?.tollfree}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Complete Your Payment"
          body=<StripePayment
            clientSecret={paymentIntend?.client_secret}
            afterPayment={afterPayment}
          />
          noStartMargin={true}
          // onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          size="sm"
        />
      </div>
    </>
  );
};

export default Content;
