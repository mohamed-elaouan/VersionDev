import Header from "./Compenent/Header";
import Footer from "./Compenent/Footer";
import "./Compenent/Themes.css";
import { Helmet } from "react-helmet-async";
import Loading from "./Compenent/loading";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import { useState } from "react";
import emailJs from "emailjs-com";
import Alert from "Shared/Alert";
const Contact = () => {
  const navigate = useNavigate();
  const [AlertContt, setAlertContt] = useState(
    <b>
      <i
        className="fa-regular fa-circle-check fa-lg"
        style={{ color: "#00f529", marginRight: "10px" }}
      ></i>
      Success
    </b>
  );
  const [AlertBtf, setAlertBtf] = useState("Hidden");
  const AlertMessage = () => {
    setAlertBtf("Display");
    setTimeout(() => {
      setAlertBtf("Hidden");
    }, 2000);
  };
  const [LodingAnimate, setLodingAnimate] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const SendEmailForm = (eo) => {
    emailJs
      .sendForm(
        "service_titnnhi",
        "template_hoo7pjh",
        eo.target,
        "Ceuc-YjwKur4zvlKu"
      )
      .then(
        (result) => {
          setLodingAnimate(true);
          console.log(result.text);
          setAlertContt(
            <b>
              <i
                className="fa-regular fa-circle-check fa-lg"
                style={{ color: "#00f529", marginRight: "10px" }}
              ></i>
              email Envoyé Success
            </b>
          );
          AlertMessage();
          setLodingAnimate(false);
        },
        (error) => {
          console.log(error.text);
          setAlertContt(
            <b>
              <i className="fa-regular fa-circle-xmark fa-lg" style={{color:"red"}}></i>
              Failed Enyoyé Email
            </b>
          );
          AlertMessage();
        }
      );
  };

  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Contact</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>

        <div className="Content">
          <br />
          <h3 className="container">Contact :</h3>
          <Alert Val={AlertBtf}>{AlertContt}</Alert>
          <form
            action=""
            onSubmit={(eo) => {
              eo.preventDefault();
              SendEmailForm(eo);
            }}
          >
            <div className="formInformation">
              <div className="contentInfor">
                <br />
                <input
                  type="text"
                  name="NameClient"
                  className="txt EmailTxt"
                  placeholder="Nom Complet"
                />
                <input
                  type="email"
                  name="EmailClient"
                  className="txt EmailTxt"
                  placeholder="email .."
                />

                <input
                  className="txt EmailTxt"
                  name="Suject"
                  onChange={(eo) => {}}
                  type="text"
                  placeholder="Suject "
                />
                <textarea
                  name="message"
                  onChange={(eo) => {}}
                  id=""
                  className="txt EmailTxt"
                  // @ts-ignore
                  cols="50"
                  placeholder="Message"
                  // @ts-ignore
                  rows="5"
                ></textarea>
              </div>
            </div>
            <div className="Valid">
              <button
                type="submit"
                style={{ marginRight: "100px" }}
                className="btn btn-success"
                onClick={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                }}
              >
                {LodingAnimate === true ? (
                  <ReactLoading
                    type="spokes"
                    color="gold"
                    height={25}
                    width={25}
                  />
                ) : (
                  <span style={{ fontSize: "17px" }}>Envoyer</span>
                )}
              </button>
            </div>
          </form>
        </div>

        <Footer></Footer>
      </div>
    );
  }
  if (user && !user.emailVerified) {
    return navigate("/");
  }
  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Loading />
      </div>
    );
  }
  if (!user) {
    navigate("/SignIn");
  }
};

export default Contact;
