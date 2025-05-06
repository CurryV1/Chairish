import React from "react";

const Toast = ({ message, visible }) => {
  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-green-600 text-white rounded shadow-md transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 1000 }}
    >
      {message}
    </div>
  );
};

export default Toast;
