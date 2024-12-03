import React, { useEffect } from "react";
import Layout from "../../../../../layout/Layout";
import InputField from "../../../../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import Heading from "../../../../../components/Heading";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserRec } from "../../../../../redux/services/user";
import _ from "lodash";
const AccountSettings = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token, user_id, user } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();

  //   const { userProfile, isProfileUpdated } = useSelector(
  //     (state) => state.profile
  //   );

  const handleProfileUpdate = (data) => {
    const params = {
      firstname: data?.firstname,
      lastname: data?.lastname,
      email: data?.email,
      phone: data?.phone,
      username: data?.username,
    };
    console.log("🚀 ~ handleProfileUpdate ~ params:", params);
    dispatch(updateUserRec(token, user_id, params));
  };

  useEffect(() => {
    setValue("firstname", user?.firstname);
    setValue("lastname", user?.lastname);
    setValue("email", _(user?.email));
    setValue("username", _(user?.username));
  }, [user, setValue]);

  return (
    <div className="py-10">
      <div class="flex items-center justify-center">
        {/* <!-- Author: FormBold Team --> */}
        <div class="mx-auto w-full max-w-[550px]  flex items-center">
          <div>
            <div>
              <Heading
                className="text-3xl font-extrabold text-center"
                text={"Update Your Account Setting"}
              />
            </div>
            <form
              className="mt-8 space-y-6"
              onSubmit={handleSubmit(handleProfileUpdate)}
            >
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
              <div>
                <InputField
                  name="username"
                  control={control}
                  svg={<MdDriveFileRenameOutline />}
                  errors={errors}
                  label="User Name"
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

              <Button type="submit" className="py-3">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
