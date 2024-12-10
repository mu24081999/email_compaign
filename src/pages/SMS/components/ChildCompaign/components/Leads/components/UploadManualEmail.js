import React from "react";
import { useForm } from "react-hook-form";
import TextAreaField from "../../../../../../../components/FormFields/TextAreaField/TextAreaField";
import Button from "../../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLeadRec } from "../../../../../../../redux/services/smsLeads";
const UploadManualEmail = ({ close }) => {
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
    const data = [];
    const numbers = formatEmails(fomrData?.numbers);
    numbers?.map((item) => {
      return data.push({
        user_id: user_id,
        campaign_id: parseInt(id),
        phone: item,
      });
    });
    dispatch(addLeadRec(token, { leads: data }));
    close(true);
  };
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(formSubmit)}>
        <TextAreaField
          name="numbers"
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
