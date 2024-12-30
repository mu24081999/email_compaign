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
  deleteScheduleApi,
  getSchedulesApi,
} from "../../../../../../../redux/services/schedule";
import moment from "moment";
import { FaTrashAlt } from "react-icons/fa";
import DatePickerFeild from "../../../../../../../components/FormFields/DatePickerField/DatePickerField";
import { now } from "lodash";
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
  const { id } = useParams();
  const getTimezones = useCallback(async () => {
    const response = await axios.get(
      "https://timeapi.io/api/timezone/availabletimezones"
    );
    setTimezones(response.data);
  }, []);
  const formSubmit = (data) => {
    const from = data?.from; // Your time string
    const to = data?.to; // Your time string

    const params = {
      compaign_id: parseInt(id),
      user_id: user_id,
      name: data.name,
      from: from,
      to: to,
      // timezone: data?.timezone?.value,
    };
    console.log(params);
    dispatch(addScheduleApi(token, params));
  };
  useEffect(() => {
    const query = `user_id=${user_id}`;
    // const query = `compaign_id=${id}`;
    getTimezones();
    dispatch(getSchedulesApi(token, query));
  }, [getTimezones, token, dispatch, user_id]);
  useEffect(() => {
    setValue("name", selectedSchedule?.name);
    // setValue("from", {
    //   label: moment(selectedSchedule?.from).format("HH:mm a"),
    //   value: moment(selectedSchedule?.from).format("HH:mm a"),
    // });
    setValue(
      "from",
      moment(selectedSchedule?.from).format("DD-MM-YYYY hh:mm:ss")
    );
    setValue("to", moment(selectedSchedule?.to).format("DD-MM-YYYY hh:mm:ss"));
    setValue("timezone", {
      label: selectedSchedule?.timezone,
      value: selectedSchedule?.timezone,
    });
  }, [selectedSchedule, setValue]);
  const deleteSchedule = (id) => {
    dispatch(deleteScheduleApi(token, id, user_id));
  };
  // const schedules = [
  //   {
  //     id: 1,
  //     schedule_name: "New Schedule",
  //     from: "09:00 AM",
  //     to: "09:00 AM",
  //     timezone: "Asia/Karachi",
  //   },
  // ];
  // Time options for dropdown
  const currentTime = moment(); // Get the current time
  const selectedFromTime = watch("from");
  console.log("🚀 ~ Shadule ~ selectedFromTime:", selectedFromTime);
  // const allTimes = [
  //   { label: "12:00 AM", value: "00:00" },
  //   { label: "12:15 AM", value: "00:15" },
  //   { label: "12:30 AM", value: "00:30" },
  //   { label: "12:45 AM", value: "00:45" },
  //   { label: "01:00 AM", value: "01:00" },
  //   { label: "01:15 AM", value: "01:15" },
  //   { label: "01:30 AM", value: "01:30" },
  //   { label: "01:45 AM", value: "01:45" },
  //   { label: "02:00 AM", value: "02:00" },
  //   { label: "02:15 AM", value: "02:15" },
  //   { label: "02:30 AM", value: "02:30" },
  //   { label: "02:45 AM", value: "02:45" },
  //   { label: "03:00 AM", value: "03:00" },
  //   { label: "03:15 AM", value: "03:15" },
  //   { label: "03:30 AM", value: "03:30" },
  //   { label: "03:45 AM", value: "03:45" },
  //   { label: "04:00 AM", value: "04:00" },
  //   { label: "04:15 AM", value: "04:15" },
  //   { label: "04:30 AM", value: "04:30" },
  //   { label: "04:45 AM", value: "04:45" },
  //   { label: "05:00 AM", value: "05:00" },
  //   { label: "05:15 AM", value: "05:15" },
  //   { label: "05:30 AM", value: "05:30" },
  //   { label: "05:45 AM", value: "05:45" },
  //   { label: "06:00 AM", value: "06:00" },
  //   { label: "06:15 AM", value: "06:15" },
  //   { label: "06:30 AM", value: "06:30" },
  //   { label: "06:45 AM", value: "06:45" },
  //   { label: "07:00 AM", value: "07:00" },
  //   { label: "07:15 AM", value: "07:15" },
  //   { label: "07:30 AM", value: "07:30" },
  //   { label: "07:45 AM", value: "07:45" },
  //   { label: "08:00 AM", value: "08:00" },
  //   { label: "08:15 AM", value: "08:15" },
  //   { label: "08:30 AM", value: "08:30" },
  //   { label: "08:45 AM", value: "08:45" },
  //   { label: "09:00 AM", value: "09:00" },
  //   { label: "09:15 AM", value: "09:15" },
  //   { label: "09:30 AM", value: "09:30" },
  //   { label: "09:45 AM", value: "09:45" },
  //   { label: "10:00 AM", value: "10:00" },
  //   { label: "10:15 AM", value: "10:15" },
  //   { label: "10:30 AM", value: "10:30" },
  //   { label: "10:45 AM", value: "10:45" },
  //   { label: "11:00 AM", value: "11:00" },
  //   { label: "11:15 AM", value: "11:15" },
  //   { label: "11:30 AM", value: "11:30" },
  //   { label: "11:45 AM", value: "11:45" },
  //   { label: "12:00 PM", value: "12:00" },
  //   { label: "12:15 PM", value: "12:15" },
  //   { label: "12:30 PM", value: "12:30" },
  //   { label: "12:45 PM", value: "12:45" },
  //   { label: "01:00 PM", value: "13:00" },
  //   { label: "01:15 PM", value: "13:15" },
  //   { label: "01:30 PM", value: "13:30" },
  //   { label: "01:45 PM", value: "13:45" },
  //   { label: "02:00 PM", value: "14:00" },
  //   { label: "02:15 PM", value: "14:15" },
  //   { label: "02:30 PM", value: "14:30" },
  //   { label: "02:45 PM", value: "14:45" },
  //   { label: "03:00 PM", value: "15:00" },
  //   { label: "03:15 PM", value: "15:15" },
  //   { label: "03:30 PM", value: "15:30" },
  //   { label: "03:45 PM", value: "15:45" },
  //   { label: "04:00 PM", value: "16:00" },
  //   { label: "04:15 PM", value: "16:15" },
  //   { label: "04:30 PM", value: "16:30" },
  //   { label: "04:45 PM", value: "16:45" },
  //   { label: "05:00 PM", value: "17:00" },
  //   { label: "05:15 PM", value: "17:15" },
  //   { label: "05:30 PM", value: "17:30" },
  //   { label: "05:45 PM", value: "17:45" },
  //   { label: "06:00 PM", value: "18:00" },
  //   { label: "06:15 PM", value: "18:15" },
  //   { label: "06:30 PM", value: "18:30" },
  //   { label: "06:45 PM", value: "18:45" },
  //   { label: "07:00 PM", value: "19:00" },
  //   { label: "07:15 PM", value: "19:15" },
  //   { label: "07:30 PM", value: "19:30" },
  //   { label: "07:45 PM", value: "19:45" },
  //   { label: "08:00 PM", value: "20:00" },
  //   { label: "08:15 PM", value: "20:15" },
  //   { label: "08:30 PM", value: "20:30" },
  //   { label: "08:45 PM", value: "20:45" },
  //   { label: "09:00 PM", value: "21:00" },
  //   { label: "09:15 PM", value: "21:15" },
  //   { label: "09:30 PM", value: "21:30" },
  //   { label: "09:45 PM", value: "21:45" },
  //   { label: "10:00 PM", value: "22:00" },
  //   { label: "10:15 PM", value: "22:15" },
  //   { label: "10:30 PM", value: "22:30" },
  //   { label: "10:45 PM", value: "22:45" },
  //   { label: "11:00 PM", value: "23:00" },
  //   { label: "11:15 PM", value: "23:15" },
  //   { label: "11:30 PM", value: "23:30" },
  //   { label: "11:45 PM", value: "23:45" },
  // ];

  // // Filter available options for the "From" field based on the current time
  // const fromOptions = allTimes.filter((time) => {
  //   const optionTime = moment(time.value, "HH:mm");
  //   return optionTime.isSameOrAfter(currentTime, "minute");
  // });

  // // Filter available options for the "To" field based on the selected "From" time
  // const toOptions = allTimes.filter((time) => {
  //   const optionTime = moment(time.value, "HH:mm");
  //   return (
  //     selectedFromTime &&
  //     optionTime.isAfter(moment(selectedFromTime, "HH:mm"), "minute")
  //   );
  // });

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
      <div className="flex flex-col gap-5">
        {Array.isArray(schedules?.schedules) &&
          schedules?.schedules?.map((item, index) => (
            <div
              className={`${
                item?.id === selectedSchedule?.id &&
                "border-2 border-indigo-600"
              } cursor-pointer p-5 bg-white dark:bg-gray-800 border border-gray-100 rounded-md shadow-md font-extrabold`}
              key={index}
              onClick={() => setSelectedSchedule(item)}
            >
              <span> {item?.name} </span>
              <button
                className=" float-end"
                onClick={() => deleteSchedule(item?.id)}
              >
                <FaTrashAlt color="red" />
              </button>
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="col-span-2 flex flex-col gap-5"
      >
        <div className="p-8 rounded-md shadow-md border bg-white dark:bg-gray-800 border-gray-100">
          <InputField
            name="name"
            control={control}
            label="Schedule Name"
            errors={errors}
          />
        </div>
        <div className=" p-8 rounded-md shadow-md border border-gray-100 bg-white dark:bg-gray-800">
          <Heading text={"Timing"} className="font-extrabold py-3 " />
          <div className="flex gap-5">
            {/* <ReactSelectField
              name="from"
              placeholder="From"
              control={control}
              errors={errors}
              options={fromOptions}
            />
            <ReactSelectField
              name="to"
              placeholder="To"
              control={control}
              errors={errors}
              options={toOptions}
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
            /> */}
            <DatePickerFeild
              name="from"
              placeHolder="From"
              // defaultValue={moment(new Date()).format("YYYY-MM-DD")}
              label="Start Date/Time"
              minDate={Date.now()}
              // showYearPicker={true}
              // minTime={moment(new Date().getTime()).format("hh:mm:ss")}
              // maxTime={moment("23:59:00").format("hh:mm:ss")}
              errors={errors}
              control={control}
            />
            <DatePickerFeild
              name="to"
              placeHolder="To"
              // defaultValue={moment(new Date()).format("YYYY-MM-DD")}
              label="End Date/Time"
              minDate={Date.now()}
              // showYearPicker={true}
              // minTime={moment(new Date().getTime()).format("hh:mm:ss")}
              // maxTime={moment("23:59:00").format("hh:mm:ss")}
              errors={errors}
              control={control}
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
