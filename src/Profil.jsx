import "./App.css";
import "./Compenent/Themes.css";
import Header from "./Compenent/Header";
import Footer from "./Compenent/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";
import { auth } from "./Firebase/Config";
import Moment from "react-moment";
import Loading from "./Compenent/loading";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
function Profil() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   if (user) {
  //     alert("Loading,uk");
  //   }else{
  //     alert("Loading,Sortie");
  //     navigate("/");
  //   }
  // }, [user]);
  if (user) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        {user && (
          <div>
            <h3 className="container">Information:</h3>
            <table
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontWeight: "700",
                fontSize: "17px",
              }}
              className="Profil"
            >
              <tbody>
                <tr>
                  <td>
                    <p>User Name :</p>{" "}
                  </td>
                  <td>
                    <p>{user.displayName}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Email :</p>{" "}
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Etat Email :</p>{" "}
                  </td>
                  <td>
                    {user.emailVerified && <p>Verifie </p>}
                    {!user.emailVerified && <p>No,Please Confirme your email</p>}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Account Created :</p>{" "}
                  </td>
                  <td>
                    <p>
                      <Moment fromNow>{user.metadata.creationTime}</Moment>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Last SignIn :</p>{" "}
                  </td>
                  <td>
                    <p>
                      <Moment fromNow>{user.metadata.lastSignInTime}</Moment>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ textAlign: "start" }}>
                    <p>
                      <button onClick={() => {
                        if (window.confirm("Are you sure to Remove Your Account!") === true) {
                          deleteUser(user).then(() => {
                            navigate("/");
                            console.log("Done")
                          }).catch((error) => {
                            // An error ocurred
                            // ...
                          });
                        } else {
                          
                        }
                      }} className="btn btn-danger">Delete account</button>
                    </p>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        )}

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
        <Loading/>
      </div>
    );
  }
  if (!user || error) {
    return navigate("/");
  }
}

export default Profil;
