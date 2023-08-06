import "../App.css";
import "../Compenent/Themes.css";
import "./Home.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import Loading from "../Compenent/loading";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
//Modal
import ModalNewTask from "./AddNewTask.jsx";
//import tools firebase:
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db, auth } from "../Firebase/Config";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//Tasks
import Tasks from "./Tasks";
import { useTranslation } from "react-i18next";
function Home() {
  const navigate = useNavigate();
  const [FrgPsw, setFrgPsw] = useState(false);
  const [Title, setTitle] = useState("");
  //order data
  
  //Filter ca depend Completed

  

  const [EtatAlert, setEtatAlert] = useState("");
  const [LodingAnimate, setLodingAnimate] = useState(false);
  const [TaskArray, setTaskArray] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  if (user && !user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>SignUp</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div>
          <div className="d-flex flex-column justify-content-center home ">
            <h3>
              Please Vérifie Your Email adress : {user.displayName}...{" "}
              <span className="love">🧡</span>
            </h3>
            <br />
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser).then(() => {
                  // Email verification sent!
                  // ...
                });
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
          className="d-flex align-items-center justify-content-center"
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
  //Functions:
  const ClearModel = () => {
    setTaskArray([]);
    setTitle("");
    setTaskText("");
  };
  const SubBtn = async (eo) => {
    eo.preventDefault();
    setLodingAnimate(true);
    //traitement de add data to firestore
    const taskid = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskid}`), {
      Title: Title,
      TasksSup: TaskArray,
      Id: taskid,
      Completed: false,
    });
    console.log("Success Operator");
    setTaskArray([]);
    setTitle("");
    setLodingAnimate(false);
    setFrgPsw(false);

    setEtatAlert("Show");
    setTimeout(() => {
      setEtatAlert("Hide");
    }, 3000);
    //setEtatAlert("hhide");
  };
  const Tiltetxt = (eo) => {
    setTitle(eo.target.value);
  };
  const Detailtxt = (eo) => {
    setTaskText(eo.target.value);
  };
  const Addbtn = (eo) => {
    eo.preventDefault();
    const contxt = document.querySelector("#tasktxt");
    // @ts-ignore
    if (!TaskArray.includes(taskText)) {
      TaskArray.push(taskText);
    } else {
      alert("This task already exists");
    }

    setTaskText("");
    //setkaynin(true);
  };
  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <main className="GrandParent">
          {FrgPsw && (
            <ModalNewTask
              Addbtn={Addbtn}
              Detailtxt={Detailtxt}
              Tiltetxt={Tiltetxt}
              SubBtn={SubBtn}
              setFrgPsw={setFrgPsw}
              Title={Title}
              taskText={taskText}
              TaskArray={TaskArray}
              LodingAnimate={LodingAnimate}
              ClearModel={ClearModel}
            />
          )}
          
          <Tasks user={user} db={db} />
          <section>
            <button
              className="btnVal" dir={i18n.language === "en"  ? "ltr" : i18n.language === "fr"?"ltr":"rtl"}
              onClick={() => {
                setFrgPsw(true);
              }}
            >
              {i18n.language === "en" ? "Add New Task" : i18n.language === "fr"?"Ajouté Nouvelle Task":"اضافة مهمة جديدة "} <i className="fa-solid fa-plus fa-sm"></i>
            </button>
          </section>

          <b className={`alertmsg ${EtatAlert}`}>
            Task Added Success{" "}
            <i
              className="fa-regular fa-circle-check fa-lg"
              style={{ color: "#1ee105" }}
            ></i>
          </b>
        </main>

        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
