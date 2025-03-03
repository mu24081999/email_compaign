import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdPassword } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordApi, verifyOTPApi } from "../../redux/services/auth";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { email } = useParams();
  const [isVerified, setIsVerified] = useState();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const handleFormSubmit = async (data) => {
    const params = {
      email: email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const is_verified = await dispatch(resetPasswordApi(params));
    if (is_verified.success) {
      setIsVerified(true);
    }
  };
  useEffect(() => {
    if (isVerified) {
      navigateTo(`/sign-in`);
    }
  }, [isVerified, navigateTo, email]);
  return (
    <section className=" bg-gray-100 h-screen flex justify-center items-center">
      {/* <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto">
        <div className="flex flex-col justify-center text-center">
          <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white  text-gray-800">
            Reset Password
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-400">
            Create a new password to regain access to your account
          </p>
        </div> */}
      <div className="w-96">
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <InputField
                name="password"
                type="password"
                control={control}
                svg={<MdPassword />}
                errors={errors}
                label="Password"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div>
              <InputField
                name="confirmPassword"
                type="password"
                control={control}
                svg={<MdPassword />}
                errors={errors}
                label="Confirm Password"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigateTo("/sign-in")}
                className="py-3 bg-slate-400"
              >
                Back
              </Button>
              <Button loading={isLoading} type="submit" className="py-3">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ResetPassword;
