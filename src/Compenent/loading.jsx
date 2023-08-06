import React from 'react';
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{width:"100vw",height:"100vh"}}>
      <ReactLoading type="bars" color="red" height={190} width={130} />
      </div>
    </div>
  );
}

export default Loading;
