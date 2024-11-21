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
  const { isLoading, user } = useSelector((state) => state.auth);
  const handleFormSubmit = async (data) => {
    const params = {
      email: user.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    dispatch(resetUserPasswordApi(params));
  };

  return (
    <form
      className="mt-8 gap-5 grid grid-cols-2"
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
  );
};

export default PasswordReset;
