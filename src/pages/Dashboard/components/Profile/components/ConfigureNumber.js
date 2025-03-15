import React, { useEffect } from "react";
import ReactSelectField from "../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/Button";
import { updateUserRec } from "../../../../../redux/services/user";
import Heading from "../../../../../components/Heading";
const ConfigureNumber = ({
  claimedNumbers,
  dispatch,
  user,
  token,
  isLoading,
  user_id,
}) => {
  console.log("🚀 ~ user:", user);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    dispatch(
      updateUserRec(token, user_id, {
        twilio_selected_number: data.number.value,
      })
    );
  };
  useEffect(() => {
    if (user) {
      setValue("number", {
        label: user?.twilio_selected_number,
        value: user?.twilio_selected_number,
      });
    }
  }, [user, setValue]);
  return (
    <div className="flex items-center h-[68vh] justify-center">
      <div className=" py-5 border p-5 shadow-2xl">
        <div className="py-5">
          <Heading
            text={"Configure Number"}
            className="text-3xl font-extrabold text-center"
          />
          <p className="text-center">
            Select your number from your numbers list for calls/sms
          </p>
        </div>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-5"
        >
          <ReactSelectField
            name="number"
            placeholder="Number"
            control={control}
            errors={errors}
            options={
              Array.isArray(claimedNumbers) &&
              claimedNumbers?.map((number) => {
                return {
                  label: number?.phoneNumber,
                  value: number?.phoneNumber,
                };
              })
            }
          />
          <Button loading={isLoading} type="submit" className="py-3 px-2 ">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfigureNumber;
