import React, { Children } from "react";

const Alert = ({ children,Val}) => {
  return (
    <div className={`AlertMere ${Val}`} >
      <div className={`AlertMsg ${Val}`} >{children}</div>
    </div>
  );
};

export default Alert;
