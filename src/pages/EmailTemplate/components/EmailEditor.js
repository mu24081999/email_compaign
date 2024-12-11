import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField/InputField";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import "./templateEditor.css";
import {
  addTemplateRec,
  deleteTemplateRec,
  getUserTemplateList,
} from "../../../redux/services/template";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import SwiperComponent from "../../../components/Swiper";
import Loader from "../../../components/Loader/Loader";
import Modal from "../../../components/Modal";
import ModalBody from "./ModalBody";
import useMain from "../../../context/Main/useMain";
const EmailEditorComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    emailEditorRef,
    exportHtml,
    isCollapsed,
    loading,
    setLoading,
    editorStyle,
  } = useMain(); // Using context here

  const { user_id, token, user } = useSelector((state) => state.auth);
  const { templates } = useSelector((state) => state.template);
  // const emailEditorRef = useRef();
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState({});
  const [showSlides, setShowSlides] = useState(true);
  // Placeholder Data for testing (you can use dynamic user data instead)
  const sampleUserData = {
    firstname: "John",
    email: "john.doe@example.com",
  };

  // Function to replace placeholders in exported HTML
  const replacePlaceholdersInHtml = (html, data) => {
    return html.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
  };
  const handleClose = () => {
    setIsOpen(false);
    setShowSlides(true);
  };
  const handleSave = () => {};
  const handleSelected = (template) => {
    setIsOpen(true);
    setShowSlides(false);
    setSelectedContent(template.content);
  };
  // Handle adding a new template (can be extended)
  const addTemplate = async (formData) => {
    const unlayer = emailEditorRef.current?.editor;
    const data = unlayer?.exportHtml(async (data) => {
      const { html } = data;
      const params = {
        title: formData?.title,
        user_id: user_id,
        // content: html,
        content: replacePlaceholdersInHtml(html, user),
      };
      console.log(params);
      const isAdded = await dispatch(addTemplateRec(token, params));
    });
  };

  useEffect(() => {
    dispatch(getUserTemplateList(token, user_id));
  }, [token, user_id, dispatch]);
  const slides =
    Array?.isArray(templates?.templatesData) &&
    templates?.templatesData?.map((template, index) => {
      return {
        id: index,
        content: (
          <>
            <div className="flex-shrink-0 m-6 relative overflow-hidden bg-black rounded-lg max-w-full shadow-lg group">
              <svg
                className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
                viewBox="0 0 375 283"
                fill="none"
                style={{ opacity: "0.1" }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative  flex items-center justify-center group-hover:scale-110 transition-transform">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
                <iframe
                  srcDoc={template.content}
                  className="relative w-full"
                  title={template.title}
                ></iframe>{" "}
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <div className="flex justify-between">
                  <span className="block font-semibold text-xl">
                    {template?.title}{" "}
                  </span>
                  <div className="flex flex-row-reverse gap-5 pt-3">
                    <span
                      className="cursor-pointer "
                      onClick={() => handleSelected(template)}
                    >
                      <FaEye />
                    </span>
                    <span
                      className="cursor-pointer "
                      onClick={() => deleteTemplate(template?.id)}
                    >
                      <FaTrashAlt />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
      };
    });
  const deleteTemplate = (tempId) => {
    dispatch(deleteTemplateRec(token, tempId, user_id));
  };

  return (
    <div className="">
      {/* Email Editor Section */}
      <div className="">
        {/* Form for Adding a New Template */}
        <form
          onSubmit={handleSubmit(addTemplate)}
          className=" space-y-6 bg-white border p-5 rounded-xl shadow-md"
        >
          {loading && <Loader />}
          <div
            className={`${
              loading ? "hidden" : ""
            } relative overflow-hidden shadow-lg border rounded`}
          >
            <EmailEditor
              ref={emailEditorRef}
              onReady={() => setLoading(false)}
              style={{
                maxWidth: "100%",
                overflow: "scroll",
                display: "flex",
                height: "75vh",
              }}
            />
            <div className="h-16 w-[45.5vh] p-1 bg-white absolute bottom-0 right-0"></div>
          </div>
          <p>
            Add firstname,lastname and email in the format {"{{firstname}}"} to
            include in the sequence
          </p>{" "}
          <div className="flex">
            <InputField
              name="title"
              label="Title"
              svg={<FaPlus />}
              control={control}
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: "Title is required!",
                },
              }}
            />
            <Button type="submit" className="py-3 min-w-[200px]">
              Add Template
            </Button>
          </div>
        </form>
      </div>
      {/* Template List Section */}
      {showSlides && (
        <div className="py-5">
          <SwiperComponent slides={slides} length={2} />
        </div>
      )}

      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Template Preview "
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

export default EmailEditorComponent;
