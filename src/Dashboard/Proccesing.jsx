/* eslint-disable array-callback-return */
import React, { useState } from "react";
import "./Style.css";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import Alert from "Shared/Alert";
import {  db } from "../Firebase/Config";
import Footer from "Compenent/Footer";
import Header from "Compenent/Header";
import { Helmet } from "react-helmet-async";
import Loading from "../Compenent/loading";
//import 'moment-timezone';
const Proccesing = () => {
  //translate
  const {  i18n } = useTranslation();
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
  //data from admins

  const [AdminsArr] = useCollection(query(collection(db, "Admins")));
  const [ProblArr] = useCollection(query(collection(db, "Problems")));

  //Order and etat de Completed:
  const [Query] = useState(
    query(collection(db, "RendezVous"), orderBy("IdPross", "desc"))
  );
  //const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(Query);
  //Confim Solving Problem

  const Confirmation = async (idU, Tec,a) => {
    let idd = String(idU);
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Confirmez, cette mission est-elle réussie `)) {
      await updateDoc(doc(db, "Problems", idd), {
        IsSolving: "true",
      });
      await updateDoc(doc(db, "Admins", Tec), {
        nbSolving: a + 1,
      });
      setAlertContt(
        <b>
          <i
            className="fa-regular fa-circle-check fa-lg"
            style={{ color: "#00f529", marginRight: "10px" }}
          ></i>
          L'opération est Réussie
        </b>
      );
      AlertMessage();
    }
  };
  const Annulation = async (idU, Tec,c) => {
    let idd = String(idU);
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Confirmation, cette mission est-elle un échec .`)) {
      await updateDoc(doc(db, "Problems", idd), {
        IsSolving: "false",
      });
      await updateDoc(doc(db, "Admins", Tec), {
        nbNOTSolving: c + 1,
      });

      setAlertContt(
        <b>
          <i
            className="fa-regular fa-circle-check fa-lg"
            style={{ color: "#00f529", marginRight: "10px" }}
          ></i>
          L'opération est Echec 
        </b>
      );
      AlertMessage();
    }
  };
  const Delete = async (IdPross) => {
    let idd = String(IdPross);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Confirmer Pour Supprimer Ce Reclamation")) {
      await deleteDoc(doc(db, "RendezVous", idd));
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
    }
  };
  const AlertMessage = () => {
    setAlertBtf("Display");
    setTimeout(() => {
      setAlertBtf("Hidden");
    }, 2000);
  };

  if (value) {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div className="Content">
          <h2 className="container">Processing &</h2><h3 className="container">Gestion des Resoudre de problem </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="GrandParent" style={{ width: "90%" }}>
              <section className="OPIONS">
                {/*
                   <div className="Filter">
                    {Disable && (
                      <input
                        ref={btnOrder}
                        type="button"
                        className="btn btn-primary"
                        style={{ opacity: Opacite ? 0.3 : 1 }}
                        onClick={() => {
                          if (onfonct) {
                            setQuery(
                              query(
                                collection(db, "Problems"),
                                orderBy("ProblemId", "desc") &&
                                  where("Fonctionnalite", "==", Fonctnalité)
                              )
                            );
                          } else {
                            setQuery(
                              query(
                                collection(db, "Problems"),
                                orderBy("ProblemId", "desc")
                              )
                            );
                            setOpacite(false);
                          }
                        }}
                        value={
                          i18n.language === "en"
                            ? "Newest first"
                            : i18n.language === "fr"
                            ? "Le plus récent d'abord"
                            : "جدد الى الاقدم"
                        }
                      />
                    )}
                    {Disable && (
                      <input
                        type="button"
                        className="btn btn-primary"
                        style={{ opacity: !Opacite ? 0.3 : 1 }}
                        onClick={() => {
                          if (onfonct) {
                            setQuery(
                              query(
                                collection(db, "Problems"),
                                orderBy("ProblemId", "asc") &&
                                  where("Fonctionnalite", "==", Fonctnalité)
                              )
                            );
                          } else {
                            setQuery(
                              query(
                                collection(db, "Problems"),
                                orderBy("ProblemId", "asc")
                              )
                            );
                            setOpacite(true);
                          }
                        }}
                        value={
                          i18n.language === "en"
                            ? "Oldest first"
                            : i18n.language === "fr"
                            ? "Le plus ancien en premier"
                            : "الاقدم الى الجدد"
                        }
                      />
                    )}
                    <select
                      dir={
                        i18n.language === "en"
                          ? "ltr"
                          : i18n.language === "fr"
                          ? "ltr"
                          : "rtl"
                      }
                      id="browsers"
                      value={SelestValue}
                      onChange={(eo) => {
                        if (eo.target.value === "SoftWare") {
                          setQuery(
                            query(
                              collection(db, "Problems"),
                              orderBy("ProblemId", "desc") &&
                                where("ProblemType", "==", "SoftWare")
                            )
                          );
                          setSelestValue(eo.target.value);
                          setDisable(false);
                        }
                        if (eo.target.value === "HardWare") {
                          setQuery(
                            query(
                              collection(db, "Problems"),
                              orderBy("ProblemId", "desc") &&
                                where("ProblemType", "==", "HardWare")
                            )
                          );
                          setSelestValue(eo.target.value);
                          setDisable(false);
                        }
                        if (eo.target.value === "All Problems") {
                          setOpacite(true);
                          setQuery(
                            query(
                              collection(db, "Problems"),
                              orderBy("ProblemId", "asc")
                            )
                          );
                          setSelestValue(eo.target.value);
                          setDisable(true);
                        } else {
                          setDisable(false);
                          setQuery(
                            query(
                              collection(db, "Problems"),
                              orderBy("ProblemId", "asc")
                            )
                          );
                        }
                      }}
                    >
                      <option value="All Problems">
                        {i18n.language === "en"
                          ? "All Problems"
                          : i18n.language === "fr"
                          ? "Tout Mission "
                          : "جمبع المهمات "}
                      </option>
                      <option value="SoftWare">
                        {" "}
                        {i18n.language === "en"
                          ? "SoftWare"
                          : i18n.language === "fr"
                          ? "Complété"
                          : "المكتملة "}{" "}
                      </option>
                      <option value="HardWare">
                        {" "}
                        {i18n.language === "en"
                          ? "HardWare"
                          : i18n.language === "fr"
                          ? "ne Compléte pas"
                          : "غير المكتملة "}{" "}
                      </option>
                      <option value="HardWare">
                        {" "}
                        {i18n.language === "en"
                          ? "Fonctionnalite"
                          : i18n.language === "fr"
                          ? "ne Compléte pas"
                          : "غير المكتملة "}{" "}
                      </option>
                    </select>
                  </div> */}
                {/* {!Disable && (
                    <div className="Chercher">
                      <input
                        type="text"
                        className=""
                        placeholder="Chercher par Fonction"
                        onChange={(eo) => {
                          setFonctnalité(eo.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(eo) => {
                          eo.preventDefault();
                          setonfonct(true);
                          setOpacite(false);
                          setQuery(
                            query(
                              collection(db, "Problems"),
                              orderBy("ProblemId", "desc") &&
                                where("Fonctionnalite", "==", Fonctnalité)
                            )
                          );
                        }}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  )} 
                  */}
              </section>
              <Alert Val={AlertBtf}>{AlertContt}</Alert>

              <section className="Tasks">
                <div className="">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date Rendez-vous</th>
                        <th>Technicien</th>
                        <th>Type Machine</th>
                        <th>Employé</th>
                        <th>email Employé</th>
                        <th></th>
                      </tr>
                    </thead>
                    {value.docs.length !== 0 ? (
                      value.docs.map((item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{item.data().DateRendezVous}</td>
                              <td>{item.data().NameTec}</td>

                              <td>
                                <b>{item.data().Machine}</b>
                              </td>

                              <td>{item.data().NameEmp}</td>
                              <td>
                                <a href={`tel:${item.data().emailEmp}`}>
                                  {item.data().emailEmp}
                                </a>
                              </td>
                              
                              {ProblArr.docs.map((y) => {
                                if (
                                  y.data().IsSolving === "EnTraitement" &&
                                  item.data().idProblem === y.data().ProblemId
                                ) {
                                  return (
                                    <div>
                                      <td>
                                        {AdminsArr.docs.map((i) => {
                                          if (
                                            item.data().NameTec ===
                                            i.data().Name
                                          ) {
                                            return (
                                              <td style={{width:"128px",display: "flex",flexDirection: "row",justifyContent:"space-evenly"}}>
                                                <input
                                                  type="button" style={{marginRight:"7px"}}
                                                  className="btn btn-outline-success"
                                                  onClick={() => {
                                                    let a= i.data().nbSolving;
                                                    setTimeout(() => {
                                                      Confirmation(
                                                        item.data().idProblem,
                                                        item.data().NameTec,a
                                                      );
                                                      Delete(
                                                        item.data().IdPross
                                                      );
                                                    }, 2000);
                                                  }}
                                                  value="Sucess"
                                                />
                                                <input
                                                  type="button"
                                                  className="btn btn-outline-warning"
                                                  value="Faild"
                                                  onClick={() => {
                                                    let c =i.data().nbNOTSolving
                                                    setTimeout(() => {
                                                      Annulation(
                                                        item.data().idProblem,
                                                        item.data().NameTec,c
                                                      );
                                                      Delete(
                                                        item.data().IdPross
                                                      );
                                                    }, 2000);
                                                  }}
                                                />
                                              </td>
                                            );
                                          }
                                        })}
                                      </td>
                                    </div>
                                  );
                                }
                              })}

                              <td>
                                <input
                                  type="button"
                                  onClick={(eo) => {
                                    Delete(item.data().IdPross);
                                  }}
                                  className="btn btn-outline-danger"
                                  value="Supprimer"
                                />
                              </td>
                            </tr>
                          </tbody>
                        );
                      })
                    ) : (
                      <h3 style={{ color: "gold" }}>
                        {i18n.language === "en"
                          ? "There are no Techniciens"
                          : i18n.language === "fr"
                          ? "Il n'y a pas des Problem en etat 'En Traitement'"
                          : "لا يوجد تقنيين "}
                      </h3>
                    )}
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  if (error) {
    return <h2>Tu as un Errors</h2>;
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
};

export default Proccesing;
