import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addEmailAccountApi } from "../../../../../../../redux/services/email";
import { FaEdit, FaEnvelope, FaLock } from "react-icons/fa";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const OutlookForm = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.email);
  const { token, user_id } = useSelector((state) => state.auth);
  const formSubmit = async (formData) => {
    console.log(formData);
    const params = {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      user_id: user_id,
      email: formData?.email,
      password: formData?.password,
      type: "outlook",
    };
    const response = await dispatch(addEmailAccountApi(token, params));
    if (response.done === true) {
      navigateTo("/accounts");
    }
  };
  return (
    <div className="p-5 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
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
            name="firstname"
            svg={<FaEdit />}
            control={control}
            errors={errors}
            label="First Name"
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          {" "}
          <InputField
            name="lastname"
            svg={<FaEdit />}
            control={control}
            errors={errors}
            label="Last Name"
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          {" "}
          <InputField
            name="email"
            svg={<FaEnvelope />}
            control={control}
            errors={errors}
            label="Email Account"
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div className="col-span-2">
          <InputField
            name="password"
            control={control}
            svg={<FaLock />}
            errors={errors}
            label="Account Password"
            description={
              <>
                <p>Enter your account password </p>
              </>
            }
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div>
        <div>
          <Button loading={isLoading} type="submit" className="py-2 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OutlookForm;
