import React from "react";

const Heading = ({
  text,
  level = 1,
  color = "black",
  align = "left",
  className = "",
}) => {
  const Tag = `h${level}`; // Dynamically set the heading level (h1, h2, h3, etc.)

  return (
    <Tag
      className={`text-${align} ${className} text-[${color}] dark:text-gray-100 font-space text-black `} // Optional additional Tailwind classes
      // style={{ color }}
    >
      {text}
    </Tag>
  );
};

export default Heading;
