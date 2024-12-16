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
const Content = () => {
  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { paymentIntend } = useSelector((state) => state.subscription);
  console.log("🚀 ~ Content ~ paymentIntend:", paymentIntend);
  const { token, user_id } = useSelector((state) => state.auth);
  const { logs } = useSelector((state) => state.logs);
  const { wallet } = useSelector((state) => state.wallet);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const amountWatcher = watch("amount");
  const topups = [10, 20, 50, 100];
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
      <div className="flex justify-center gap-5">
        <div className="flex flex-wrap flex-col gap-5">
          {/*  */}
          <div>
            <div className="flex gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow ">
              <div>
                <FaWallet size={60} color="indigo" />
              </div>
              <div>
                <Heading
                  className="font-extrabold font-mono text-3xl"
                  text={"$" + (wallet?.credit || 0)}
                />
                <p className="text-sm">You can add more balance .</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 border flex-wrap rounded-xl p-5 bg-white dark:bg-gray-900 shadow">
              <form onSubmit={handleSubmit(handleAddTransaction)}>
                <div className="flex flex-wrap justify-center gap-5  ">
                  <div className="col-span-2">
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
                  <div className="">
                    <Button type="submit" className="py-3">
                      Add Balance
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="border rounded-xl p-5 bg-white dark:bg-gray-900">
          <Heading
            text={"Add Topup"}
            className="text-center font-extrabold text-xl mb-5"
          ></Heading>
          <div className="flex gap-5 flex-wrap justify-center">
            {topups?.map((amount, index) => (
              <div
                onClick={() => handleAddTransaction({ amount: amount })}
                key={index}
                className="text-center border bg-gray-100 p-8 text-xl font-extrabold  hover:bg-gray-50 dark:bg-gray-900 rounded-xl cursor-pointer"
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
              {logs?.length < 0 ? (
                logs?.map((log, index) => (
                  <div key={index} className="px-5 py-8 border relative">
                    <div className="font-bold">{log.description}</div>
                    <div className="text-sm font-gray">{log?.date}</div>
                    <div className="absolute right-5 top-10 font-extrabold text-xl ">
                      <span>{log?.type === "plus" ? "+" : "-"}</span>$
                      {log?.amount}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Logs yet.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow">
          <div className="font-extrabold text-xl">
            Calls/SMS Pricing Calculator
          </div>
          <div>
            <div>
              <ReactSelectField
                name="number_type"
                placeholder="Country"
                control={control}
                errors={errors}
                label="Country"
                options={[
                  {
                    label: "United States",
                    value: "US",
                  },
                ]}
              />
            </div>
          </div>
          <div className=" p-5 ">
            <div className="border">
              <div className="font-bold text-xl text-center bg-black dark:bg-gray-300 text-white dark:text-black p-2">
                SMS
              </div>
              <ul className=" list-disc px-5 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 p-3 bg-gray-100">
                <li className="flex gap-5 ">
                  <span className="font-bold">Inbound:</span>
                  <span>{"$0.02"}/sms</span>
                </li>
                <li className="flex gap-5 ">
                  <span className="font-bold">Outbound:</span>
                  <span>{"$0.03"}/sms</span>
                </li>
              </ul>
            </div>
            <div className="border">
              <div className="font-bold text-xl text-center bg-black dark:bg-gray-300 text-white dark:text-black p-2">
                Voice
              </div>
              <ul className=" list-disc px-5 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 p-3 bg-gray-100">
                <li className="flex gap-5 ">
                  <span className="font-bold">Inbound:</span>
                  <span>{"0,028"}/min</span>
                </li>
                <li className="flex gap-5 ">
                  <span className="font-bold">Outbound:</span>
                  <span>{"0.028"}/min</span>
                </li>
              </ul>
            </div>
            <div className="border">
              <div className="font-bold text-xl text-center bg-black dark:bg-gray-300 text-white dark:text-black p-2">
                Phone Number
              </div>
              <ul className=" list-disc px-5 grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 p-3 bg-gray-100">
                <li className="flex gap-5 ">
                  <span className="font-bold">Local Number:</span>
                  <span>{"$3.5"}</span>
                </li>
                {/* <li className="flex gap-5 ">
                  <span className="font-bold">Toll Free:</span>
                  <span>{"1"} credit/min</span>
                </li> */}
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
          title="Payment Form"
          body=<StripePayment
            clientSecret={paymentIntend?.client_secret}
            afterPayment={afterPayment}
          />
          noStartMargin={true}
          // onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          size="md"
        />
      </div>
    </>
  );
};

export default Content;
