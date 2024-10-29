import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";

const GoogleAppForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const formSubmit = (formData) => {
    console.log(formData);
    const params = {
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
    };
    dispatch(addEmailAccountApi(token, params));
  };
  return (
    <div className="p-8 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
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
      <ListItemCard
        icon={<FcGoogle size={30} color="blue" />}
        title={"Connect Your Google Account"}
        description="Gmail / G-suite"
      />{" "}
      <form
        className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 py-5"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="col-span-2">
          {" "}
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
            name="account_password"
            control={control}
            errors={errors}
            label="Google App Password"
            placeholder={"Your 16 characters google app password"}
            description={
              <>
                <p>Enter your 16 character app password</p>
                <p className="font-extrabold  text-indigo-700">
                  wthout any space
                </p>
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

export default GoogleAppForm;
