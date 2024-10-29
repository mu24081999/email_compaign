import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  // Define button styles based on variant and size
  const baseStyles =
    "font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Styles for different variants
  const variantStyles = {
    primary:
      "sm:w-full md:w-fit rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "sm:w-full md:w-fit rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger:
      "sm:w-full md:w-fit rounded-lg bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success:
      "sm:w-full md:w-fit rounded-lg bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  // Styles for different sizes
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-1",
    lg: "px-6 py-1 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
