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

//upload Image

const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

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
        <div>
          <form
            className="form"
            onSubmit={(eo) => {
              eo.preventDefault();
            }}
          >
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
              {/*<input
              required
              className="txt"
              type="text"
              placeholder="Your Phone Number"
              
               */}
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
                className="txt"
                type="password"
                onChange={(eo) => {
                  const pst = document.querySelector(".PassWord");
                  // @ts-ignore
                  if (eo.target.value !== pst.value) {
                    eo.target.setAttribute("Style", "border: red 3px solid;");
                  } else {
                    eo.target.setAttribute("Style", "border: green 3px solid;");
                  }
                }}
                placeholder="Repeat password"
                name="PassWord"
              />
              <div>
                <button
                  className="btnLogin btn btn-primary"
                  onClick={() => {
                    createUserWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(auth.currentUser, {
                          displayName: Name,photoURL:last
                        })
                          .then(() => {
                            console.log("Success Name");
                          })
                          .catch((error) => {
                            console.log("Failed Name");
                          });
                        sendEmailVerification(auth.currentUser).then(() => {
                          alert("Please Verifié Your Email");
                        });
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("Failed");
                      });
                  }}
                  type="submit"
                >
                  Create Account
                </button>
              </div>
              <NavLink
                className="Link bold"
                style={{ fontWeight: "bold" }}
                to="/SignIn"
              >
                Login ..
              </NavLink>
            </div>

            <div>
              <div className="choiseScreen">
                <input
                  required
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
                <div style={{ textAlign: "center",width:"100%" }}>
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
