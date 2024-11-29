import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableNumbersApi,
  getClaimedNumbersApi,
} from "../../redux/services/twilio";
import Layout from "../../layout/Layout";
import Content from "./Content";
import Loader from "../../components/Loader/Loader";
const Numbers = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { availableNumbers, claimedNumbers, isLoading } = useSelector(
    (state) => state.twilio
  );
  useEffect(() => {
    const params = {
      accountSid: user.accountSid,
      authToken: user.authToken,
      countryCode: "US",
      areaCode: "415",
      capabilities: {
        voice: true,
        sms: true,
        mms: false,
      },
      limit: 50,
    };
    dispatch(getAvailableNumbersApi(token, params));
    dispatch(
      getClaimedNumbersApi(token, {
        accountSid: user.accountSid,
        authToken: user.authToken,
      })
    );
  }, [token, dispatch, user]);

  return (
    <Layout
      component={
        <Content
          availableNumbers={availableNumbers}
          claimedNumbers={claimedNumbers}
          isLoading={isLoading}
          Loader={Loader}
          dispatch={dispatch}
          token={token}
          user={user}
        />
      }
    />
  );
};

export default Numbers;
