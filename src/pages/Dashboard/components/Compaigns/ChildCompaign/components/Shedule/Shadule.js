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
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's timezone
  console.log("🚀 ~ Shadule ~ userTimezone:", userTimezone);

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
    const from = moment(data?.from).format("YYYY-MM-DD HH:mm:ss"); // Your time string
    const to = moment(data?.to).format("YYYY-MM-DD HH:mm:ss"); // Your time string

    const params = {
      compaign_id: parseInt(id),
      user_id: user_id,
      name: data.name,
      from: from,
      // to: null,
      timezone: data?.timezone?.value,
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
    setValue(
      "from",
      selectedSchedule?.from
      // new Date(selectedSchedule?.from)
    );
    setValue("to", moment(selectedSchedule?.to).format("DD-MM-YYYY hh:mm:ss"));
    setValue("timezone", selectedSchedule?.timezone);
  }, [selectedSchedule, setValue]);
  const deleteSchedule = (id) => {
    dispatch(deleteScheduleApi(token, id, user_id));
  };

  const selectedFromTime = watch("from");
  console.log("🚀 ~ Shadule ~ selectedFromTime:", selectedFromTime);

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

            <div className="w-full">
              <DatePickerFeild
                name="from"
                placeHolder="From"
                label="Start Date/Time"
                minDate={Date.now()}
                errors={errors}
                control={control}
                // defaultValue={moment(new Date()).format("YYYY-MM-DD")}
                // showYearPicker={true}
                // minTime={moment(new Date().getTime()).format("hh:mm:ss")}
                // maxTime={moment("23:59:00").format("hh:mm:ss")}
              />
            </div>
            <div className="w-full">
              <Heading
                className="font-extrabold pb-2"
                text={"Timezone"}
              ></Heading>
              <InputField
                disabled={true}
                defaultValue={userTimezone}
                name="timezone"
                control={control}
                label="Timezone"
                errors={errors}
              />
            </div>
            {/* <ReactSelectField
              name="timezone"
              placeholder="Timezone"
              control={control}
              errors={errors}
              label={"Timezone"}
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
            {/* <DatePickerFeild
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
            /> */}
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
