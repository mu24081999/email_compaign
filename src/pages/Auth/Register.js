import React, { useEffect, useState } from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/services/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Checkbox from "../../components/FormFields/Checkbox/Checkbox";
import { FaRegEye } from "react-icons/fa";
import { registerTeamMember } from "../../redux/services/team";
const Register = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const params = new URLSearchParams(useLocation().search);
  const authType = params.get("authType");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isTeanRegistered, setIsTeanRegistered] = useState(false);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const handleFormSubmit = async (data) => {
    let formData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      username: data.username,
    };
    if (authType === "team") {
      formData.reference = params.get("reference");
      formData.invitation_ref = params.get("invitation_ref");
      formData.confirmPassword = data.confirmPassword;
      const registered = await dispatch(registerTeamMember(formData));
      if (registered?.data?.userData) {
        alert("User registration");
        setIsTeanRegistered(true);
      }
      return;
    }
    if (data.password === data.confirmPassword) {
      const is_registered = await dispatch(registerUser(formData));
      if (is_registered?.data?.userData) {
        setIsRegistered(true);
      }
    } else {
      toast.error("Confirm password is invalid!");
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigateTo("/otp");
    }
  }, [isRegistered, navigateTo]);
  useEffect(() => {
    if (isTeanRegistered) {
      navigateTo("/");
    }
  }, [isTeanRegistered, navigateTo]);
  useEffect(() => {
    if (params.get("firstname")) {
      setValue("firstname", params.get("firstname"));
    }
    if (params.get("lastname")) {
      setValue("lastname", params.get("lastname"));
    }
    if (params.get("email")) {
      setValue("email", params.get("email"));
      setValue("username", params.get("email").split("@")[0]);
    }
    if (params.get("role")) {
      setValue("role", params.get("role"));
    }
  }, [setValue]);
  return (
    // <Layout
    //   component={
    <section className=" bg-gray-100 h-screen flex justify-center items-center">
      {/* <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto"> */}
      {/* <div className="flex flex-col justify-center text-center">
          <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white  text-gray-800">
            Join Us Today!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-400">
            Create your account to unlock powerful tools and features. Sign up
            now to start your journey with us!
          </p>
        </div> */}
      <div>
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Create Your Account
          </h2>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <InputField
                  name="firstname"
                  control={control}
                  svg={<MdDriveFileRenameOutline />}
                  errors={errors}
                  label="First Name"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />{" "}
              </div>
              <div>
                <InputField
                  name="lastname"
                  control={control}
                  svg={<MdDriveFileRenameOutline />}
                  errors={errors}
                  label="Last Name"
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />{" "}
              </div>
            </div>
            <div>
              <InputField
                name="username"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="Username"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/, // Only alphabets and spaces allowed
                    message: "Only alphabets are allowed!",
                  },
                  min: 3,
                }}
              />{" "}
            </div>
            <div>
              <InputField
                name="email"
                type="email"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="Email Address"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />{" "}
            </div>
            <div>
              <InputField
                name="password"
                type="password"
                control={control}
                svg={<FaRegEye />}
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
                svg={<FaRegEye />}
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
            <div className="flex">
              <Checkbox
                name="agree"
                control={control}
                errors={errors}
                // label="By signing up, you agree to our Privacy Policy,Cookie Policy and Terms of Use"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <div>
                By signing up, you agree to our{" "}
                <Link className="text-blue-500" to={"/privacy-policy"}>
                  Privacy Policy
                </Link>
                , Cookie Policy and{" "}
                <Link
                  className="text-blue-500"
                  to={"https://senderside.com/terms"}
                >
                  Terms of Use
                </Link>
              </div>
            </div>
            <Button type="submit" loading={isLoading} className="py-3">
              Sign Up
            </Button>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Already have an account &nbsp;
              <Link
                to="/sign-in"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
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

export default Register;
