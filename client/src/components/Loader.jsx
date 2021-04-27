import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Loader = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <ClipLoader color="red" loading={loading} size={150} />
    </div>
  );
};
