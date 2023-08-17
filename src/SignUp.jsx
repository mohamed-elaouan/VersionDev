import "./App.css";
import "./Compenent/Themes.css";
import Header from "./Compenent/Header";
import Footer from "./Compenent/Footer";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase/Config";
import ThemeContext from "./Context/DataContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import Loading from "./Compenent/loading";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./Firebase/Config";
import ReactLoading from "react-loading";

//upload Image

const SignUp = () => {
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
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [LodingAnimate, setLodingAnimate] = useState(false);
  const [SrcImg, setSrcImg] = useState(false);
  const last = imageUrls[imageUrls.length - 1];
  const [CapEcran, setCapEcran] = useState("");

  const uploadFile = () => {
    if (imageUpload == null) return alert("Please Choisir un image");
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setSrcImg(true);
        setCapEcran(url);
        //alert(CapEcran)
      });
    });
  };

  if (!user) {
    return (
      <div>
        <Helmet>
          <title>SignUp</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div className="Content">
          <form
            className=""
            onSubmit={(eo) => {
              eo.preventDefault();
            }}
          >
            <div className="form">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>Register : </h1>
                <br />
                <input
                  required
                  className="txt"
                  type="text"
                  placeholder="UserName"
                  onChange={(eo) => {
                    setName(eo.target.value);
                  }}
                />
                <input
                  required
                  className="txt"
                  type="email"
                  placeholder="Tapez Votre Email"
                  name="email"
                  onChange={(eo) => {
                    setemail(eo.target.value);
                  }}
                />
                <input
                  required
                  className="txt PassWord"
                  type="password"
                  placeholder="Password"
                  name="PassWord"
                  onChange={(eo) => {
                    setpassword(eo.target.value);
                  }}
                />
                <input
                  required
                  className="txt"
                  type="password"
                  onChange={(eo) => {
                    const pst = document.querySelector(".PassWord");
                    // @ts-ignore
                    if (eo.target.value !== pst.value) {
                      eo.target.setAttribute(
                        "Style",
                        "border: red 1.5px solid;"
                      );
                    } else {
                      eo.target.setAttribute(
                        "Style",
                        "border: green 1.5px solid;"
                      );
                    }
                  }}
                  placeholder="Repeat password"
                  name="PassWord"
                />
              </div>

              <div>
                <div className="choiseScreen">
                  <input 
                    type="file"
                    onChange={(event) => {
                      event.preventDefault();
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                  <input
                    type="button"
                    onClick={() => {
                      uploadFile();
                    }}
                    className="btn btn-success"
                    value={"Upload Image"}
                  />
                </div>
                {SrcImg && (
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <img
                      className="img-thumbnail"
                      src={`${last}`}
                      width={"200"}
                      max-height={"200"}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginBlock: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btnLogin btn btn-primary"
                  onClick={async () => {
                    setLodingAnimate(true);
                    await createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(auth.currentUser, {
                          displayName: Name,
                          photoURL: last,
                        })
                          .then(() => {
                            //console.log("Success Name");
                            setAlertContt(
                              <b>
                                <i
                                  className="fa-solid fa-triangle-exclamation"
                                  style={{ color: "#ffc800" }}
                                ></i>
                                Please Verifie Your Email
                              </b>
                            );
                            AlertMessage();
                          })
                          .catch((error) => {
                            alert("Votre Email Deja existe , Essayer Defrente email");
                          });
                        sendEmailVerification(auth.currentUser).then(() => {
                          alert("Please Verifie Your Email");
                        });
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert("Votre Email Deja existe , Essayer Defrente email");
                        window.location.reload();
                      });
                    setLodingAnimate(false)
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
                <span >Create Account</span>
              )}
                </button>
              </div>
              <div style={{ textAlign: "left" }}>
                <NavLink
                  className="Link bold"
                  style={{ fontWeight: "bold", marginLeft: "100px" }}
                  to="/SignIn"
                >
                  Login ..
                </NavLink>
              </div>
            </div>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
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
  if (user) {
    navigate("/");
  }
};

export default SignUp;
