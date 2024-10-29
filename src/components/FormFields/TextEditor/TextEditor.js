import React, { useEffect, useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./editor.css";
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
  const [htmlContent, setHtmlContent] = useState(null);
  const [focusState, setFocusState] = useState(false);
  const { field, fieldState } = useController(props);

  let error = _.get(errors, props.name);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    field.onChange(data);
    setHtmlContent(data);
  };
  useEffect(() => {
    if (defaultValue) {
      setHtmlContent(defaultValue);
    } else if (field?.value) {
      setHtmlContent(field.value);
    }
  }, [defaultValue, field.value]);
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
            <CKEditor
              editor={ClassicEditor}
              data={htmlContent}
              onBlurCapture={() => setFocusState(false)}
              onFocus={() => setFocusState(true)}
              onChange={handleEditorChange}
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
