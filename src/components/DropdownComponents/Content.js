import React from "react";

const Content = ({ item }) => {
  return (
    <div>
      {item?.type === "content" ? (
        <div>{item?.content}</div>
      ) : (
        <button
          className=" dark:text-gray-300 text-left data-[focus]:bg-blue-100 p-3 "
          onClick={item?.onClick}
        >
          <div className="flex gap-2">
            {item?.icon && <span className="mt-1"> {item?.icon}</span>}

            <div className="flex flex-col">
              {item?.name && <span> {item?.name}</span>}
              {item?.description && (
                <span className="text-xs">{item?.description}</span>
              )}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Content;
