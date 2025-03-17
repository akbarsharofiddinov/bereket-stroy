import React from "react";
import { PuffLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <>
      <div className="loading-box">
        <PuffLoader />
      </div>
    </>
  );
};

export default Loading;
