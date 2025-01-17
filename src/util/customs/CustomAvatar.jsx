import React, { useState, useEffect } from "react";

const Avatar = ({
  name,
  defaultSize = 40,
  bgColor = "random",
  textColor = "FFFFFF",
}) => {
  const [size, setSize] = useState(defaultSize);

  // Hàm xử lý resize
  const updateSize = () => {
    if (window.innerWidth < 640) {
      setSize(40); // Mobile
    } else if (window.innerWidth < 1024) {
      setSize(60); // Tablet
    } else {
      setSize(90); // Desktop
    }
  };

  useEffect(() => {
    updateSize(); // Cập nhật kích thước ban đầu
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize); // Cleanup
    };
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=${size}&background=${bgColor}&color=${textColor}&rounded=true`;

  return (
    <img
      src={avatarUrl}
      alt={name}
      className="rounded-full border border-gray-200 shadow-sm"
      width={size}
      height={size}
    />
  );
};

export default Avatar;

export const Avatars = ({
  name,
  defaultSize = 50,
  bgColor = "random",
  textColor = "FFFFFF",
}) => {
  const [size, setSize] = useState(defaultSize);

  // Hàm xử lý resize
  const updateSize = () => {
    if (window.innerWidth < 640) {
      setSize(40); // Mobile
    } else if (window.innerWidth < 1024) {
      setSize(60); // Tablet
    } else {
      setSize(50); // Desktop
    }
  };

  useEffect(() => {
    updateSize(); // Cập nhật kích thước ban đầu
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize); // Cleanup
    };
  }, []);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=${size}&background=${bgColor}&color=${textColor}&rounded=true`;

  return (
    <img
      src={avatarUrl}
      alt={name}
      className="rounded-full border border-gray-200 shadow-sm"
      width={size}
      height={size}
    />
  );
};
