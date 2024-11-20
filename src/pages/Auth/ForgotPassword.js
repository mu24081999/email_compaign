import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordApi } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);
  const [isVerified, setIsVerified] = useState(null);
  const handleFormSubmit = async (data) => {
    const params = {
      email: data?.email,
    };
    const response = await dispatch(forgotPasswordApi(params));
    if (response.success) {
      setIsVerified(response);
    }
  };
  useEffect(() => {
    if (isVerified !== null && isVerified.success) {
      return navigateTo(`/verify-email/${isVerified.userData.email}`);
    }
    return () => {};
  }, [isVerified, navigateTo]);
  return (
    // <Layout
    //   component={
    <div>
      <section className=" bg-gradient-to-r from-cyan-500 to-neutral-100 h-screen dark:bg-gray-900 flex justify-center">
        <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto">
          <div className="flex flex-col justify-center text-center">
            <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white text-gray-900">
              Lost Your Password!
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-400">
              Don't worry! Enter your email address to reset your password.
            </p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Password Reset
              </h2>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div>
                  <InputField
                    name="email"
                    type="email"
                    control={control}
                    svg={<MdDriveFileRenameOutline />}
                    errors={errors}
                    // placeholder="Enter your email address"
                    label="Email Address"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />{" "}
                </div>
                <div className="flex justify-end">
                  <Button
                    loading={isLoading}
                    type="submit"
                    size="lg"
                    className="py-2"
                  >
                    Verify
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    //   }
    // />
  );
};

export default ForgotPassword;
