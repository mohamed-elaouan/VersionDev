import React from "react";
import "./Model.css";
const Model = ({close,ClearModel,children}) => {
  
  return (

      <div className="ParentModal">
        <form action="" id="forgetPsW" className={`forgetPsW`}>
          <div className="close">
            <i
              className="fa-solid  fa-xmark fa-lg iclose"
              onClick={() => {
                close(false);
                ClearModel();
                //setClose("HideForm");
        
                // let cls = document.querySelector("#forgetPsW");
                // cls.setAttribute(
                //   "style",
                //   "scale:0.4;transition: 0.5s;"
                // );
              }}
            ></i>                 
          </div>
          
          {children}
           
        </form>
      </div>
  );
};
// {/* <h4>Forget PassWord :</h4>
//           <input
//             required
//             onChange={(eo) => {
//               seteReset(eo.target.value);
//             }}
//             className="txt EmailTxt"
//             type="email"
//             placeholder="Tapez Votre Email"
//             name="email"
//           />
//           <button
//             className="btn btn-primary"
//             onClick={(eo) => {
//               eo.preventDefault();
//               // @ts-ignore
//               const Emailtxt = document.querySelector(".EmailTxt").value;
//               sendPasswordResetEmail(auth, Emailtxt)
//                 .then(() => {
//                   // @ts-ignore
//                   //if (Emailtxt.value) {
//                   setExiste(true);
//                   console.log("Success");
//                   //}
//                   console.log("Opetation Success");
//                 })
//                 .catch((error) => {
//                   const errorCode = error.code;
//                   const errorMessage = error.message;
//                   console.log("Failed");
//                 });
//             }}
//           >
//             Reset Email
//           </button>
//           <br />
//           <p id="TxtReset" style={{ color: "red" }}>
//             {Existe && (
//               <b>Please Check your Email to reset your Passeword</b>
//             )}
//           </p>  */}
export default Model;
