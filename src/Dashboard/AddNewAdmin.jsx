import "../App.css";
import "../Compenent/Themes.css";
import "../Home/Home.css";
import "./Style.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import Loading from "../Compenent/loading";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
//import { v4 } from "uuid";

const AddNewAdmin = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [Name, setName] = useState("");
  const [CIN, setCIN] = useState("");
  const [email, setemail] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [DateNaissance, setDateNaissance] = useState("");
  const [Specialité, setSpecialité] = useState("");
  const [type, settype] = useState("");

  const [LodingAnimate, setLodingAnimate] = useState(false);
  const AddDatta = async () => {
    setLodingAnimate(true);
    const Adminid = new Date().getTime();
    await setDoc(doc(db, "Admins", Name), {
      AdminId: Adminid,
      Type: type,
      Name: Name,
      CIN: CIN,
      email: email,
      Telephone: Telephone,
      DateNaissance: DateNaissance,
      Specialité: Specialité,
      nbSolving : 0,
      nbNOTSolving : 0,

    });
    alert("Add Technicien Success");
    setLodingAnimate(false);
    navigate("/ShowProblem");
  };

  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Add-Admin</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header />
        <div className="Content">
          <br />
          <h3 className="container">
            Tapez Des Information De Nouvelle Admin :
          </h3>
          <form
            action=""
            onSubmit={(eo) => {
              eo.preventDefault();
            }}
          >
            <div className="formNew">
              <div className="contentInfor">
                <br />

                <input
                  type="text"
                  placeholder="Name Complet"
                  className="txt EmailTxt"
                  onChange={(eo) => {
                    setName(eo.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="CIN "
                  className="txt EmailTxt"
                  onChange={(eo) => {
                    setCIN(eo.target.value);
                  }}
                />
                <input
                  className="txt EmailTxt"
                  type="email"
                  placeholder="email "
                  onChange={(eo) => {
                    setemail(eo.target.value);
                  }}
                />
              </div>
              <div className="zonePassword d-flex flex-column">
                <input
                  className="txt EmailTxt"
                  type="text"
                  placeholder="Telephone "
                  onChange={(eo) => {
                    setTelephone(eo.target.value);
                  }}
                />
                <input
                  className="txt EmailTxt"
                  type="date"
                  placeholder="Date Naissance"
                  onChange={(eo) => {
                    setDateNaissance(eo.target.value);
                  }}
                />
                <div style={{display:"flex"}}>
                  <select style={{width:"200px"}}
                    required
                    name="ProblemType"
                    id=""
                    className="form-select txt EmailTxt"
                    onChange={(eo) => {
                      setSpecialité(eo.target.value);
                    }}
                  >
                    <option value="" hidden selected>
                      Specialité{" "}
                    </option>
                    <option value="SoftWare">Soft-Ware</option>
                    <option value="HardWare">Hard-Ware</option>
                  </select>
                  <select style={{width:"200px"}}
                    required
                    name="ProblemType"
                    id=""
                    className="form-select txt EmailTxt"
                    onChange={(eo) => {
                      settype(eo.target.value);
                    }}
                  >
                    <option value="" hidden selected>
                      Type Administation{" "}
                    </option>
                    <option value="Admin">Admin</option>
                    {user.email==="mohamedelaouan8@gmail.com"&&<option value="SuperAdmin">Super-Admin</option>}
                  </select>
                </div>
              </div>
            </div>
            <div className="" style={{ textAlign: "center" }}>
              <button
                style={{ marginRight: "0px" }}
                className="btn btn-primary"
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
                  "Envoyer"
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
          <title>Add New Admin</title>
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

export default AddNewAdmin;

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
