import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";
import { FaEdit, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoogleAppForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { token, user_id } = useSelector((state) => state.auth);
  const formSubmit = async (formData) => {
    console.log(formData);
    const params = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
      type: "gmail",
    };
    const response = await dispatch(addEmailAccountApi(token, params));
    if (response.done === true) {
      navigateTo("/accounts");
    }
  };
  return (
    <div className="p-5 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
      <Button
        className="mb-2"
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
      <ListItemCard
        icon={<FcGoogle size={30} color="blue" />}
        title={"Connect Your Google Account"}
        description="Gmail / G-suite"
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
          {" "}
          <InputField
            name="email"
            svg={<FaEnvelope />}
            control={control}
            errors={errors}
            label="Email Account"
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
            control={control}
            svg={<FaLock />}
            errors={errors}
            label="Google App Password"
            description={
              <>
                <p>Enter your 16 character app password</p>
                <p className="font-extrabold  text-indigo-700">
                  wthout any space
                </p>
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
          <Button type="submit" className="py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GoogleAppForm;
