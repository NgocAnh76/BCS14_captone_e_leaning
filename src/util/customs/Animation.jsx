// Animation.jsx
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Animation
 * @param {React.ReactNode} children - Phần tử con cần animation.
 * @param {string} direction - Hướng của animation ('x' hoặc 'y').
 * @param {Object} animation - Cấu hình hiệu ứng animation từ Framer Motion.
 * @param {Object} initial - Trạng thái ban đầu của animation.
 * @param {Object} transition - Cấu hình chuyển đổi animation.
 * @param {number} delay - Độ trễ của animation.
 * @param {number} index - Thứ tự phần tử (dùng để tăng dần delay).
 * @param {number} threshold - Ngưỡng kích hoạt animation khi phần tử vào viewport.
 * @param {boolean} triggerOnce - Animation chỉ chạy một lần hay lặp lại.
 */
const Animation = ({
  children,
  direction = "y",
  animation = { opacity: 1 },
  initial = { opacity: 0 },
  transition = { duration: 0.8, ease: "easeOut" },
  delay = 0,
  index = 0,
  threshold = 0.3,
  triggerOnce = true,
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const animationDirection =
    direction === "x" ? { x: 0, ...animation } : { y: 0, ...animation };

  const initialDirection =
    direction === "x" ? { x: 50, ...initial } : { y: 50, ...initial };

  return (
    <motion.div
      ref={ref}
      initial={initialDirection}
      animate={inView ? animationDirection : initialDirection}
      transition={{ ...transition, delay: delay + index * 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Kiểm tra kiểu dữ liệu cho props
Animation.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["x", "y"]),
  animation: PropTypes.object,
  initial: PropTypes.object,
  transition: PropTypes.object,
  delay: PropTypes.number,
  index: PropTypes.number,
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
};

export default Animation;
