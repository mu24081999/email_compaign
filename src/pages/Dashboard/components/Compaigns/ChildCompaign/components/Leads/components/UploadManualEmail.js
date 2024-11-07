import React from "react";
import { useForm } from "react-hook-form";
import TextAreaField from "../../../../../../../../components/FormFields/TextAreaField/TextAreaField";
import Button from "../../../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLeadRec } from "../../../../../../../../redux/services/leads";
const UploadManualEmail = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user_id, token } = useSelector((state) => state.auth);
  function formatEmails(text) {
    const fomatted = text?.split("\n");
    return fomatted;
  }
  const formSubmit = (fomrData) => {
    console.log(
      "🚀 ~ UploadManualEmail ~ fomrData:",
      formatEmails(fomrData?.emails)
    );
    const data = [];
    const emails = formatEmails(fomrData?.emails);
    emails?.map((item) => {
      return data.push({
        user_id: user_id,
        compaign_id: parseInt(id),
        email: item,
      });
    });
    dispatch(addLeadRec(token, { leads: data }));
  };
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(formSubmit)}>
        <TextAreaField
          name="emails"
          control={control}
          errors={errors}
          rows={5}
          placeholder="Enter/Paste Emails"
        />
        <Button type="submit" className=" py-2 mu-5 mt-5">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UploadManualEmail;
