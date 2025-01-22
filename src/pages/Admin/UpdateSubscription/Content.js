import React, { useEffect } from "react";
import Heading from "../../../components/Heading";
import InputField from "../../../components/FormFields/InputField/InputField";
import { MdDriveFileRenameOutline, MdPassword } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import {
  createSubscriptionApi,
  getUserSubscriptionApi,
} from "../../../redux/services/subscription";
import DatePickerFeild from "../../../components/FormFields/DatePickerField/DatePickerField";
import ReactSelectField from "../../../components/FormFields/ReactSelectField/ReactSelectField";

const Content = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { user_id } = useParams();
  const { isLoading, token } = useSelector((state) => state.auth);
  const { subscription } = useSelector((state) => state.subscription);
  console.log("🚀 ~ Content ~ subscription:", subscription);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleFormSubmit = async (data) => {
    const params = {
      emails_limit: data.emails_limit,
      leads_limit: data.leads_limit,
      templates_limit: data.templates_limit,
      sequence_limit: data.sequence_limit,
      allowed_credit: data.allowed_credit,
      email_validations_limit: data.email_validations_limit,
      start_date: data.start_date,
      end_date: data.end_date,
      monthly_price: data.monthly_price,
      yearly_price: data.yearly_price,
      discount_percentage: data.discount_percentage,
      plan_name: data?.plan?.value,
      user_id: user_id,
    };
    dispatch(createSubscriptionApi(token, params));
  };
  useEffect(() => {
    dispatch(getUserSubscriptionApi(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    if (subscription) {
      setValue("leads_limit", subscription?.leads_limit);
      setValue("plan", {
        label: subscription?.plan_name,
        value: subscription?.plan_name,
      });
      setValue("emails_limit", subscription?.emails_limit);
      setValue("templates_limit", subscription?.templates_limit);
      setValue("sequence_limit", subscription?.sequence_limit);
      setValue("allowed_credit", subscription?.allowed_credit);
      setValue("email_validations_limt", subscription?.email_validations_limt);
      setValue("start_date", subscription?.start_date);
      setValue("end_date", subscription?.end_date);
      setValue("monthly_price", subscription?.monthly_price);
      setValue("yearly_price", subscription?.yearly_price);
      setValue("discount_percentage", subscription?.discount_percentage);
    }
    return () => {};
  }, [subscription, setValue]);
  return (
    <div className="w-full grid place-items-center h-screen">
      <div className="lg:w-1/2 m-auto">
        <Heading
          className="text-center font-extrabold text-4xl"
          text={"Subscription Details"}
        />
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="py-2 col-span-2">
              <ReactSelectField
                name="plan"
                placeholder="Plan Name"
                label="Plan Name"
                control={control}
                errors={errors}
                mb={false}
                options={[
                  {
                    label: "Starter",
                    value: "Starter",
                  },
                  {
                    label: "Professional",
                    value: "Professional",
                  },
                  {
                    label: "Agency",
                    value: "Agency",
                  },
                  {
                    label: "Custom",
                    value: "Custom",
                  },
                ]}
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
                name="emails_limit"
                type="number"
                control={control}
                errors={errors}
                label="Emails Limit / Month"
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
                name="leads_limit"
                type="number"
                control={control}
                errors={errors}
                label="Leads Limit"
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
                name="templates_limit"
                type="number"
                control={control}
                errors={errors}
                label="Templates Limit"
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
                name="sequence_limit"
                type="number"
                control={control}
                errors={errors}
                label="Sequence Limit"
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
                name="email_validations_limt"
                type="number"
                control={control}
                errors={errors}
                label="Email Validations Limit"
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
                name="allowed_credit"
                type="number"
                control={control}
                errors={errors}
                label="Alocate Credit"
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
                name="monthly_price"
                type="number"
                defaultValue={0}
                control={control}
                errors={errors}
                label="Monthly Payable"
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
                name="yearly_price"
                type="number"
                control={control}
                errors={errors}
                label="Total Payable Amount"
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
                name="discount_percentage"
                type="number"
                control={control}
                errors={errors}
                label="Discount Percentage"
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
                name="yearly_price"
                type="number"
                control={control}
                errors={errors}
                label="Discount Amount"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div>
              <DatePickerFeild
                name="start_date"
                noShowTime={true}
                placeHolder="Start Date"
                label="Start Date"
                errors={errors}
                control={control}
              />
            </div>
            <div>
              <DatePickerFeild
                name="end_date"
                noShowTime={true}
                placeHolder="End Date"
                label="End Date"
                errors={errors}
                control={control}
              />
            </div>
          </div>

          <Button type="submit" loading={isLoading} className="py-3">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Content;
