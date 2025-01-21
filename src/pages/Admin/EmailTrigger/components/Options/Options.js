import React, { useEffect, useState } from "react";
import ReactSelectField from "../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import { useForm } from "react-hook-form";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { getUserTemplateList } from "../../../../../redux/services/template";
import Modal from "../../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import { getUserSequenceList } from "../../../../../redux/services/sequence";
import {
  getEmailAccountsApi,
  sendEmails,
} from "../../../../../redux/services/email";
import { toast } from "react-toastify";
import useMain from "../../../../../context/Main/useMain";
import { TagsInput } from "react-tag-input-component";

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
  const { isCollapsed } = useMain();
  const emailTypeWatcher = watch("email_type");
  const [selected, setSelected] = useState(["sample@example.com"]);
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.template);
  const { user_id, token } = useSelector((state) => state.auth);
  const { sequences } = useSelector((state) => state.sequence);
  const { emails } = useSelector((state) => state.email);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { id } = useParams();
  const formSubmit = (data) => {
    const params = {
      email_id: data?.email_id?.value,
      content: selectedTemplate?.content,
      emails: selected,
      subject: selectedTemplate?.title || selectedTemplate?.subject,
    };
    console.log("🚀 ~ formSubmit ~ params:", params);
    if (!selectedTemplate?.id) {
      return toast.error("Please select a template/sequence to lounch.");
    }

    dispatch(sendEmails(token, params));
    // setActiveTabId_("analytics");
    // dispatch(addOptionsApi(token, params));
  };
  useEffect(() => {
    dispatch(getUserTemplateList(token, user_id));
    dispatch(getUserSequenceList(token, user_id));
    dispatch(getEmailAccountsApi(token, `user_id=${user_id}`));
  }, [token, dispatch, id, user_id]);

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
        <div className="p-8 rounded-md shadow-md border bg-white dark:bg-gray-800 border-gray-100">
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
        <div className="p-8 rounded-md shadow-md border bg-white dark:bg-gray-800 border-gray-100">
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
          <div className="p-8 rounded-md shadow-md border bg-white dark:bg-gray-800 border-gray-100">
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
          <div className="p-8 rounded-md shadow-md border bg-white dark:bg-gray-800 border-gray-100">
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
                            template?.id === selectedTemplate?.id &&
                            "border border-indigo-500"
                          } w-full p-5 shadow-lg bg-white border border-gray-200 flex justify-between`}
                          onClick={() => setSelectedTemplate(template)}
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
        <div>
          <h1>Add Emails</h1>
          <pre>{JSON.stringify(selected)}</pre>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="Emails"
            placeHolder="Enter email address and press enter"
          />
          <em>press enter or comma to add new tag</em>
        </div>
        <Button type="submit" className="py-3 px-3">
          Lounch
        </Button>
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
          noStartMargin={isCollapsed}
        />
      </div>
    </div>
  );
};

export default Options;
