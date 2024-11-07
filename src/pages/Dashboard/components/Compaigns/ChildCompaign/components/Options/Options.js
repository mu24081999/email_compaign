import React, { useEffect, useState } from "react";
import ReactSelectField from "../../../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Heading from "../../../../../../../components/Heading";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Switcher from "../../../../../../../components/FormFields/Switcher/Switcher";
import { FaRegEye } from "react-icons/fa";
import { getOptionsApi } from "../../../../../../../redux/services/options";
import { getUserTemplateList } from "../../../../../../../redux/services/template";
import Modal from "../../../../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import { getUserSequenceList } from "../../../../../../../redux/services/sequence";
import { getSchedulesApi } from "../../../../../../../redux/services/schedule";
import {
  readCompaign,
  sendCompaignApi,
  updateCompaignRec,
} from "../../../../../../../redux/services/compaign";
import { getCompaignDetails } from "../../../../../../../redux/slices/compaign";
import { getEmailAccountsApi } from "../../../../../../../redux/services/email";
const Options = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const emailTypeWatcher = watch("email_type");
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.template);
  const { user_id, token } = useSelector((state) => state.auth);
  const { sequences } = useSelector((state) => state.sequence);
  const { schedules } = useSelector((state) => state.schedule);
  const { compaign } = useSelector((state) => state.compaign);
  const { emails } = useSelector((state) => state.email);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { id } = useParams();
  const formSubmit = (data) => {
    const params = {
      email_id: data?.email_id?.value,
      email: data?.email_id?.label,
      compaign_id: parseInt(id),
      schedule_id: data?.schedule_id?.value,
      user_id: user_id,
      tracking: data?.tracking === true ? 1 : 0,
      daily_limit: data?.daily_limit,
      html: data?.html === true ? 1 : 0,
      email_type: data?.email_type?.value,
      template_id:
        data?.email_type?.value === "template"
          ? selectedTemplate?.id
          : undefined,
      sequence_id:
        data?.email_type?.value === "sequence"
          ? selectedSequence?.id
          : undefined,
    };
    console.log("🚀 ~ formSubmit ~ data:", params);
    dispatch(sendCompaignApi(token, params, params?.compaign_id));
    // dispatch(addOptionsApi(token, params));
  };
  useEffect(() => {
    dispatch(readCompaign(token, id));
    dispatch(getUserTemplateList(token, user_id));
    dispatch(getUserSequenceList(token, user_id));
    dispatch(getSchedulesApi(token, `user_id=${user_id}`));
    dispatch(getEmailAccountsApi(token, `user_id=${user_id}`));
  }, [token, dispatch, id, user_id]);
  useEffect(() => {
    setValue("email_id", {
      label: compaign?.email,
      value: compaign?.email_id,
    });
    setValue("tracking", compaign?.tracking === 1 ? true : false);
    setValue("html", compaign?.template_id ? true : false);
    setValue("daily_limit", compaign?.daily_limit);
    setValue("email_type", {
      label: compaign?.template_id ? "Template" : "Sequence",
      value: compaign?.template_id ? "template" : "sequence",
    });
    Array?.isArray(sequences?.sequencesData) &&
      sequences?.sequencesData?.map((template) => {
        if (template?.id === compaign?.sequence_id) {
          setSelectedSequence(template);
        }
      });
    Array?.isArray(templates?.templatesData) &&
      sequences?.sequencesData?.map((template) => {
        if (template?.id === compaign?.template_id) {
          setSelectedTemplate(template);
        }
      });
    Array?.isArray(schedules?.schedules) &&
      schedules?.schedules?.map((item) => {
        console.log(
          "🚀 ~ schedules?.schedules?.map ~ item:",
          item.id,
          compaign
        );
        if (item?.id === compaign?.schedule_id) {
          setValue("schedule_id", {
            label: item?.name,
            value: item?.value,
          });
        }
      });
  }, [setValue, compaign, sequences, templates, schedules]);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSave = () => {};
  const handleSelected = (content) => {
    setIsOpen(true);
    setSelectedContent(content);
  };
  return (
    <div className="flex justify-center  gap-5">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="col-span-2 flex flex-col gap-5 lg:w-[65%]"
      >
        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between">
            <div>
              <Heading text={"Email Account"} className="font-extrabold" />
              <p>Select your account to send emails from</p>
            </div>
            <ReactSelectField
              name="email_id"
              placeholder="Select"
              control={control}
              errors={errors}
              options={
                Array.isArray(emails?.accountsData) &&
                emails?.accountsData?.map((email) => {
                  return {
                    label: email?.email,
                    value: email?.id,
                  };
                })
              }
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
        </div>
        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between">
            <div>
              <Heading text={"Open Tracking"} className="font-extrabold" />
              <p>Track email opens</p>
            </div>
            <div className="flex justify-end">
              <Switcher name="tracking" control={control} errors={errors} />
            </div>{" "}
          </div>
        </div>
        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between">
            <div>
              <Heading text={"Email Type"} className="font-extrabold" />
              <p>Disables open tracking for sequence template</p>
            </div>
            <div>
              <ReactSelectField
                name="email_type"
                placeholder="Select"
                control={control}
                errors={errors}
                options={[
                  {
                    label: "Sequence",
                    value: "sequence",
                  },
                  {
                    label: "Template",
                    value: "template",
                  },
                ]}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
          </div>
        </div>
        {emailTypeWatcher?.value === "template" && (
          <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
            <div className="justify-between">
              <div>
                <Heading text={"Email Templates"} className="font-extrabold" />
              </div>
              <div>
                <div className="p-1 grid grid-cols-2 gap-5  items-center justify-center">
                  {Array?.isArray(templates?.templatesData) &&
                    templates?.templatesData?.map((template) => (
                      <>
                        <div
                          className={`${
                            template?.id === selectedTemplate?.id &&
                            "border border-indigo-500"
                          } w-full p-5 shadow-lg bg-white border border-gray-200 flex justify-between`}
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <span>
                            {template?.title ? template?.title : "No Title"}
                          </span>
                          <span>
                            <FaRegEye
                              onClick={() => handleSelected(template?.content)}
                            />
                          </span>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {emailTypeWatcher?.value === "sequence" && (
          <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
            <div className="justify-between">
              <div>
                <Heading text={"Email Sequences"} className="font-extrabold" />
              </div>
              <div>
                <div className="p-1 grid grid-cols-2 gap-5  items-center justify-center">
                  {Array?.isArray(sequences?.sequencesData) &&
                    sequences?.sequencesData?.map((template) => (
                      <>
                        <div
                          className={`${
                            template?.id === selectedSequence?.id &&
                            "border border-indigo-500"
                          } w-full p-5 shadow-lg bg-white border border-gray-200 flex justify-between`}
                          onClick={() => setSelectedSequence(template)}
                        >
                          <span>
                            {template?.subject
                              ? template?.subject
                              : "No Subject"}
                          </span>
                          <span>
                            <FaRegEye
                              onClick={() => handleSelected(template?.content)}
                            />
                          </span>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between">
            <div>
              <Heading text={"Schedule"} className="font-extrabold" />
              <p>Select Your Schedule</p>
            </div>
            <div>
              <ReactSelectField
                name="schedule_id"
                placeholder="Select"
                control={control}
                errors={errors}
                options={
                  Array?.isArray(schedules?.schedules) &&
                  schedules?.schedules?.map((item, id) => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })
                }
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="p-8 rounded-md shadow-md border bg-white border-gray-100">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-between">
            <div>
              <Heading text={"Sequences"} className="font-extrabold" />
              <p>Max number of emails to send per day for this campaign</p>
            </div>
            <div className="flex justify-end">
              <InputField
                type="number"
                name="daily_limit"
                control={control}
                errors={errors}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>{" "}
          </div>
        </div>
        <div>
          {compaign?.status === null ||
          compaign?.status === undefined ||
          compaign?.status === "" ||
          compaign?.status === "pending" ? (
            <Button type="submit" className="py-3 px-2 bg-red-400">
              Lounch
            </Button>
          ) : (
            "Compaing is triggerred and under process."
          )}
        </div>
      </form>
      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Preview "
          body=<ModalBody htmlContent={selectedContent} />
          onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          size="md"
        />
      </div>
    </div>
  );
};

export default Options;
