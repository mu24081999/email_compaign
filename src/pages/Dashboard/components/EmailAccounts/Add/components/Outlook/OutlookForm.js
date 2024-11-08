import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";

const OutlookForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const formSubmit = (formData) => {
    console.log(formData);
    const params = {
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
      type: "gmail",
    };
    dispatch(addEmailAccountApi(token, params));
  };
  return (
    <div className="p-8 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
      <Button
        className="mb-2"
        onClick={() =>
          handleMenu({
            menu: true,
            instruction: false,
            form: false,
          })
        }
      >
        Back
      </Button>
      <ListItemCard
        icon={<PiMicrosoftOutlookLogo size={30} color="red" />}
        title={"Connect Your Microsoft Outlook"}
        description="Microsoft Outlook Account"
      />{" "}
      <form
        className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 py-5"
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="col-span-2">
          {" "}
          <InputField
            name="email"
            svg={<FaEnvelope />}
            control={control}
            errors={errors}
            label="Email Account"
          />
        </div>
        <div className="col-span-2">
          <InputField
            name="password"
            control={control}
            svg={<FaLock />}
            errors={errors}
            label="Google App Password"
            description={
              <>
                <p>Enter your account password </p>
              </>
            }
          />
        </div>
        <div>
          <Button type="submit" className="py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OutlookForm;
