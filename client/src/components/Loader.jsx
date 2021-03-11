import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

export const Loader = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="red" loading={loading} size={150} />
    </div>
  );
};
