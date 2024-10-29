// CustomAnimatedCard.jsx
import React from "react";

const Card = ({
  title,
  body,
  imgSrc,
  className,
  width = "w-80", // Default width (Tailwind class)
  height = "h-96", // Default height (Tailwind class)
  textColor = "text-black", // Default text color
  // overlayColor = "bg-black bg-opacity-50", // Overlay color
  overlayColor = "", // Overlay color
}) => {
  return (
    <div className={`mx-auto ${width} rounded-2xl `}>
      <div className={`relative group cursor-pointer h-fit`}>
        {imgSrc && (
          <img
            src={imgSrc}
            alt="Card Image"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {/* Card Content */}
        <div
          className={` inset-0 ${
            overlayColor ? overlayColor : ""
          }   transition-opacity duration-300 flex items-center justify-center`}
        >
          <div className={`text-center px-6 ${textColor}`}>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <div className="border border-gray-300"></div>
            <div>{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
