import React, { useRef, useState } from "react";
import "./Style.css";
import { Link } from "react-router-dom";
import Loading from "../Compenent/loading";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  limit,
  where,
  deleteDoc,
  doc,
  deleteField,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { auth, db } from "../Firebase/Config";
import Footer from "Compenent/Footer";
import Header from "Compenent/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
//import 'moment-timezone';
const Admins = () => {
  //translate
  const { t, i18n } = useTranslation();
  //Acceleration de remove Des Technicien:

  //Order and etat de Completed:
  const [Query, setQuery] = useState(
    query(collection(db, "Admins"), orderBy("AdminId", "asc"))
  );
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(Query);
  const [valueV] = useCollection(Query);
  //const [AccDel, setAccDel] = useState(false);
  let IsVal = false;
  if (value) {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div className="Content">
          <h2 className="container">Admins :</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="GrandParent"
              style={{
                width: "90%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <section className="OPIONS">
                {/* <div className="Filter">
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
                )} */}
              </section>
              <section className="Tasks">
                <div className="">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>CIN</th>
                        <th>Email</th>
                        <th>Administration</th>
                        <th>Problèmes résolus</th>
                        <th>Problèmes non-résolus</th>
                        <th>Phone Number</th>
                        <th>Spécialite</th>
                        <th></th>
                      </tr>
                    </thead>
                    {valueV.docs.map((item) => {
                      if (
                        item.data().email === user.email &&
                        item.data().Type === "SuperAdmin"
                      ) {
                        IsVal = true;
                        return IsVal;
                      }
                    })}
                    {value.docs.length !== 0 ? (
                      value.docs.map((item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{item.data().Name}</td>
                              <td>{item.data().CIN}</td>
                              <td>
                                <a href={`mailto:${item.data().email}`}>
                                  {item.data().email}
                                </a>
                              </td>
                              <td>{item.data().Type}</td>
                              <td>
                                <span
                                  style={{
                                    padding: "2px 12px",
                                    color: "white",
                                    borderRadius: "50%",
                                    backgroundColor: "green",
                                  }}
                                >
                                  {item.data().nbSolving}
                                </span>
                              </td>
                              <td>
                                <span
                                  style={{
                                    padding: "2px 12px",
                                    color: "white",
                                    borderRadius: "50%",
                                    backgroundColor: "red",
                                  }}
                                >
                                  {item.data().nbNOTSolving}
                                </span>
                              </td>
                              <td>
                                <a href={`tel:${item.data().Telephone}`}>
                                  {item.data().Telephone}
                                </a>
                              </td>
                              <td>{item.data().Specialité}</td>
                              {IsVal && (
                                <td>
                                  <i
                                    className="fa-solid fa-trash fa-trash-can "
                                    onClick={async (eo) => {
                                      let id = item.data().AdminId;
                                      // eslint-disable-next-line no-restricted-globals
                                      if (
                                        // eslint-disable-next-line no-restricted-globals
                                        confirm(
                                          "Est Que tu Veux Delete Cette Technicien"
                                        )
                                      ) {
                                        await deleteDoc(
                                          doc(
                                            db,
                                            "Admins",
                                            `${item.data().Name}`
                                          )
                                        );
                                        alert("Success");
                                      }
                                    }}
                                  ></i>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        );
                      })
                    ) : (
                      <h1>
                        {i18n.language === "en"
                          ? "There are no Techniciens"
                          : i18n.language === "fr"
                          ? "Il n'y a pas des Technicien"
                          : "لا يوجد تقنيين "}
                      </h1>
                    )}
                  </table>
                </div>
              </section>
              <Link
                to="/AddNewAdmin"
                className="btn btn-primary mb-4"
              >
                Add New Admin
              </Link>
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

export default Admins;
