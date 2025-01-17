// src/utils/toast.js
import { toast } from "react-toastify";

/**
 * Hiển thị thông báo thành công.
 * @param {string} message - Nội dung thông báo.
 */
export const showSuccessToast = (message) => {
  toast.success(message || "🟢 Success!");
};

export const showErrorToast = (message) => {
  toast.error(message || "🔴 Error!");
};

export const showWarningToast = (message) => {
  toast.warn(message || "⚠️ Warning!");
};

export const showInfoToast = (message) => {
  toast.info(message || "ℹ️ Info!");
};
