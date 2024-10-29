import React, { useEffect, useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const TextEditor = React.forwardRef((props, ref) => {
  const {
    rules,
    name,
    control,
    title,
    isHighLight = false,
    style,
    type,
    errors,
    defaultValue,
    disabled = false,
    label,
    ...others
  } = props;
  const [editorValue, setEditorValue] = useState(defaultValue);
  const [focusState, setFocusState] = useState(false);
  const { field, fieldState } = useController(props);

  let error = _.get(errors, props.name);
  useEffect(() => {
    setEditorValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div>
            {label && <h1 className="font-extrabold pb-2">{label}</h1>}
            <ReactQuill
              theme="snow"
              modules={{
                toolbar: [
                  [{ font: [] }, { size: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ script: "sub" }, { script: "super" }],
                  [
                    { header: "1" },
                    { header: "2" },
                    "blockquote",
                    "code-block",
                  ],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ direction: "rtl" }, { align: [] }],
                  ["link", "image", "video", "formula"],
                  ["clean"],
                ],
                syntax: true, // Enable syntax highlighting
              }}
              //   value={field?.value}
              value={editorValue} // Controlled value
              onBlurCapture={() => setFocusState(false)}
              onFocus={() => setFocusState(true)}
              onChange={(e) => {
                setEditorValue(e); // Update local state

                field.onChange(e);
                if (props?.onChange) {
                  props.onChange(e);
                }
              }}
              className={`h-[300px]`}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        )}
      />
    </>
  );
});
TextEditor.displayName = "TextEditor";
export default TextEditor;
