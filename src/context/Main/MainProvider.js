import { useState, useMemo, useEffect, useRef } from "react";
import MainContext from "./MainContext";
import _ from "lodash";
const MainProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setIsCollapsed_ = (value) => {
    setIsCollapsed(value);
  };
  const emailEditorRef = useRef();
  const [editorHtml, setEditorHtml] = useState(null);
  const [loading, setLoading] = useState(true);

  const editorStyle = useMemo(
    () => ({
      maxWidth: "100%",
      overflow: "scroll",
      display: "flex",
      height: "75vh",
    }),
    []
  );

  // Export HTML from the email editor and store it
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    const data = unlayer?.exportHtml((data) => {
      const { html } = data;
      setEditorHtml(html); // Save the exported HTML
    });
  };
  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed_,
      emailEditorRef,
      editorHtml,
      setEditorHtml,
      exportHtml,
      loading,
      setLoading,
      editorStyle,
    }),
    [
      setIsCollapsed_,
      isCollapsed,
      emailEditorRef,
      editorHtml,
      setEditorHtml,
      exportHtml,
      loading,
      setLoading,
      editorStyle,
    ]
  );
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
