import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../../../../layout/Layout";
import ReactSelectField from "../../../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Heading from "../../../../../../../components/Heading";
import axios from "axios";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addScheduleApi,
  getSchedulesApi,
} from "../../../../../../../redux/services/schedule";
import moment from "moment";
const Shadule = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const { user_id, token } = useSelector((state) => state.auth);
  const { schedules } = useSelector((state) => state.schedule);
  const [timezones, setTimezones] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  console.log("🚀 ~ Shadule ~ selectedSchedule:", selectedSchedule);
  const { id } = useParams();
  const getTimezones = useCallback(async () => {
    const response = await axios.get(
      "https://timeapi.io/api/timezone/availabletimezones"
    );
    console.log("🚀 ~ getTimezones ~ response:", response.data);
    setTimezones(response.data);
  }, []);
  const formSubmit = (data) => {
    console.log(data);
    const from = data?.from?.value; // Your time string
    const to = data?.to?.value; // Your time string

    // Parse the time string
    const fromParsedTime = moment(from, "HH:mm");
    const toParsedTime = moment(to, "HH:mm");

    // Format to desired output
    const fromFormattedTime = fromParsedTime.format("hh:mm A"); // For 12-hour format
    const toFormattedTime = toParsedTime.format("hh:mm A"); // For 12-hour formattoParsedTime

    // or for ISO string
    const fromIsoString = fromParsedTime.toISOString(); // Will give you an ISO string representation
    const toIsoString = toParsedTime.toISOString(); // Will give you an ISO string representation

    const params = {
      compaign_id: parseInt(id),
      user_id: user_id,
      name: data.name,
      from: fromIsoString,
      to: toIsoString,
      timezone: data?.timezone?.value,
    };
    console.log(params);
    dispatch(addScheduleApi(token, params));
  };
  useEffect(() => {
    getTimezones();
    dispatch(getSchedulesApi(token));
  }, [getTimezones, token, dispatch]);
  useEffect(() => {
    setValue("name", selectedSchedule?.name);
    setValue("from", {
      label: moment(selectedSchedule?.from).format("HH:mm a"),
      value: moment(selectedSchedule?.from).format("HH:mm a"),
    });
    setValue("to", {
      label: moment(selectedSchedule?.to).format("HH:mm a"),
      value: moment(selectedSchedule?.to).format("HH:mm a"),
    });
    setValue("timezone", {
      label: selectedSchedule?.timezone,
      value: selectedSchedule?.timezone,
    });
  }, [selectedSchedule, setValue]);
  // const schedules = [
  //   {
  //     id: 1,
  //     schedule_name: "New Schedule",
  //     from: "09:00 AM",
  //     to: "09:00 AM",
  //     timezone: "Asia/Karachi",
  //   },
  // ];
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
      <div className="flex flex-col gap-5">
        {Array.isArray(schedules?.schedules) &&
          schedules?.schedules?.map((item, index) => (
            <div
              className={`${
                item?.id === selectedSchedule?.id &&
                "border-2 border-indigo-600"
              } cursor-pointer p-5 bg-white border border-gray-100 rounded-md shadow-md font-extrabold`}
              key={index}
              onClick={() => setSelectedSchedule(item)}
            >
              {item?.name}
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="col-span-2 flex flex-col gap-5"
      >
        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <InputField
            name="name"
            control={control}
            label="Schedule Name"
            errors={errors}
          />
        </div>
        <div className=" p-8 rounded-md shadow-md border border-gray-100 bg-white">
          <Heading text={"Timing"} className="font-extrabold py-3 " />
          <div className="flex gap-5">
            <ReactSelectField
              name="from"
              placeholder="From"
              control={control}
              errors={errors}
              options={[
                { label: "12:00 AM", value: "00:00" },
                { label: "01:00 AM", value: "01:00" },
                { label: "02:00 AM", value: "02:00" },
                { label: "03:00 AM", value: "03:00" },
                { label: "04:00 AM", value: "04:00" },
                { label: "05:00 AM", value: "05:00" },
                { label: "06:00 AM", value: "06:00" },
                { label: "07:00 AM", value: "07:00" },
                { label: "08:00 AM", value: "08:00" },
                { label: "09:00 AM", value: "09:00" },
                { label: "10:00 AM", value: "10:00" },
                { label: "11:00 AM", value: "11:00" },
                { label: "12:00 PM", value: "12:00" },
                { label: "01:00 PM", value: "13:00" },
                { label: "02:00 PM", value: "14:00" },
                { label: "03:00 PM", value: "15:00" },
                { label: "04:00 PM", value: "16:00" },
                { label: "05:00 PM", value: "17:00" },
                { label: "06:00 PM", value: "18:00" },
                { label: "07:00 PM", value: "19:00" },
                { label: "08:00 PM", value: "20:00" },
                { label: "09:00 PM", value: "21:00" },
                { label: "10:00 PM", value: "22:00" },
                { label: "11:00 PM", value: "23:00" },
              ]}
            />
            <ReactSelectField
              name="to"
              placeholder="To"
              control={control}
              errors={errors}
              options={[
                { label: "12:00 AM", value: "00:00" },
                { label: "01:00 AM", value: "01:00" },
                { label: "02:00 AM", value: "02:00" },
                { label: "03:00 AM", value: "03:00" },
                { label: "04:00 AM", value: "04:00" },
                { label: "05:00 AM", value: "05:00" },
                { label: "06:00 AM", value: "06:00" },
                { label: "07:00 AM", value: "07:00" },
                { label: "08:00 AM", value: "08:00" },
                { label: "09:00 AM", value: "09:00" },
                { label: "10:00 AM", value: "10:00" },
                { label: "11:00 AM", value: "11:00" },
                { label: "12:00 PM", value: "12:00" },
                { label: "01:00 PM", value: "13:00" },
                { label: "02:00 PM", value: "14:00" },
                { label: "03:00 PM", value: "15:00" },
                { label: "04:00 PM", value: "16:00" },
                { label: "05:00 PM", value: "17:00" },
                { label: "06:00 PM", value: "18:00" },
                { label: "07:00 PM", value: "19:00" },
                { label: "08:00 PM", value: "20:00" },
                { label: "09:00 PM", value: "21:00" },
                { label: "10:00 PM", value: "22:00" },
                { label: "11:00 PM", value: "23:00" },
              ]}
            />
            <ReactSelectField
              name="timezone"
              placeholder="Timezone"
              control={control}
              errors={errors}
              options={
                Array.isArray(timezones) &&
                timezones?.map((zone, index) => {
                  return {
                    label: zone,
                    value: zone,
                  };
                })
              }
            />
          </div>
        </div>
        <div>
          <Button type="submit" className="py-3 px-2 bg-red-400">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Shadule;
