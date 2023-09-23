import React, { useRef, useState } from "react";
import "./Style.css";
import Model from "../Shared/Model";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

import emailJs from "emailjs-com";
import Alert from "Shared/Alert";
//import 'moment-timezone';
const Problems = ({ user, db }) => {
  //translate
  const { i18n } = useTranslation();
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

  const [SelestValue, setSelestValue] = useState("All Task");
  const btnOrder = useRef(null);
  const [Disable, setDisable] = useState(true);
  const [Opacite, setOpacite] = useState(false);
  const [Fonctnalité, setFonctnalité] = useState("");
  const [onfonct, setonfonct] = useState(false);
  //Order and etat de Completed:
  const [Query, setQuery] = useState(
    query(collection(db, "Problems"), orderBy("ProblemId", "desc"))
  );
  const [Tec] = useCollection(query(collection(db, "Admins")));
  const ClearModel = () => {};
  const [value, loading, error] = useCollection(Query);
  //Model Rendez-Vous
  const [ModelShow, setModelShow] = useState(false);
  // @ts-ignore
  const [idU, setidU] = useState("");
  const [DateR, setDateR] = useState(new Date().toJSON().slice(0, 10));
  //id => idU
  //name employéé
  const [NameEmp, setNameEmp] = useState("");
  //machine
  const [Machine, setMachine] = useState("");
  //Fonctionnalité
  const [fct, setfct] = useState("");
  //email
  const [email, setemail] = useState();
  //email technien
  const [emailTec, setemailTec] = useState("");
  //imgURL
  const [imgURL, setimgURL] = useState("");
  const AddRendezVous = async (
    DateRendezVous,
    idProblem,
    emailEmp,
    NameTec,
    NameEmp,
    Machine
  ) => {
    const Rendezid = new Date().getTime();
    await setDoc(doc(db, "RendezVous", `${Rendezid}`), {
      DateRendezVous: DateRendezVous,
      IdPross: Rendezid,
      idProblem: idProblem,
      emailEmp: emailEmp,
      NameTec: NameTec,
      NameEmp: NameEmp,
      Machine: Machine,
    });
  };
  const [NameTec, setNameTec] = useState("");

  const SendEmployée = (eo) => {
    emailJs
      .sendForm(
        "service_e7b901c",
        "template_7ugvzqt",
        eo.target,
        "DQZtHh_7jpbD06QVk"
      )
      .then(
        (result) => {
          console.log("success");
        },
        (error) => {}
      );
  };

  const TecEmailForm = (eo) => {
    emailJs
      .sendForm(
        "service_e7b901c",
        "template_3xrg8l4",
        eo.target,
        "DQZtHh_7jpbD06QVk"
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
              Success Enyoyé Email
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
  const enTraitement = async (idU) => {
    let idd = String(idU);
    await updateDoc(doc(db, "Problems", idd), {
      IsSolving: "EnTraitement",
    });
  };
  const Del = async (idd) => {
    let id = String(idd);
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Est-ce Que Tu veux Delete Cette Probllem")) {
      await deleteDoc(doc(db, "Problems", id));
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
  const [defSelect, setdefSelect] = useState("");
  const ClearInputModel = () => {
    setDateR(new Date().toJSON().slice(0, 10));
    setdefSelect("");
  };
  const [SolvingEtat, setSolvingEtat] = useState("");
  if (value) {
    return (
      <div className="GrandParent">
        <section className="OPIONS">
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
                      where("ProblemType", "==", "HardWare")
                    )
                  );
                  setSelestValue(eo.target.value);
                  setDisable(false);
                }
                if (eo.target.value === "All Problems") {
                  setOpacite(false);
                  setQuery(
                    query(
                      collection(db, "Problems"),
                      orderBy("ProblemId", "desc")
                    )
                  );
                  setSelestValue(eo.target.value);
                  setDisable(true);
                }
                if (eo.target.value === "Fonctionnalite") {
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
              <option value="Fonctionnalite">
                {" "}
                {i18n.language === "en"
                  ? "Fonctionnalite"
                  : i18n.language === "fr"
                  ? "ne Compléte pas"
                  : "غير المكتملة "}{" "}
              </option>
            </select>
          </div>
          {!Disable && (
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
        </section>
        {ModelShow && (
          <Model close={setModelShow} ClearModel={ClearModel}>
            {SolvingEtat === "false" && (
              <div className="">
                <h4>Rendez-Vous Pour Resoudre Problem</h4>
                <form
                  action=""
                  onSubmit={(eo) => {
                    eo.preventDefault();
                    enTraitement(idU);
                    AddRendezVous(DateR, idU, email, NameTec, NameEmp, Machine);
                    //email employe
                    SendEmployée(eo);
                    setTimeout(() => {
                      //email Tehcnicien
                      TecEmailForm(eo);
                      setModelShow(false);
                    }, 1000);
                    setTimeout(() => {}, 1500);
                  }}
                >
                  {/* Date RendezVous */}
                  <input
                    type="date"
                    className="txt"
                    name="DateRendezVous"
                    width={"60%"}
                    //new Date().toJSON().slice(0, 10) -----> get date Today .
                    defaultValue={DateR}
                    onChange={(eo) => {
                      setDateR(eo.target.value);
                    }}
                    required
                  />
                  {/* ImageURL */}
                  <input
                    type="text"
                    hidden
                    name="imgURL"
                    defaultValue={imgURL}
                    id=""
                  />

                  <label htmlFor="">Technicien qui Capable :</label>
                  {/* Name Technicien */}
                  <select
                    name="Name"
                    required
                    className="txt form-select"
                    id=""
                    defaultValue={defSelect}
                    onChange={(eo) => {
                      setNameTec(eo.target.value);
                      // eslint-disable-next-line array-callback-return
                      Tec.docs.forEach((pp) => {
                        if (eo.target.value === pp.data().Name) {
                          return setemailTec(pp.data().email);
                        }
                      });
                    }}
                  >
                    <option value="" hidden>
                      {" "}
                      Choisir Technicien
                    </option>
                    {Tec &&
                      Tec.docs.map((ele, e) => {
                        return (
                          <option key={e} defaultValue={ele.data().Name}>
                            {ele.data().Name}
                          </option>
                        );
                      })}
                  </select>
                  {/* email Employer */}
                  <input
                    type="email"
                    hidden
                    name="emailEmpl"
                    className="txt"
                    defaultValue={email}
                  />
                  {/* email technicien */}
                  <input
                    type="email"
                    hidden
                    name="EmailTechnicien"
                    className="txt"
                    defaultValue={emailTec}
                  />
                  {/* Fontionnalité */}
                  <input
                    type="text"
                    defaultValue={fct}
                    hidden
                    name="fonctionnalite"
                  />
                  {/* Name Employee */}
                  <input type="text" hidden name="NameEmp" value={NameEmp} />
                  {/* Machine */}
                  <input
                    type="text"
                    hidden
                    name="Machine"
                    className="txt"
                    defaultValue={Machine}
                  />
                  <button
                    style={{ marginRight: "100px" }}
                    className="btn btn-primary"
                    onClick={() => {
                      ClearInputModel();
                    }}
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            )}
            {SolvingEtat === "EnTraitement" && (
              <div>
                <h3>
                  in process of processing{" "}
                  <i className="fa-regular fa-hourglass-half"></i>{" "}
                </h3>
              </div>
            )}
            {SolvingEtat === "true" && (
              <div>
                <h3>
                  This problem has been resolved{" "}
                  <i className="fa-solid fa-thumbs-up"></i>
                </h3>
              </div>
            )}
          </Model>
        )}
        <section className="Tasks">
          <Alert Val={AlertBtf}>{AlertContt}</Alert>
          {value.docs.length !== 0 ? (
            value.docs.map((item, i) => {
              return (
                <div className="Parent">
                  <div
                    className="Problem"
                    key={i}
                    onClick={() => {
                      setidU(item.data().ProblemId);
                      setemail(item.data().email);
                      setMachine(item.data().MachineType);
                      setSolvingEtat(item.data().IsSolving);
                      setNameEmp(item.data().ClientName);
                      setimgURL(item.data().PhoteProblem);
                      setfct(item.data().Fonctionnalite);
                    }}
                  >
                    <a
                      style={{
                        boxShadow: "0px 0px 3px 3px whitesmoke",
                        borderRadius: "5px",
                      }}
                      href={
                        item.data().PhoteProblem
                          ? item.data().PhoteProblem
                          : "https://firebasestorage.googleapis.com/v0/b/pourresoudreproblem.appspot.com/o/Screenshot%202023-08-17%20200400.png?alt=media&token=3e661cb4-dbc5-4486-8ea0-2f177b77127d"
                      }
                      target="_blank|_self|_parent|_top|framename"
                    >
                      <img
                        src={
                          item.data().PhoteProblem
                            ? item.data().PhoteProblem
                            : "https://firebasestorage.googleapis.com/v0/b/pourresoudreproblem.appspot.com/o/Screenshot%202023-08-17%20200400.png?alt=media&token=3e661cb4-dbc5-4486-8ea0-2f177b77127d"
                        }
                        className="img-thumbnail"
                        alt=""
                        width={290}
                        height={"fit-content"}
                      />
                    </a>
                    <div
                      className="information"
                      onClick={() => {
                        setModelShow(true);
                      }}
                    >
                      <h5>
                        Machine (materiale) :{" "}
                        <span
                          style={{
                            color: "gold",
                            fontWeight: "700",
                          }}
                        >
                          {item.data().MachineType}
                        </span>
                      </h5>
                      <h6>Decription :</h6>
                      <p>{item.data().Decription}</p>
                      <p className="Type">
                        <u>
                          <i>{item.data().ProblemType}</i>
                        </u>
                      </p>
                    </div>
                    <div>
                      {item.data().IsSolving === "true" && (
                        <i
                          className="fa-solid fa-trash-can fa-lg TrashPro"
                          onClick={() => {
                            Del(item.data().ProblemId);
                          }}
                        ></i>
                      )}

                      <div className="molProblem">
                        <p>
                          Name Complet : <u>{item.data().ClientName}</u>
                        </p>
                        <p>
                          Fonctionnalité
                          <b> : {item.data().Fonctionnalite}</b>
                        </p>
                        <p>
                          email :{" "}
                          <a href={`mailto:${item.data().email}`}>
                            {item.data().email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      justifyContent: "space-between",
                      paddingInline: "10px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "end",
                        color:
                          item.data().IsSolving === "true"
                            ? "green"
                            : item.data().IsSolving === "false"
                            ? "red"
                            : "gold",
                        fontWeight: "600",
                      }}
                    >
                      {item.data().IsSolving === "true" ? (
                        "Solving"
                      ) : item.data().IsSolving === "false" ? (
                        "Not Solving"
                      ) : (
                        <b>
                          En Traitement{" "}
                          <i className="fa-regular fa-hourglass-half"></i>
                        </b>
                      )}
                    </p>
                    <p
                      style={{
                        textAlign: "end",
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      '
                      <Moment trim durationFromNow>
                        {item.data().ProblemId}
                      </Moment>
                      ' ago
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>
              {i18n.language === "en"
                ? "There are no Problems"
                : i18n.language === "fr"
                ? "Il n'y a pas de Problems"
                : "لا توجد مشاكا "}
            </h1>
          )}
        </section>
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

export default Problems;
