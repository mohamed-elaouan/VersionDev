import "../App.css";
import "../Compenent/Themes.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { auth, db } from "../Firebase/Config";
import Moment from "react-moment";
import Loading from "../Compenent/loading";
import moment from "moment";
import ProfilContent from "./Content";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import Alert from "Shared/Alert";
function Profil() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  //Alert
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
  const DeleteUser = () => {
    if (user) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure to Remove Your Account!") === true) {
        deleteUser(user)
          .then(() => {
            setAlertContt(
              <b>
                <i
                  className="fa-regular fa-circle-check fa-lg"
                  style={{ color: "#00f529", marginRight: "10px" }}
                ></i>
                Suppression terminée avec succès
              </b>
            );
            AlertMessage();
          })
          .catch((error) => {
            setAlertContt(
              <b>
                <i
                  className="fa-regular fa-circle-xmark"
                  style={{ color: "red ", marginRight: "15px" }}
                ></i>
                Suppression Faild
              </b>
            );
            AlertMessage();
          });
      } else {
      }
    }
    // eslint-disable-next-line no-restricted-globals
    
  };
  //translate PAge

  if (user) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div>
          <Alert Val={AlertBtf}>{AlertContt}</Alert>
          <ProfilContent user={user} DeleteUser={DeleteUser} db={db} />
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
  if (!user || error) {
    return navigate("/");
  }
}

export default Profil;
// useEffect(() => {
//   if (user) {
//     alert("Loading,uk");
//   }else{
//     alert("Loading,Sortie");
//     navigate("/");
//   }
// }, [user]);
