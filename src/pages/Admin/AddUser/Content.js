import React, { useState } from "react";
import { addUser, registerUser } from "../../../redux/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/FormFields/InputField/InputField";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import Heading from "../../../components/Heading";

const Content = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleFormSubmit = async (data) => {
    const params = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      username: data.username,
    };
    if (data.password === data.confirmPassword) {
      const is_registered = await dispatch(addUser(params));
      console.log("🚀 ~ handleFormSubmit ~ is_registered:", is_registered);
      if (is_registered?.data?.userData) {
        navigateTo("/admin/users");
      }
    } else {
      toast.error("Confirm password is invalid!");
    }
  };
  return (
    <div className="w-full grid place-items-center h-screen">
      <div className="lg:w-1/2 m-auto">
        <Heading
          className="text-center font-extrabold text-4xl"
          text={"Register New User"}
        />
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
          <Button type="submit" loading={isLoading} className="py-3">
            Register New User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Content;
