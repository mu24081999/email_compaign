import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FaRegEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";

const MailProviderForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formSubmit = (formData) => {
    console.log(formData);
    const params = {
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
      port: formData?.port,
      mail_provider: formData?.smpt_host,
      type: "professional",
    };
    dispatch(addEmailAccountApi(token, params));
  };
  return (
    <div className="p-8 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
      <div className="pb-5">
        <Button
          onClick={() =>
            handleMenu({
              menu: true,
              instruction: false,
              form: false,
            })
          }
        >
          Back
        </Button>
      </div>
      <ListItemCard
        icon={<FaRegEnvelope size={30} color="blue" />}
        title={"Connect Your Email Account"}
        description="IMAP / SMPT"
      />{" "}
      <form
        className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 py-5"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="col-span-2">
          <InputField
            name="email"
            control={control}
            errors={errors}
            label="Email Account"
            placeholder={"Email Account"}
          />
        </div>
        <div className="col-span-2">
          <InputField
            name="password"
            control={control}
            errors={errors}
            label="Password"
            placeholder={"Password"}
          />
        </div>
        <div className="col-span-1">
          {" "}
          <InputField
            name="port"
            control={control}
            errors={errors}
            label="Port"
            placeholder={"Port"}
          />
        </div>
        <div className="col-span-1">
          <InputField
            name="smpt_host"
            control={control}
            errors={errors}
            label="SMPT Host"
            placeholder={"SMPT Host"}
            description={
              <>
                <p>eg: mail.website.com</p>
              </>
            }
          />
        </div>
        <div>
          <Button type="submit" className="py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MailProviderForm;
