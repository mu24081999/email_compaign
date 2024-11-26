import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FaEdit, FaEnvelope, FaRegEnvelope, FaUserLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";

const MailProviderForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { token, user_id } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.email);
  const dispatch = useDispatch();

  const formSubmit = (formData) => {
    console.log(formData);
    const params = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,

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
    <div className="p-5 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
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
        description="IMAP / SMTP"
      />{" "}
      <form
        className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 pt-5"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="col-span-2">
          {" "}
          <InputField
            name="firstname"
            svg={<FaEdit />}
            control={control}
            errors={errors}
            label="First Name"
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          {" "}
          <InputField
            name="lastname"
            svg={<FaEdit />}
            control={control}
            errors={errors}
            label="Last Name"
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          <InputField
            name="email"
            svg={<FaEnvelope />}
            control={control}
            errors={errors}
            label="Email Account"
            placeholder={"Email Account"}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          <InputField
            name="password"
            svg={<FaUserLock />}
            control={control}
            errors={errors}
            label="Password"
            placeholder={"Password"}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
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
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-1">
          <InputField
            name="smpt_host"
            control={control}
            errors={errors}
            label="SMTP Host"
            placeholder={"SMTP Host"}
            description={
              <>
                <p>eg: mail.website.com</p>
              </>
            }
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div>
          <Button type="submit" loading={isLoading} className="py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MailProviderForm;
