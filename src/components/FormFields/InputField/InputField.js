import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";
const InputField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const {
    title,
    style,
    description,
    isHighLight = false,
    type,
    errors,
    label,
    defaultValue,
    customStyle,
    onChange,
    ellipses,
    rules,
    control, // Added 'control' prop
    min, // Added 'min' prop
    isDisabled, // Added 'isDisabled' prop
    placeholder, // Added 'placeholder' prop
    svg,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  return (
    <div className="w-full">
      <div
        className={`w-full   ${
          style ? "bg-transparent" : ""
        } bg-transparent focus-within:bg-transparent rounded-lg ${
          props?.rules && err
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          defaultValue={defaultValue ? defaultValue : ""}
          render={({ field }) => (
            <>
              {label && <h1 className="font-extrabold pb-2">{label}</h1>}

              <label className="relative block border rounded-xl border-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center text-indigo-600 mx-2 pl-2">
                  {svg}
                </span>
                <input
                  {...props}
                  {...field}
                  ref={ref}
                  type={props?.type ? props?.type : ""}
                  onBlurCapture={() => setFocusState(false)}
                  onFocus={() => setFocusState(true)}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e, props?.name);
                    }
                  }}
                  min={type === "number" && !props.min ? 0 : props.min}
                  disabled={props.isDisabled}
                  placeholder={props.placeholder ? props.placeholder : ""}
                  value={field.value}
                  className={`py-3 w-full bg-white rounded-xl shadow-sm px-10 block flex-1 border-0 bg-transparent  text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-2  focus:ring-inset focus:rounded-xl focus:ring-indigo-600 focus:right-2 sm:text-sm sm:leading-6  ${
                    props.isDisabled && "bg-gray-400 cursor-not-allowed"
                  }  ${isHighLight && " bg-highLight  "}  `}
                  style={{ fontSize: "14.5px" }}
                  {...others}
                />
              </label>
              {description && <p className="pb-5 pt-1 ps-1">{description}</p>}
            </>
          )}
        />
      </div>
      {props.rules && err && (
        <p
          className="text-red-600 p-1 h-3 bg-inherit"
          style={{ fontSize: "14.5px" }}
          id="email-error"
        >
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
    </div>
  );
});
InputField.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  isHighLight: PropTypes.bool,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  customStyle: PropTypes.object,
  onChange: PropTypes.func,
  ellipses: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  min: PropTypes.number, // Added 'min' prop type validation
  isDisabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default InputField;
