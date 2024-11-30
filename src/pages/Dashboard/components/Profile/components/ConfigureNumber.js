import React from "react";
import ReactSelectField from "../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/Button";
import { updateUserRec } from "../../../../../redux/services/user";
const ConfigureNumber = ({
  claimedNumbers,
  dispatch,
  user,
  token,
  isLoading,
}) => {
  console.log("🚀 ~ ConfigureNumber ~ claimedNumbers:", claimedNumbers);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    dispatch(
      updateUserRec(token, user?.id, {
        twilio_selected_number: data.number.value,
      })
    );
  };
  return (
    <div className="lg:px-48">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5"
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
  );
};

export default ConfigureNumber;
