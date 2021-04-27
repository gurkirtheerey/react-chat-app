import React from "react";
import { ToastContainer } from "react-toastify";

export const ToastNotification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss={false}
    />
  );
};
