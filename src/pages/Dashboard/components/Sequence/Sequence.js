import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../../components/FormFields/ReactSelectField/ReactSelectField";
import InputField from "../../../../components/FormFields/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { getUserTemplateList } from "../../../../redux/services/template";
import { useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import {
  addSequenceRec,
  getUserSequenceList,
} from "../../../../redux/services/sequence";
import Heading from "../../../../components/Heading";
import { sendCompaign } from "../../../../redux/services/compaign";
import EmailEditor from "react-email-editor";
import { getEmailAccountsApi } from "../../../../redux/services/email";
import _ from "lodash";
import TextEditor from "../../../../components/FormFields/TextEditor/TextEditor";

const Sequence = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: `<!DOCTYPE HTML>
          <html>
            <body>
              <h1>Hello, World!</h1>
              <p>This is the initial content of the editor.</p>
            </body>
          </html>`,
    },
  });
  const emailEditorRef = useRef();
  // Default design (JSON)

  // const onLoad = () => {
  //   emailEditorRef.current.editor.loadDesign(defaultDesign);

  //   emailEditorRef.current.editor.loadBlank({
  //     backgroundColor: "#fff",
  //   });
  //   emailEditorRef.current.editor.addEventListener("design:loaded", () => {
  //     emailEditorRef.current.editor.setBodyValues({
  //       backgroundColor: "#f5f5f5",
  //       contentWidth: "100%",
  //     });
  //   });
  // };
  const htmlToJSON = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const parseNode = (node) => {
      const jsonNode = {
        tagName: node.tagName.toLowerCase(),
        attributes: {},
        children: [],
      };
      Array.from(node.attributes).forEach(({ name, value }) => {
        jsonNode.attributes[name] = value;
      });
      node.childNodes.forEach((childNode) => {
        if (childNode.nodeType === Node.ELEMENT_NODE) {
          jsonNode.children.push(parseNode(childNode));
        } else if (childNode.nodeType === Node.TEXT_NODE) {
          jsonNode.children.push(childNode.nodeValue.trim());
        }
      });
      return jsonNode;
    };
    return parseNode(doc.body);
  };

  // Function to set HTML value
  const setEditorValueWithHTML = (html) => {
    const design = htmlToJSON(html?.content);
    console.log("🚀 ~ setEditorValueWithHTML ~ design:", design);

    emailEditorRef.current.editor.loadDesign(design);
    // if (emailEditorRef.current && emailEditorRef.current.editor) {
    // } else {
    //   console.error("Editor instance not ready");
    // }
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user_id, token } = useSelector((state) => state.auth);
  const { templates } = useSelector((state) => state.template);
  const { sequences } = useSelector((state) => state.sequence);
  const { emails } = useSelector((state) => state.email);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const sampleUserData = {
    firstname: "John",
    email: "john.doe@example.com",
  };
  // Function to replace placeholders in exported HTML
  const replacePlaceholdersInHtml = (html, data) => {
    return html.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
  };
  const addSequence = (formData) => {
    // const unlayer = emailEditorRef?.current?.editor;
    // const data = unlayer?.exportHtml(({ html }) => {
    //   const params = {
    //     user_id: user_id,
    //     subject: formData?.subject,
    //     template_id: currentTemplate?.id,
    //     compaign_id: id,
    //     content: replacePlaceholdersInHtml(html, sampleUserData),
    //   };
    //   console.log(params);
    //   // dispatch(addSequenceRec(token, params));
    // });
    const params = {
      user_id: user_id,
      subject: formData?.subject,
      template_id: currentTemplate?.id,
      compaign_id: id,
      content: replacePlaceholdersInHtml(formData?.content, sampleUserData),
    };
    console.log(params);
    dispatch(addSequenceRec(token, params));
  };

  useEffect(() => {
    dispatch(getUserTemplateList(token, user_id));
    dispatch(getUserSequenceList(token, user_id));
    dispatch(getEmailAccountsApi(token));
  }, [token, user_id, dispatch]);
  const handleSendCompaign = () => {
    const params = {
      compaign_id: id,
      sequence_id: selectedSequence?.id,
      email_type: "gmail",
      from_email: selectedEmail?.email,
      google_app_password: selectedEmail?.password,
      mail_provider: "",
    };
    dispatch(sendCompaign(token, params));
  };
  // Export HTML from the email editor and store it
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    const data = unlayer?.exportHtml((data) => {
      const { html, design } = data;

      console.log(design);
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(addSequence)}
        className="flex flex-col gap-5"
      >
        {/* <ReactSelectField
          name="template"
          control={control}
          label="Select Template"
          errors={errors}
          onChange={(e) => setEditorValueWithHTML(e)}
          options={
            Array.isArray(templates?.templatesData) &&
            templates?.templatesData?.map((temp, index) => {
              return {
                label: temp?.title,
                value: temp?.id,
                ...temp,
              };
            })
          }
        /> */}
        <InputField
          name="subject"
          control={control}
          label="Subject"
          errors={errors}
        />
        <TextEditor
          defaultValue={
            currentTemplate !== undefined
              ? currentTemplate?.content
              : "<p>Please Add Your Content</p>"
          }
          label="Sequence"
          name="content"
          control={control}
          errors={errors}
        />
        {/* <h1 className="font-extrabold">Add Your Template and Set Sequence</h1>
        <div className=" overflow-hidden shadow-lg border">
          <div className="h-[64vh]">
            <EmailEditor
              ref={emailEditorRef}
              // onLoad={onLoad}
              options={{ displayMode: "email" }}
              style={{
                maxWidth: "100%",
                overflow: "scroll",
                display: "flex",
                height: "70vh",
              }}
            />
          </div>
        </div> */}
        <Button type="submit" className="py-2">
          Submit
        </Button>
      </form>
      <div className="py-5">
        {/* <Heading
          text="Sequence List"
          level={1}
          align="center"
          className="font-sans font-extrabold text-3xl mb-10"
        /> */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 items-center min-h-screen flex-wrap">
          {Array?.isArray(sequences?.sequencesData) &&
            sequences?.sequencesData?.map((sequence, index) => (
              <>
                <div
                  className={` mx-auto rounded-xl ${
                    sequence?.id === selectedSequence?.id &&
                    "border-2 border-blue-600"
                  } `}
                >
                  {/* <!-- Centering wrapper --> */}
                  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
                      <iframe
                        srcDoc={sequence?.content}
                        className=" h-[300px] border border-gray-300 shadow-md"
                        title={sequence.title}
                      ></iframe>
                    </div>
                    <div className=" py-2">
                      <p className="block font-sans font-extrabold antialiased text-xl  leading-relaxed text-blue-gray-900 text-center">
                        {sequence?.subject ? sequence?.subject : "No Subject"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sequence;
