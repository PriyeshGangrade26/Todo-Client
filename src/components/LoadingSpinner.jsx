import React from "react";
import "../assets/css/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <>
      <div className="PageBody">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export { LoadingSpinner };
