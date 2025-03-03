import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordApi,
  registerUser,
  verifyOTPRec,
} from "../../redux/services/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
const OTP = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [isVerified, setIsVerified] = useState();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user_id, isLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const handleFormSubmit = async (data) => {
    const params = {
      code: data.code,
    };
    const response = await dispatch(verifyOTPRec(user_id, params));
    console.log("🚀 ~ handleFormSubmit ~ is_verified:", response);
    if (response) {
      setIsVerified(true);
    }
  };
  useEffect(() => {
    if (email && isVerified) {
      navigateTo("/");
    } else if (isVerified && !email) {
      navigateTo("/subscriptions");
    }
  }, [isVerified, navigateTo, email]);
  const handleResendVerification = () => {
    const params = {
      email: email,
    };
    dispatch(forgotPasswordApi(params));
  };
  return (
    // <Layout
    //   component={
    <section className=" bg-gray-100 h-screen flex justify-center items-center">
      {/* <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto"> */}
      {/* <div className="flex flex-col justify-center text-center">
          <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white  text-gray-800">
            Verify Yourself!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-400">
            We've mail you 6 digit OTP on your account.
          </p>
        </div> */}
      <div className="w-96">
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            OTP Verification
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <InputField
                name="code"
                type="number"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="OTP"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />{" "}
              <div className="float-end">
                <Link
                  onClick={handleResendVerification}
                  className="py-3 text-blue-400"
                >
                  Resend Verification OTP
                </Link>
              </div>
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
    //   }
    // ></Layout>
  );
};

export default OTP;
