// import React, { useState } from "react";
// import { useController, Controller } from "react-hook-form";
// import _ from "lodash";
// import PropTypes from "prop-types";
// const InputField = React.forwardRef((props, ref) => {
//   const { field, fieldState } = useController(props);
//   const [focusState, setFocusState] = useState(false);
//   const {
//     title,
//     style,
//     description,
//     isHighLight = false,
//     type,
//     errors,
//     label,
//     defaultValue,
//     customStyle,
//     onChange,
//     ellipses,
//     rules,
//     control, // Added 'control' prop
//     min, // Added 'min' prop
//     isDisabled, // Added 'isDisabled' prop
//     placeholder, // Added 'placeholder' prop
//     svg,
//     ...others
//   } = props;
//   let err = _.get(errors, props.name);
//   return (
//     <div className="w-full">
//       <div
//         className={`w-full   ${
//           props?.rules && err
//             ? "focus-within:border-red border-red"
//             : "focus-within:border-primary"
//         }`}
//       >
//         <Controller
//           name={props?.name}
//           control={props?.control}
//           rules={props?.rules}
//           defaultValue={defaultValue ? defaultValue : ""}
//           render={({ field }) => (
//             <>
//               <div className="relative">
//                 {svg && (
//                   <span class="absolute inset-y-0 right-0  px-3 my-1 rounded flex items-center bg-gray-800 mx-1  text-white">
//                     {svg}
//                   </span>
//                 )}
//                 <input
//                   {...props}
//                   {...field}
//                   ref={ref}
//                   type={props?.type ? props?.type : ""}
//                   onBlurCapture={() => setFocusState(false)}
//                   onFocus={() => setFocusState(true)}
//                   onChange={(e) => {
//                     field.onChange(e.target.value);
//                     if (props.onChange) {
//                       props.onChange(e, props?.name);
//                     }
//                   }}
//                   min={type === "number" && !props.min ? 0 : props.min}
//                   disabled={props.isDisabled}
//                   // placeholder={props.placeholder ? props.placeholder : ""}
//                   value={field.value}
//                   className={`ps-3 py-3 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow g-6 dark:text-white  ${
//                     props.isDisabled && "bg-gray-400 cursor-not-allowed"
//                   }  ${isHighLight && " bg-highLight  "}  `}
//                   style={{ fontSize: "14.5px" }}
//                   {...others}
//                 />
//                 {label && (
//                   <label class="absolute  peer-focus:block bg-white dark:bg-gray-800 cursor-text px-1 left-2.5 top-3.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
//                     {label}
//                   </label>
//                 )}
//               </div>
//               {description && <p className="pb-5 pt-1 ps-1">{description}</p>}
//             </>
//           )}
//         />
//       </div>
//       {props.rules && err && (
//         <p
//           className="text-red-600 p-1 h-3 bg-inherit"
//           style={{ fontSize: "14.5px" }}
//           id="email-error"
//         >
//           {props.rules && err && props.rules && err?.message}
//         </p>
//       )}
//     </div>
//   );
// });
// InputField.propTypes = {
//   title: PropTypes.string,
//   style: PropTypes.object,
//   isHighLight: PropTypes.bool,
//   type: PropTypes.string,
//   errors: PropTypes.object,
//   defaultValue: PropTypes.any,
//   customStyle: PropTypes.object,
//   onChange: PropTypes.func,
//   ellipses: PropTypes.bool,
//   name: PropTypes.string.isRequired,
//   rules: PropTypes.object.isRequired,
//   control: PropTypes.object.isRequired, // Added 'control' prop type validation
//   min: PropTypes.number, // Added 'min' prop type validation
//   isDisabled: PropTypes.bool, // Added 'isDisabled' prop type validation
//   placeholder: PropTypes.string, // Added 'placeholder' prop type validation
// };
// export default InputField;
import React, { useEffect, useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const InputField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const [inputType, setInputType] = useState(null);
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
    control,
    min,
    isDisabled,
    placeholder,
    svg,
    ...others
  } = props;

  let err = _.get(errors, props.name);
  useEffect(() => {
    setInputType(type);
    return () => {};
  }, [type]);
  const typeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType(type);
    }
  };
  return (
    <div className="w-full">
      <div
        className={`w-full ${
          props?.rules && err
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <>
              <div className="relative">
                {svg && (
                  <span
                    onClick={() => type === "password" && typeHandler()}
                    className={`absolute inset-y-0 right-0 px-3 my-1 rounded flex items-center bg-gray-800 mx-1 text-white cursor-pointer`}
                  >
                    {svg}
                  </span>
                )}
                <input
                  {...props}
                  {...field}
                  id={props.name} // Set an ID here
                  ref={ref}
                  type={inputType || ""}
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
                  value={field.value}
                  className={`ps-3 py-3 peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow g-6 dark:text-white ${
                    props.isDisabled && "bg-gray-400 cursor-not-allowed"
                  } ${isHighLight && " bg-highLight "}`}
                  style={{ fontSize: "14.5px" }}
                  {...others}
                />
                {label && (
                  <label
                    htmlFor={props.name} // Add htmlFor to associate label with input
                    className="absolute bg-white dark:bg-gray-800 cursor-text px-1 left-2.5 top-3.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90"
                  >
                    {label}
                  </label>
                )}
              </div>
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
          {props.rules && err?.message}
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
  control: PropTypes.object.isRequired,
  min: PropTypes.number,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputField;
