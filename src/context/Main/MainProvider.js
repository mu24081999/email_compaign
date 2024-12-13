import { useState, useMemo, useEffect, useRef } from "react";
import MainContext from "./MainContext";
import _ from "lodash";
import Layout from "../../layout/Layout";
import EmailEditorComponent from "../../pages/EmailTemplate/components/EmailEditor";
const MainProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setIsCollapsed_ = (value) => {
    setIsCollapsed(value);
  };
  const EmailEditor = () => {
    return (
      <div>
        <Layout component={<EmailEditorComponent />} />
      </div>
    );
  };
  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed_,
      EmailEditor,
    }),
    [setIsCollapsed_, isCollapsed, EmailEditor]
  );
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
