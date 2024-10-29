import React, { useEffect, useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { useForm } from "react-hook-form";
import Heading from "./Heading";
import InputField from "./FormFields/InputField/InputField";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import "./templateEditor.css";
import {
  addTemplateRec,
  getUserTemplateList,
} from "../redux/services/template";
const EmailEditorComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user_id, token } = useSelector((state) => state.auth);
  const { templates } = useSelector((state) => state.template);
  const emailEditorRef = useRef();
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState(null);
  // Placeholder Data for testing (you can use dynamic user data instead)
  const sampleUserData = {
    firstname: "John",
    email: "john.doe@example.com",
  };

  // Function to replace placeholders in exported HTML
  const replacePlaceholdersInHtml = (html, data) => {
    return html.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
  };

  // Export HTML from the email editor and store it
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    const data = unlayer?.exportHtml((data) => {
      const { html } = data;
      setEditorHtml((prevValue) => {
        return html;
      }); // Save the exported HTML
    });
    console.log(editorHtml);
  };

  // Handle adding a new template (can be extended)
  const addTemplate = async (formData) => {
    const unlayer = emailEditorRef.current?.editor;
    const data = unlayer?.exportHtml(async (data) => {
      const { html } = data;
      const params = {
        title: formData?.title,
        user_id: user_id,
        content: html,
      };
      console.log(params);
      const isAdded = await dispatch(addTemplateRec(token, params));
    });
  };

  // // Template list with placeholders in content
  // const templates = [
  //   {
  //     id: 1,
  //     title: "Welcome Email",
  //     content: "<h1>Hello {{firstname}}</h1><p>Welcome on board!</p>",
  //   },
  //   {
  //     id: 2,
  //     title: "Product Update",
  //     content: "<h1>Hi {{firstname}}</h1><p>Check out our new features!</p>",
  //   },
  // ];
  useEffect(() => {
    dispatch(getUserTemplateList(token, user_id));
  }, [token, user_id, dispatch]);
  return (
    <div className="h-full bg-gray-50">
      {/* Email Editor Section */}
      <div className="">
        {/* <Heading
          text="Add New Template"
          level={1}
          align="center"
          className="font-sans font-extrabold text-3xl mb-10"
        /> */}

        {/* Form for Adding a New Template */}
        <form onSubmit={handleSubmit(addTemplate)} className="mt-8 space-y-6 ">
          <InputField
            name="title"
            label="Title"
            control={control}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "Title is required!",
              },
            }}
          />
          <div className=" overflow-hidden shadow-lg border">
            <div className="h-[64vh]">
              <EmailEditor
                ref={emailEditorRef}
                style={{
                  maxWidth: "100%",
                  overflow: "scroll",
                  display: "flex",
                  height: "70vh",
                }}
              />
            </div>
          </div>
          <Button type="submit" className="py-3">
            Add Template
          </Button>
        </form>

        {/* Exported HTML Preview Section */}
        {editorHtml && (
          <div className="mt-10">
            <Heading
              text="Preview Exported HTML"
              level={2}
              align="center"
              className="font-sans font-semibold text-2xl mb-5"
            />
            <iframe
              srcDoc={replacePlaceholdersInHtml(editorHtml, sampleUserData)}
              className="w-full h-60 border"
              title="Exported HTML Preview"
            ></iframe>
          </div>
        )}
      </div>
      {/* Template List Section */}
      <div className="py-5">
        {/* <Heading
          text="Template List"
          level={1}
          align="center"
          className="font-sans font-extrabold text-3xl mb-10"
        /> */}
        <div className="p-1 flex flex-wrap items-center justify-center">
          {Array?.isArray(templates?.templatesData) &&
            templates?.templatesData?.map((template) => (
              <>
                <div className="flex-shrink-0 m-6 relative overflow-hidden bg-blue-500 rounded-lg max-w-xs shadow-lg group">
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
                        transform:
                          "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                        opacity: "0.2",
                      }}
                    ></div>
                    <iframe
                      srcDoc={replacePlaceholdersInHtml(
                        template.content,
                        sampleUserData
                      )}
                      className="relative w-full"
                      title={template.title}
                    ></iframe>{" "}
                  </div>
                  <div className="relative text-white px-6 pb-6 mt-6">
                    <div className="flex justify-between">
                      <span className="block font-semibold text-xl">
                        {template?.title}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div
                  key={template.id}
                  className=" bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden p-5"
                  dangerouslySetInnerHTML={{ __html: template?.content }}
                />
                {/* <iframe
                  srcDoc={replacePlaceholdersInHtml(
                    template.content,
                    sampleUserData
                  )}
                  className="w-full h-60"
                  frameBorder="0"
                  title={template.title}
                ></iframe> *
                <div className="p-4">
                  <h5 className="text-xl font-semibold text-gray-900">
                    {template.title}
                  </h5>
                </div> */}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmailEditorComponent;
