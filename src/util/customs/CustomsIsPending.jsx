import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const CustomsIsPending = () => {
  return (
    <div className="flex h-32 justify-center items-center">
      <AiOutlineLoading className="animate-spin" />
    </div>
  );
};

export default CustomsIsPending;
