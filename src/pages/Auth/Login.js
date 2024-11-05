import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import InputField from "../../components/FormFields/InputField/InputField";
import Checkbox from "../../components/FormFields/Checkbox/Checkbox";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/services/auth";
import { Link, useNavigate } from "react-router-dom";
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

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

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
      <section className=" bg-gradient-to-r from-cyan-500 to-neutral-100 h-screen dark:bg-gray-900 flex justify-center">
        <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16 m-auto">
          <div className="flex flex-col justify-center text-center">
            <h1 className="  mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl dark:text-white text-gray-50">
              Power Up Your Marketing{" "}
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-50 lg:text-xl dark:text-gray-400">
              Leverage advanced analytics, personalized content, and powerful
              automation to boost your engagement and measure your success every
              step of the way.
            </p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign In
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
                <div>
                  <InputField
                    name="password"
                    type="password"
                    control={control}
                    svg={<MdPassword />}
                    errors={errors}
                    // placeholder="Enter your password"
                    label="Password"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />
                </div>
                <div className="flex">
                  <div className="flex items-center h-5">
                    <Checkbox
                      name="remember"
                      control={control}
                      errors={errors}
                      label="Remember me"
                    />{" "}
                  </div>

                  <Link
                    to="#"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </Link>
                </div>
                <Button
                  loading={isLoading}
                  type="submit"
                  // variant="success"
                  size="lg"
                  className="py-2"
                >
                  Login to your account
                </Button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Not registered yet?{" "}
                  <Link
                    to="/sign-up"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </Link>
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
