import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import InputField from "../../components/FormFields/InputField/InputField";
import Checkbox from "../../components/FormFields/Checkbox/Checkbox";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAuth = (data) => {
    console.log("🚀 ~ handleAuth ~ data:", data);
    const params = {
      email: data?.email,
      password: data?.password,
    };
    dispatch(loginUser(params));
    return {};
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);
  return (
    // <Layout
    //   component={
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto">
          <div className="flex flex-col justify-center text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white text-gray-800">
              We invest in the world’s potential
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Read more about our app
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Email Marketting
              </h2>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit(handleAuth)}
              >
                <div>
                  <InputField
                    name="email"
                    type="email"
                    control={control}
                    svg={<MdDriveFileRenameOutline />}
                    errors={errors}
                    placeholder="Enter your email address"
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
                    svg={<MdPassword />}
                    errors={errors}
                    placeholder="Enter your password"
                    label="Password"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox
                      name="remember"
                      control={control}
                      errors={errors}
                      label="Remember me"
                    />{" "}
                  </div>

                  <a
                    href="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <Button type="submit" variant="success" size="lg" className="">
                  Login to your account
                </Button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-500">
                    Create account
                  </a>
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

export default Login;
