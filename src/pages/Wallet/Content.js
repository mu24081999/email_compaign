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
import { updateWalletApi } from "../../redux/services/wallet";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getWalletApi } from "../../redux/services/wallet";
import { getLogsApi } from "../../redux/services/walletLogs";
const Content = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { paymentIntend } = useSelector((state) => state.subscription);
  const { token, user_id } = useSelector((state) => state.auth);
  const { logs } = useSelector((state) => state.logs);
  const { wallet } = useSelector((state) => state.wallet);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  // const logs = [
  //   {
  //     id: 1,
  //     description: "Amount added to Wallet.",
  //     amount: 100.0,
  //     type: "plus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  //   {
  //     id: 2,
  //     description: "Amount deducted for Call.",
  //     amount: 100.0,
  //     type: "minus",
  //     date: "January 1, 2016",
  //   },
  // ];
  const handleAddTransaction = async (formData) => {
    dispatch(
      createPaymentIntendApi(token, {
        amount: _.toString(formData.amount * 100),
      })
    );
    setIsOpen(true);
  };
  const afterPayment = async () => {
    const data = {
      credit: 20.0,
    };
    await dispatch(updateWalletApi(token, data, user_id));
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getWalletApi(token, user_id));
    dispatch(getLogsApi(token, user_id));
  }, [user_id, token, dispatch]);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-5">
          {/*  */}
          <div>
            <div className="flex gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow ">
              <div>
                <FaWallet size={60} color="indigo" />
              </div>
              <div>
                <Heading
                  className="font-extrabold font-mono text-3xl"
                  text={"$30.00"}
                />
                <p className="text-sm">You can add more credit .</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow">
              <form onSubmit={handleSubmit(handleAddTransaction)}>
                <div className="grid grid-cols-3 gap-5  ">
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
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
        <div>
          <div className="flex flex-col gap-5 border rounded-xl p-5 bg-white dark:bg-gray-900 shadow">
            <div className="font-extrabold text-xl">Credit Logs</div>
            <div className="overflow-scroll max-h-[55vh] dark:bg-gray-900">
              {logs?.map((log, index) => (
                <div key={index} className="px-5 py-8 border relative">
                  <div className="font-bold">{log.description}</div>
                  <div className="text-sm font-gray">{log?.date}</div>
                  <div className="absolute right-5 top-10 font-extrabold text-xl ">
                    <span>{log?.type === "plus" ? "+" : "-"}</span>$
                    {log?.amount}
                  </div>
                </div>
              ))}
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
          <div className="grid lg:grid-cols-2 p-5">
            <div className="">
              <div className="font-bold text-xl">SMS</div>
              <ul className=" list-disc px-5">
                <li className="flex gap-5">
                  <span className="font-bold">Inbound:</span>
                  <span>${0 || 0.0}</span>
                </li>
                <li className="flex gap-5">
                  <span className="font-bold">Outbound:</span>
                  <span>${1.2 || 0.0}</span>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="font-bold text-xl">Call</div>
              <ul className=" list-disc px-5">
                <li className="flex gap-5">
                  <span className="font-bold">Inbound:</span>
                  <span>${"1.2" || 0.0}</span>
                </li>
                <li className="flex gap-5">
                  <span className="font-bold">Outbound:</span>
                  <span>${"1.2" || 0.0}</span>
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
