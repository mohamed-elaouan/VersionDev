import "../App.css";
import "./SignIn.css";
import "../Compenent/Themes.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import ModalFrgPss from "../Shared/Model";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigation } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Firebase/Config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
const SignIn = () => {
  const [e, sete] = useState(" ");

  const [p, setp] = useState("");
  const [check, setcheck] = useState(false);
  const [error, seterror] = useState(" ");
  const [eReset, seteReset] = useState("");
  const [Existe, setExiste] = useState(false);
  const [LodingAnimate, setLodingAnimate] = useState(false);
  /*frogetPassword*/
  const [FrgPsw, setFrgPsw] = useState(false);
  const ClearModel = () => {};
  const navigate = useNavigate();
  return (
    <div>
      <Helmet>
        <title>SignIn</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Header></Header>
      <div className="mere Content">
        {FrgPsw && (
          <ModalFrgPss close={setFrgPsw} ClearModel={ClearModel}>
            <h4>Forget PassWord :</h4>
            <input
              required
              onChange={(eo) => {
                seteReset(eo.target.value);
              }}
              className="txt EmailTxt"
              type="email"
              placeholder="Tapez Votre Email"
              name="email"
            />
            <button
              className="btn btn-primary"
              onClick={(eo) => {
                eo.preventDefault();
                // @ts-ignore
                const Emailtxt = document.querySelector(".EmailTxt").value;
                sendPasswordResetEmail(auth, eReset)
                  .then(() => {
                    // @ts-ignore
                    // if (Emailtxt.value) {
                    //     console.log("Success");
                    // }
                    setcheck(true);
                    console.log("Opetation Success");
                    alert("Please , Relechir Your Email");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("Failed");
                    alert("You are Not Sign Up , Please Creé Account !!! ");
                  });
              }}
            >
              Reset Email
            </button>
            <br />
            <p id="TxtReset" style={{ color: "red" }}>
              {check && <b>Please Check your Email to reset your Passeword</b>}
            </p>
          </ModalFrgPss>
        )}
        <br />
        <form
          className="formSignIn"
          onSubmit={(eo) => {
            eo.preventDefault();
          }}
        >
          <h1>Login : </h1>
          <br />
          <input
            required
            className="txt"
            type="email"
            onChange={(eo) => {
              sete(eo.target.value);
            }}
            placeholder="Your Email"
            name="email"
          />

          <input
            required
            className="txt"
            type="password"
            onChange={(eo) => {
              setp(eo.target.value);
            }}
            placeholder="Your Password"
            name="PassWord"
          />
          <p className="text-danger fw-bold">{error}</p>
          <div>
            <button
              className="btnLogin btn btn-primary"
              onClick={async (eo) => {
                setLodingAnimate(true);
                await signInWithEmailAndPassword(auth, e, p)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    seterror(errorCode);
                  });
                setLodingAnimate(false);
              }}
              type="submit"
            >
              {LodingAnimate === true ? (
                <ReactLoading
                  type="spokes"
                  color="gold"
                  height={25}
                  width={25}
                />
              ) : (
                <span>Login</span>
              )}
            </button>

            <h5>
              Forget
              <input
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => {
                  setFrgPsw(true);
                  //setClose("ShowForm");

                  // let cls = document.querySelector("#forgetPsW");
                  // let mere = document.querySelector(".mere");
                  // cls.setAttribute(
                  //   "style",
                  //   "Display:flex ;transition: all 0.7s;animation: AnimateOpen ease-in-out 1s;"
                  // );
                }}
                value="PassWord"
                className="link-warning Link bold"
              />
            </h5>
          </div>
          <NavLink
            className="Link bold"
            style={{ fontWeight: "bold" }}
            to="/SignUp"
          >
            Register ..
          </NavLink>
        </form>
      </div>
      <Footer></Footer>
      <div className="forgetPsw">
        <div></div>
      </div>
    </div>
  );
};

export default SignIn;
