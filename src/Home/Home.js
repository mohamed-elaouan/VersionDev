import "../App.css";
import "../Compenent/Themes.css";
import "./Home.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import Loading from "../Compenent/loading";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  
} from "firebase/storage";
import { storage } from "../Firebase/Config";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import emailJs from "emailjs-com";
//import { v4 } from "uuid";
import  Alert  from 'Shared/Alert';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const [LodingAnimate, setLodingAnimate] = useState(false);
  const [SrcImg, setSrcImg] = useState(false);
  const last = imageUrls[imageUrls.length - 1];
  const [optAutre, setoptAutre] = useState(false);
  const [optAutretxt, setoptAutrettx] = useState("");
  const [Fonctionalité, setFonctionalité] = useState("");
  const [Decription, setDecription] = useState("");
  const [MachineType, setMachineType] = useState("");
  const [ProblemType, setProblemType] = useState("");
  const [CapEcran, setCapEcran] = useState("");
  //Alert
  const [AlertContt, setAlertContt] = useState(
    <b>
      <i
        className="fa-regular fa-circle-check fa-lg"
        style={{ color: "#00f529", marginRight: "10px" }}
      ></i>
      Reclamation Bien Envoye
    </b>
  );
  const [AlertBtf, setAlertBtf] = useState("Hidden");
  const AlertMessage = () => {
    setAlertBtf("Display");
    setTimeout(() => {
      setAlertBtf("Hidden");
    }, 1000);
  };

  const AddDatta = async () => {
    setLodingAnimate(true);
    const Probid = new Date().getTime();
    await setDoc(doc(db, "Problems", `${Probid}`), {
      Fonctionnalite: Fonctionalité,
      Decription: Decription,
      email: user.email,
      ClientName: user.displayName,
      MachineType:
        MachineType === ""
          ? optAutretxt
          : MachineType
          ? MachineType
          : "Not Found",
      ProblemId: Probid,
      ProblemType: ProblemType,
      PhoteProblem: CapEcran,
      IsSolving: "false",
    });
    setLodingAnimate(false);
  };

  const SendEmailForm = (eo) => {
    emailJs
      .sendForm(
        "service_s5907iy",
        "template_knedbva",
        eo.target,
        "Mf71UPTD7fmwWrFRL"
      )
      .then(
        (result) => {
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
        },
        (error) => {
          console.log(error.text);
          setAlertContt(
            <b>
              <i className="fa-regular fa-circle-xmark fa-lg"></i>
              Failed Enyoyé Email
            </b>
          );
          AlertMessage();
        }
      );
  };
  const uploadFile = () => {
    if (imageUpload == null) return alert("Veuillez Chosi un Photo");

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setSrcImg(true);
        setCapEcran(url);
      });
    });
  };
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header />
        <Alert Val={AlertBtf}>{AlertContt}</Alert>
        <div className="Content Home" >
          <br />
          <h3 className="" style={{marginLeft:"15px"}}>
            Bienvenue <b>{user.displayName}</b>,<br /><span style={{marginLeft:"15px"}}>Tapez Des Information De Votre Problem :</span> 
          </h3>
          <form
            action=""
            onSubmit={(eo) => {
              eo.preventDefault();
              SendEmailForm(eo);
              setTimeout(() => {
                setAlertBtf("Display")
              }, 1000);
            }}
          >
            <div className="formInformation">
              <fieldset>
                <legend className=""> Details : </legend>
                <div className="contentInfor">
                  <br />
                  <select
                    required
                    onChange={(eo) => {
                      setProblemType(eo.target.value);
                    }}
                    name="ProblemType"
                    id=""
                    className="form-select txt EmailTxt"
                  >
                    <option value="">Choisir, Quelle Type de Problem </option>
                    <option value="SoftWare">Soft-Ware</option>
                    <option value="HardWare">Hard-Ware</option>
                  </select>

                  <select
                    name="MachineType"
                    required
                    onChange={(eo) => {
                      if (eo.target.value === "Autre") {
                        setoptAutre(true);
                        setMachineType(optAutretxt);
                      } else {
                        setoptAutre(false);
                        setMachineType(eo.target.value);
                      }
                    }}
                    id=""
                    className="form-select txt EmailTxt"
                  >
                    <option value="">Choisir, Type de machine </option>
                    <option value="Ordinateur">Ordinateur</option>
                    <option value="Imprimante">Imprimante</option>
                    <option value="Scanner">Scanner</option>
                    <option value="DataShow">DataShow</option>
                    <option value="Serveur">Serveur</option>
                    <option value="Television">Television</option>
                    <option value="Autre">Autre ...</option>
                  </select>

                  {optAutre && (
                    <input
                      className="txt EmailTxt"
                      onChange={(eo) => {
                        setoptAutrettx(eo.target.value);
                      }}
                      type="text"
                      placeholder="Tapez le machine"
                    />
                  )}
                  <input
                    type="text"
                    name="emailClient"
                    hidden
                    defaultValue={user.email}
                  />
                  <input
                    type="text"
                    name="displayName"
                    hidden
                    defaultValue={user.displayName}
                  />

                  <input
                    className="txt EmailTxt"
                    name="Fonctionnalite"
                    onChange={(eo) => {
                      setFonctionalité(eo.target.value);
                    }}
                    type="text"
                    placeholder="Fonctionnalité (Directeur , employé...)"
                  />
                  <textarea
                    name="msg"
                    onChange={(eo) => {
                      setDecription(eo.target.value);
                    }}
                    id=""
                    className="txt EmailTxt"
                    // @ts-ignore
                    cols="50"
                    placeholder="Decription de Problem"
                    // @ts-ignore
                    rows="5"
                  ></textarea>
                </div>
              </fieldset>

              <div className="">
                <h3>
                  <u>Capture d'écran:</u>
                </h3>
                <div
                  style={{
                    textAlign: "start",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    hidden
                    name="CapEcran"
                    defaultValue={last}
                  />
                </div>

                <div className="choiseScreen">
                  <input
                    required
                    type="file" accept="image/*"
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
                    defaultValue={"Upload Image"}
                  />
                </div>

                {SrcImg && (
                  <img
                    src={`${last}`}
                    width={"480"}
                    max-height={"500"}
                    alt=""
                  />
                )}
                {/* {imageUrls.map((url) => {
                  return url;
                })} */}
              </div>
            </div>
            <div className="Valid">
              <button type="submit"
                style={{ marginRight: "100px" }}
                className="btn btn-success VVV"
                onClick={() => {
                  AddDatta();
                  //setLodingAnimate(true);

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
                  <span style={{fontSize:"22px"}}>Envoyer</span>
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
    return (
      <div>
        <Helmet>
          <title>SignUp</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div className="Content">
          <div className="d-flex flex-column justify-content-center home ">
            <h3>
              Please Vérifie Your Email adress : {user.displayName}...{" "}
              {/* <span className="love">🧡</span> */}
            </h3>
            <br />
            <button
              onClick={() => {
                
                  alert("Please Verifié Your Email");
                
                
              }}
              className="btn btn-danger"
            >
              Send again
            </button> 
          </div>
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
        {/* <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100wv", height: "100vh" }}
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div> */}
        <Loading />
      </div>
    );
  }
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div
          style={{ width: "100wv", height: "70vh" }}
          className="d-flex align-items-center justify-content-center Content"
        >
          <h4>
            Please{" "}
            <Link className="text-danger fw-bolder" to="/SignIn">
              SignIn
            </Link>
            ,
            <Link className="text-primary fw-bolder" to="/SignUp">
              SignUp
            </Link>{" "}
            to Continue ....
          </h4>
        </div>
        <Footer></Footer>
      </div>
    );
  }
};

export default Home;

// function Home() {
//   const navigate = useNavigate();
//   const [user, loading, error] = useAuthState(auth);

//   const [imageUpload, setImageUpload] = useState(null);

//   const storage = getStorage();
//   const uploadFile = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls((prev) => [...prev, url]);
//       });
//     });
//   };

// }

// export default Home;
// {
//   /*<input
//             required
//             className="txt EmailTxt"
//             type="email"
//             placeholder="Fonctionnalité"
//           />
//          <select name="" id="" className="form-select">
//           <option value="">Choisir, Quelle Type de Preblem </option>
//           <option value="SoftWare">Soft-Ware</option>
//           <option value="HardWord">Hard-Word</option>
//         </select>
//         <select name="" id="" className="form-select">
//           <option value="">Choisir, Type de machine </option>
//           <option value="SoftWare">Ordinateur</option>
//           <option value="HardWord">Impremante</option>
//           <option value="HardWord">Scanner</option>
//           <option value="HardWord">DataShow</option>
//           <option value="HardWord">Television</option>
//           <option value="HardWord">Autre ...</option>
//         </select> */
// }
// function setImageUrls(arg0) {
//   throw new Error("Function not implemented.");
// }
