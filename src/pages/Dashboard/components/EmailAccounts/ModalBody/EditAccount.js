import React, { useEffect } from "react";
import Button from "../../../../../components/Button";
import { useForm } from "react-hook-form";
import InputField from "../../../../../components/FormFields/InputField/InputField";
import { FaEdit, FaEnvelope, FaUserLock } from "react-icons/fa";
import ReactSelectField from "../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import _ from "lodash";
import { addEmailAccountApi } from "../../../../../redux/services/email";
import { useDispatch, useSelector } from "react-redux";

const EditAccount = ({ currentAccount }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { token, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formSubmit = async (formData) => {
    const params = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
      port: formData?.port,
      mail_provider: formData?.smpt_host,
      type: formData?.email_type?.value,
    };
    await dispatch(addEmailAccountApi(token, params));
    // if (response.done === true) {
    //   navigateTo("/accounts");
    // }
  };
  useEffect(() => {
    if (currentAccount) {
      setValue("firstname", currentAccount.firstname);
      setValue("lastname", currentAccount.lastname);
      setValue("email", currentAccount.email);
      setValue("password", currentAccount.password);
      setValue("port", currentAccount.port);
      setValue("mail_provider", currentAccount.mail_provider);
      setValue("email_type", {
        label: _.capitalize(currentAccount.type),
        value: currentAccount.type,
      });
    }
  }, [currentAccount, setValue]);
  return (
    <div className="flex justify-center">
      <div className="p-5  rounded-2xl border border-gray-300 shadow-xl w-full">
        <form
          className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 pt-5"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="py-2 col-span-2">
            <ReactSelectField
              name="email_type"
              placeholder="Email Type"
              label="Email Type"
              control={control}
              errors={errors}
              mb={false}
              options={[
                {
                  label: "Gmail",
                  value: "gmail",
                },
                {
                  label: "Professional",
                  value: "professional",
                },
                {
                  label: "Outlook",
                  value: "outlook",
                },
              ]}
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
          {currentAccount?.type === "professional" && (
            <div>
              <div className="col-span-1">
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
            </div>
          )}
          <div>
            <Button type="submit" className="py-2 ">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
