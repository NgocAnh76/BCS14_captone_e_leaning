import React from "react";

const Alert = ({ type, message, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 w-80 border-l-4 p-4 rounded shadow-md ${
        alertStyles[type]
      }`}
      role="alert"
    >
      <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <p>{message}</p>
      <button
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
