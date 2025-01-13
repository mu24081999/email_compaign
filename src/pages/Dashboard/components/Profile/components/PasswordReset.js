import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdPassword } from "react-icons/md";
import Button from "../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordApi,
  resetUserPasswordApi,
} from "../../../../../redux/services/auth";
import { useNavigate } from "react-router-dom";
import Heading from "../../../../../components/Heading";
import Switcher from "../../../../../components/FormFields/Switcher/Switcher";
import { updateUserRec } from "../../../../../redux/services/user";
const PasswordReset = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { token, isLoading, user } = useSelector((state) => state.auth);
  const handleFormSubmit = async (data) => {
    const params = {
      email: user.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    dispatch(resetUserPasswordApi(params));
  };
  const handleTwoFa = (event) => {
    const params = {
      is_two_fa_enabled: event.target.checked,
    };
    dispatch(updateUserRec(token, user.id, params));
  };
  return (
    <div className=" mt-10  p-5">
      <div className="">
        <Heading
          text={"Two Factor Authentication"}
          className="text-center font-extrabold text-xl"
        />
        <div className="flex justify-center py-5">
          <div>
            <div className="border bg-white dark:bg-gray-800 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Two Factor Authentication
                  </h2>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Enable two factor authentication to secure your account
                  </p>
                </div>
                <div className="flex justify-end ps-5">
                  <Switcher
                    defaultValue={user.is_two_fa_enabled}
                    onChange={handleTwoFa}
                    name="is_two_fa_enabled"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <Heading
          text={"Update Your Password"}
          className="text-center font-extrabold text-xl"
        />
        <form
          className="mt-8 w-4/12 m-auto flex gap-5 flex-col"
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
            <Button loading={isLoading} type="submit" className="py-3">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
