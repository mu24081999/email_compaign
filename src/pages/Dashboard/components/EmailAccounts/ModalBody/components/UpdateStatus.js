import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Switcher from "../../../../../../components/FormFields/Switcher/Switcher";
import Heading from "../../../../../../components/Heading";
import Button from "../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateWarmupRec } from "../../../../../../redux/services/warmup";

const UpdateStatus = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { token } = useSelector((state) => state.auth);
  const { warmupData } = useSelector((state) => state.warmup);

  const dispatch = useDispatch();
  const formSubmit = (data) => {
    const params = {
      enabled: data?.status,
    };
    dispatch(updateWarmupRec(token, params, warmupData?.id));
  };
  useEffect(() => {
    setValue("status", warmupData?.enabled === 1 ? true : false);
    return () => {};
  }, [warmupData, setValue]);
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between py-5">
        <div>
          <Heading text={"Enabled"} className="font-extrabold" />
          <p>Enable to send warmup emails.</p>
        </div>
        <div className="flex justify-end">
          <Switcher name="status" control={control} errors={errors} />
        </div>{" "}
      </div>
      <div className="mt-5 flex justify-end">
        <Button type="submit" className="py-3">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UpdateStatus;
