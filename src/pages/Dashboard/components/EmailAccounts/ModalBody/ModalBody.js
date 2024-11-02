import React, { useEffect } from "react";
import Heading from "../../../../../components/Heading";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import InputField from "../../../../../components/FormFields/InputField/InputField";
import { FaCogs, FaTags, FaUserAlt } from "react-icons/fa";
import { TbLocation } from "react-icons/tb";
import Button from "../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../../../../components/FormFields/TextEditor/TextEditor";
import {
  addWarmupRec,
  getWarmupApi,
} from "../../../../../redux/services/warmup";
const ModalBody = ({ selectedEmail }) => {
  console.log("🚀 ~ ModalBody ~ selectedEmail:", selectedEmail);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const { user_id, token } = useSelector((state) => state.auth);
  const { warmupData } = useSelector((state) => state.warmup);
  console.log("🚀 ~ ModalBody ~ warmupData:", warmupData);
  const formSubmit = (data) => {
    const tags = data?.tags;
    const params = {
      user_id: user_id,
      email_id: selectedEmail?.id,
      sender_first_name: data?.firstname,
      sender_last_name: data?.lastname,
      daily_limit: data?.daily_limit,
      signature: data?.signature,
      tags: tags,
      wait_time: parseInt(data?.wait_time),
      reply_to: data?.reply_to,
      // email_sent: 0,
      // email_opens: 0,
    };
    console.log("🚀 ~ formSubmit ~ params:", params);
    dispatch(addWarmupRec(token, params));
    return {};
  };

  useEffect(() => {
    dispatch(getWarmupApi(token, selectedEmail?.id));
    return () => {};
  }, [dispatch, token, selectedEmail]);
  useEffect(() => {
    setValue("firstname", warmupData?.sender_first_name);
    setValue("lastname", warmupData?.sender_last_name);
    setValue("daily_limit", warmupData?.daily_limit);
    setValue("signature", warmupData?.signature);
    setValue("tags", warmupData?.tags);
    setValue("wait_time", warmupData?.wait_time);
    setValue("reply_to", warmupData?.reply_to);
    return () => {};
  }, [warmupData, setValue]);
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className=" overflow-scroll h-[70vh] flex flex-col gap-5"
    >
      <div className="p-8 rounded-md shadow-md border bg-white border-gray-200">
        <div className=" justify-between">
          <div className="border-b  flex gap-5 ">
            <div>
              <FaUserAlt className="mt-1" />
            </div>
            <Heading text={"Sender Info"} className=" text-xl font-extrabold" />
          </div>
          <div className="py-5 grid lg:grid-cols-2 gap-5 sm:grid-cols-1">
            <InputField
              name="firstname"
              placeholder="First Name"
              label="First Name"
              control={control}
              errors={errors}
            />
            <InputField
              name="lastname"
              placeholder="Last Name"
              label="Last Name"
              control={control}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="p-8 rounded-md shadow-md border bg-white border-gray-200">
        <div className=" justify-between">
          <div className="border-b  flex gap-5 ">
            <div>
              <FaTags className="mt-1" />
            </div>
            <Heading text={"Tags"} className=" text-xl font-extrabold" />
          </div>
          <div className="py-5  gap-5 sm:grid-cols-1">
            <ReactSelectField
              name="tags"
              placeholder="Select"
              control={control}
              errors={errors}
              isMulti={true}
              options={[
                {
                  label: "New",
                  value: 1,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="p-8 rounded-md shadow-md border bg-white border-gray-200">
        <div className=" justify-between">
          <div className="border-b  flex gap-5 ">
            <div>
              <TbLocation className="mt-1" />
            </div>
            <Heading
              text={"Compaign Setting"}
              className=" text-xl font-extrabold"
            />
          </div>
          <div className="py-5 grid lg:grid-cols-3  gap-5 sm:grid-cols-1">
            <InputField
              name="daily_limit"
              placeholder="Daily Limit"
              label="Daily Limit"
              control={control}
              errors={errors}
            />
            <InputField
              name="wait_time"
              placeholder="Minimum Wait Time"
              label="Minimum Wait Time"
              control={control}
              errors={errors}
            />
            <InputField
              name="reply_to"
              placeholder="Reply TO"
              label="Reply TO"
              control={control}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="p-8 rounded-md shadow-md border bg-white border-gray-200">
        <div className=" justify-between">
          <div className="border-b  flex gap-5 ">
            <div>
              <FaCogs className="mt-1" />
            </div>
            <Heading
              text={"Warmup Settings Basic"}
              className=" text-xl font-extrabold"
            />
          </div>
          <div className="py-5 grid lg:grid-cols-2  gap-5 sm:grid-cols-1">
            <InputField
              name="signature"
              placeholder="Signature"
              label="Signature"
              control={control}
              errors={errors}
            />

            <InputField
              name="warmup_limit"
              type="number"
              placeholder="Warmup Limit"
              label="Warmup Limit"
              control={control}
              errors={errors}
            />
          </div>
          {/* <div className="py-5 grid lg:grid-cols-1  gap-5 sm:grid-cols-1">
            <TextEditor
              name="signature"
              label="Signature"
              control={control}
              errors={errors}
            />
          </div> */}
        </div>
      </div>
      <Button type="submit" className="py-3">
        Submit
      </Button>
    </form>
  );
};

export default ModalBody;
