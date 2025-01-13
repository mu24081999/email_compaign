import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTPApi } from "../../redux/services/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { login } from "../../redux/slices/auth";
const VerifyEmail = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const location = useLocation();
  const is_two_fa_enabled = new URLSearchParams(location.search).get(
    "two_fa_enabled"
  );
  const { email } = useParams();
  const [isVerified, setIsVerified] = useState();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const handleFormSubmit = async (data) => {
    const params = {
      code: data.code,
      email: email,
    };
    const is_verified = await dispatch(verifyOTPApi(params));
    console.log("🚀 ~ handleFormSubmit ~ is_verified:", is_verified);
    if (is_verified.success) {
      // dispatch(login(is_verified.userData));
      setIsVerified(true);
    }
  };
  useEffect(() => {
    if (isVerified && is_two_fa_enabled === "true") {
      navigateTo("/");
    } else if (isVerified && !is_two_fa_enabled)
      navigateTo(`/reset-password/${email}`);
  }, [is_two_fa_enabled, isVerified, navigateTo, email]);

  return (
    <section className=" bg-gradient-to-r from-cyan-500 to-neutral-100 h-screen flex justify-center">
      <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto">
        <div className="flex flex-col justify-center text-center">
          <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white  text-gray-800">
            Verify Yourself!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-400">
            We've mail you 6 digit OTP on your account.
          </p>
        </div>
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
      </div>
    </section>
  );
};

export default VerifyEmail;
