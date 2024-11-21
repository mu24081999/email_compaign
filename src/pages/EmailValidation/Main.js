import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import Add from "./components/Add";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { getUserValidatedEmails } from "../../redux/services/validation";

const EmailValidation = () => {
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserValidatedEmails(token, user_id));
  }, [token, user_id, dispatch]);
  return (
    <Layout
      component={
        <div className="">
          <Add />
          <List />
        </div>
      }
    />
  );
};

export default EmailValidation;
