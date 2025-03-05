import React from "react";
import List from "./components/List";
import Claimed from "./components/Claimed";
import Tabs from "../../components/Tabs";
import ReleasedNumber from "./components/ReleasedNumber";
const Content = ({
  availableNumbers,
  claimedNumbers,
  releasedNumbers,
  isLoading,
  Loader,
  dispatch,
  token,
  user,
}) => {
  const tabsData = [
    {
      id: "available_numbers",
      label: "Available Numbers",
      content: (
        <List
          availableNumbers={availableNumbers}
          isLoading={isLoading}
          Loader={Loader}
          dispatch={dispatch}
          token={token}
          user={user}
        />
      ),
    },
    {
      id: "availed_numbers",
      label: "Claimed Numbers",
      content: (
        <Claimed
          claimedNumbers={claimedNumbers}
          isLoading={isLoading}
          Loader={Loader}
          dispatch={dispatch}
          token={token}
          user={user}
        />
      ),
    },
    {
      id: "released_number",
      label: "Released Numbers",
      content: (
        <ReleasedNumber
          releasedNumbers={releasedNumbers}
          isLoading={isLoading}
          Loader={Loader}
          dispatch={dispatch}
          token={token}
          user={user}
        />
      ),
    },
  ];
  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default Content;
