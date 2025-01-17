import React, { useState, useEffect } from "react";

const FallbackImage = ({ src, alt, className, fallbackSrc, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src); // Cập nhật imgSrc khi prop src thay đổi
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc || "/fontend_image.jpeg"); // Sử dụng đường dẫn tuyệt đối
  };

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt || "fallback image"}
      className={className}
      onError={handleError}
    />
  );
};

export default FallbackImage;
