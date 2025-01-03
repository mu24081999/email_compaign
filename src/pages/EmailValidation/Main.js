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
    const query = `page=1`;
    dispatch(getUserValidatedEmails(token, user_id, query));
  }, [token, user_id, dispatch]);
  return (
    <Layout
      component={
        <div className="">
          <Add />
          <List user_id={user_id} token={token} dispatch={dispatch} />
        </div>
      }
    />
  );
};

export default EmailValidation;
