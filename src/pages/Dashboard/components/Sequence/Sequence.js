import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineSubject } from "react-icons/md";
import InputField from "../../../../components/FormFields/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { getUserTemplateList } from "../../../../redux/services/template";
import { useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import {
  addSequenceRec,
  deleteSequenceRec,
  getUserSequenceList,
} from "../../../../redux/services/sequence";
import { sendCompaign } from "../../../../redux/services/compaign";
import { getEmailAccountsApi } from "../../../../redux/services/email";
import TextEditor from "../../../../components/FormFields/TextEditor/TextEditor";
import Layout from "../../../../layout/Layout";
import SwiperComponent from "../../../../components/Swiper";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import useMain from "../../../../context/Main/useMain";
import Tabs from "../../../../components/Tabs";
const Sequence = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      color: #0073e6;
    }
    .button {
      display: inline-block;
      background-color: #0073e6;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="header">Welcome to SenderSide.com!</h1>
    <p>Hi [First Name],</p>
    <p>We're thrilled to have you on board. SenderSide.com is your trusted partner for reliable email notifications and communication services.</p>
    <a href="[Insert Link]" class="button">Get Started Now</a>
    <p>If you have any questions, feel free to reply to this email or contact us at <a href="mailto:support@senderside.com">support@senderside.com</a>.</p>
    <div class="footer">
      Best regards,<br>
      [Your Name] <br>
      [Your Job Title] <br>
      SenderSide.com
    </div>
  </div>
</body>
</html>
`,
    },
  });
  const { isCollapsed } = useMain();
  const emailEditorRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});

  const [showSlides, setShowSlides] = useState(true);
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
  const handleClose = () => {
    setIsOpen(false);
    setShowSlides(true);
  };
  const handleSelected = (template) => {
    setIsOpen(true);
    setShowSlides(false);
    setSelectedContent(template.content);
  };
  const handleSave = () => {};
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user_id, token, user } = useSelector((state) => state.auth);
  const { templates } = useSelector((state) => state.template);
  const { sequences } = useSelector((state) => state.sequence);
  const { emails } = useSelector((state) => state.email);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  // Function to replace placeholders in exported HTML
  const replacePlaceholdersInHtml = (html, data) => {
    return html.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
  };
  const addSequence = (formData) => {
    const content = formData?.content + "</body>";
    const params = {
      user_id: user_id,
      subject: formData?.subject,
      // template_id: currentTemplate?.id,
      // compaign_id: id,
      // content: replacePlaceholdersInHtml(content, user),
      content: content,
    };
    // console.log("params: ", params);
    dispatch(addSequenceRec(token, params));
    setActiveTabId("sequence_list");
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
  const slides =
    Array?.isArray(sequences?.sequencesData) &&
    sequences?.sequencesData?.map((sequence, index) => {
      return {
        id: index,
        content: (
          <>
            <div
              className={` mx-auto rounded-xl ${
                sequence?.id === selectedSequence?.id &&
                "border-2 border-blue-600"
              } `}
            >
              {/* <!-- Centering wrapper --> */}
              <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
                <div className=" flex justify-center relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
                  <iframe
                    srcDoc={sequence?.content}
                    className=" h-[300px] border border-gray-300 shadow-md"
                    title={sequence.title}
                  ></iframe>
                </div>
                <div className="bg-black text-white py-2 flex justify-between px-5">
                  <p className="block font-sans font-extrabold antialiased text-xl  leading-relaxed text-blue-gray-900 text-center">
                    {sequence?.subject ? sequence?.subject : "No Subject"}
                  </p>
                  <div className="flex gap-5 flex-row-reverse pt-2">
                    <span
                      className="cursor-pointer"
                      onClick={() => handleSelected(sequence)}
                    >
                      <FaEye />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => deleteSequence(sequence.id)}
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
  const deleteSequence = (seqId) => {
    dispatch(deleteSequenceRec(token, seqId, user_id));
  };
  const tabsData = [
    {
      id: "add_sequence",
      label: "Add Sequence",
      content: (
        <form
          onSubmit={handleSubmit(addSequence)}
          className="flex flex-col gap-5"
        >
          <InputField
            name="subject"
            control={control}
            label="Subject"
            errors={errors}
            svg={<MdOutlineSubject />}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
          />
          <div>
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
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
            <p>
              Add firstname, lastname, email, phone, company, position, country,
              state, city, address and postalCode in the format{" "}
              {"{{firstname}}"} to include in the sequence
            </p>
          </div>
          <Button type="submit" className="py-2">
            Submit
          </Button>
        </form>
      ),
    },
    {
      id: "sequence_list",
      label: "Sequence List",
      content: (
        <>
          {showSlides && (
            <div className="py-5">
              <SwiperComponent length={3} slides={slides} />
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
        </>
      ),
    },
  ];
  return (
    <Layout
      component={
        <>
          <Tabs tabsData={tabsData} activeTabId={activeTabId} />
        </>
      }
    />
  );
};

export default Sequence;
