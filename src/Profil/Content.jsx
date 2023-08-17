import "../App.css";
import "../Compenent/Themes.css";
import "./Profil.css";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";

const Content = ({ user, DeleteUser, db }) => {
  const { t, i18n } = useTranslation();
  const [Query, setQuery] = useState(query(collection(db, "Admins")));
  const [value, loading, error] = useCollection(Query);
  let Val = false;
  if (value) {
    return (
      <div className="Content">
        <h2 className="container">Information:</h2>
        <div className="ProContent mt-5">
          <div className="mb-4">
            <h3>Profil :</h3>
            <img
              src={user.photoURL} className="img-thumbnail"
              alt=""
              width={"300px"}
              height={"fit-content"}
            />
          </div>
          <table
            style={{
              display: "flex",
              justifyContent: "space-around",
              fontWeight: "700",
              fontSize: "17px",border:"2px black solid",paddingInline:"10px",paddingTop:"7px",borderRadius:"12px"
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

              {value &&
                value.docs.map((item,m) => {
                  if (
                    item.data().email === user.email &&
                    item.data().Type === "Admin"
                  ) {
                    Val = true;
                    return (
                      <div key={m}>
                        <tr>
                          <td>
                            <p>Date Naissance :</p>
                          </td>
                          <td>
                            <p>
                              <Moment format={item.data().DateNaissance} />
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Catre Nationnale :</p>
                          </td>
                          <td>
                            <p>{item.data().CIN}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Telephone :</p>
                          </td>
                          <td>
                            <p>{item.data().Telephone}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Administration :</p>
                          </td>
                          <td>
                            <p>{item.data().Type}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Specialité :</p>
                          </td>
                          <td>
                            <p>{item.data().Specialité}</p>
                          </td>
                        </tr>
                      </div>
                    );
                  }
                  if (
                    item.data().email === user.email &&
                    item.data().Type === "SuperAdmin"
                  ) {
                    Val = true;
                    return (
                      <div>
                        <tr>
                          <td>
                            <p>Date Naissance :</p>
                          </td>
                          <td>
                            <p>
                              <Moment format={item.data().DateNaissance} />
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Catre Nationnale :</p>
                          </td>
                          <td>
                            <p>{item.data().CIN}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Telephone :</p>
                          </td>
                          <td>
                            <p>{item.data().Telephone}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Administration :</p>
                          </td>
                          <td>
                            <p>{item.data().Type}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Specialité :</p>
                          </td>
                          <td>
                            <p>{item.data().Specialité}</p>
                          </td>
                        </tr>
                      </div>
                    );
                  }
                })}
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
              {/* Delete Button */}
              <tr>
                <td></td>
                <td style={{ textAlign: "end" }}>
                  <p>
                    <button
                      onClick={() => {
                        DeleteUser();
                      }}
                      className="btn btn-danger"
                    >
                      Delete account
                    </button>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (error) {
    return <h2>Tu as un Errors</h2>;
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <ReactLoading type="spokes" color="violet" height={77} width={77} />
      </div>
    );
  }
};

export default Content;
