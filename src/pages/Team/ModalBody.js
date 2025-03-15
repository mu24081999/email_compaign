import React from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendInvitationApi } from "../../redux/services/team";
const ModalBody = ({ loading }) => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user_id, user } = useSelector((state) => state.auth);
  const handleInvite = (data) => {
    dispatch(sendInvitationApi(token, data));
  };
  return (
    <div className="px-5">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleInvite)}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <InputField
              name="firstname"
              control={control}
              //   disabled={member?.id ? true : false}
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
              //   disabled={member?.id ? true : false}
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
            name="email"
            type="email"
            control={control}
            // disabled={member?.id ? true : false}
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
        {/* <div className="py-2">
          <ReactSelectField
            name="role"
            placeholder="Role"
            label="Role"
            control={control}
            errors={errors}
            mb={false}
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "Manager",
                value: "manager",
              },
              {
                label: "Content Creator",
                value: "content_creator",
              },
              {
                label: "Analyst",
                value: "analyst",
              },
            ]}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
        </div> */}
        <Button
          type="submit"
          loading={loading}
          className="py-3 bg-gray-900 hover:bg-gray-800 text-white"
        >
          Invite
        </Button>
      </form>
    </div>
  );
};

export default ModalBody;
