import React from "react";
import Layout from "../../../../../layout/Layout";
import { useForm } from "react-hook-form";
import InputField from "../../../../../components/FormFields/InputField/InputField";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCompaignRec } from "../../../../../redux/services/compaign";

const AddCompaign = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { token, user_id } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.compaign);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const add = async (data) => {
    const params = {
      user_id: user_id,
      title: data.title,
    };
    const is_added = await dispatch(addCompaignRec(token, params));
    if (is_added?.done) {
      navigateTo(`/compaign/${is_added?.id}?redirected=true`);
    }
  };
  return (
    <Layout
      component={
        <div className="lg:h-[90vh]  flex justify-center items-center">
          <div className="flex flex-col gap-14 w-[50%]">
            <div>
              <Heading
                text={"Let's create a new compaign"}
                align="center"
                level={1}
                className=" font-sans font-extrabold text-[30px]"
              />
              <p className="text-center">What would you like to name it?</p>
            </div>
            <form onSubmit={handleSubmit(add)} className="flex flex-col gap-10">
              <div>
                <InputField
                  name="title"
                  control={control}
                  errors={errors}
                  placeholder="Enter compaign name"
                  rules={{
                    required: {
                      value: true,
                      message: "Field Required!",
                    },
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigateTo("/")}
                  variant="secondary"
                  size="md"
                  className="py-3"
                  type="button"
                >
                  Back
                </Button>
                <Button loading={isLoading} type="submit" className="py-3">
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default AddCompaign;
