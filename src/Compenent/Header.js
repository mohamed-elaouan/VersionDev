import "../App.css";
import { Link, NavLink } from "react-router-dom";
import "../Compenent/Themes.css";
import { useContext, useState, useTransition } from "react";
import ThemeContext from "../Context/DataContext";
//import "./MobileScreen.css";
import { auth, db } from "../Firebase/Config";

import { limit, where, deleteDoc, doc, deleteField } from "firebase/firestore";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, CHANGE_theme } = useContext(ThemeContext);
  //translate
  const { t, i18n } = useTranslation();
  //Acce de Admin:
  const [Query, setQuery] = useState(query(collection(db, "Admins")));
  const [Val] = useCollection(Query);

  let Vall = false;

  const X = () => {
    const menu = document.querySelector(".bar");
    const nav = document.querySelector(".menu");
    menu.addEventListener("click", () => {
      menu.classList.toggle("bar-active");
      nav.classList.toggle("nav-active");
    });
  };
  const navigate = useNavigate();
  return (
    <div className="tttttt">
      <header className={`tete ${theme}`}>
        <div className="lLogo">
          <div
            className="Logo"
            onClick={() => {
              document.location.href = "/";
            }}
          >
            <a className="" href="/">
              <img src="./image-removebg-preview (2).png" alt="" />
            </a>
          </div>
          <div className="">
            <button
              onClick={() => {
                CHANGE_theme(theme === "Light" ? "Dark" : "Light");
              }}
              className={`btnTheme ${theme}`}
            >
              <i className={`fa-solid fa-sun fa-xl SUN ${theme}`}></i>
              <i className={`fa-solid fa-moon fa-xl MOON ${theme}`}></i>
            </button>
          </div>
        </div>
        <div className="lparent">
          {user && (
            <div className="">
              <NavLink className="NavLink btnNav" aria-current="page" to="/">
                {/* {t("Home")} */}
                Home
              </NavLink>
            </div>
          )}
          
          {user && (
            <div className="">
              <NavLink className="NavLink btnNav" to="/Contact">
              {/* {i18n.language === "en" ? "Contact" : i18n.language === "fr"?"Contact":"المساعدة"} */}
              Contact
              </NavLink>
            </div>
          )}
          
          {/* Language */}
          {/* <div className="">
            <div className="btnNav Langue">
              {t("Lang")}
              <ul className="ListLangue">
                <li
                  dir="rtl"
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  <span> العربية </span>{" "}
                  {i18n.language === "ar" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("fr");
                  }}
                >
                  <span>Francais</span>{" "}
                  {i18n.language === "fr" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  <span>English</span>{" "}
                  {i18n.language === "en" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
              </ul>
            </div>
          </div> */}
          {/*Sign IN/UP*/}
          {!user && (
            <div className="NotUser">
              <NavLink className="NavLink btnNav btn btn-primary" to="/SignIn">
                {i18n.language === "ar" && <span>الدخول</span>}
                {i18n.language === "en" && <span>Sign-In</span>}
                {i18n.language === "fr" && <span>Se Connection</span>}
              </NavLink>
              <NavLink className="NavLink btnNav btn btn-danger" to="/SignUp">
                {i18n.language === "ar" && <span>التسجيل</span>}
                {i18n.language === "en" && <span>Sign-Up</span>}
                {i18n.language === "fr" && <span>Register</span>}
              </NavLink>
            </div>
          )}
          {user && (
            <div className="">
              <div className="btnNav Langue">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png"
                  }
                  width={40}
                  style={{ borderRadius: "50%" }}
                  height={40}
                />
                <ul className="ListProfil">
                  <li dir="auto">
                    <Link
                      className="Pro"
                      to="/Profil"
                      style={{ textDecoration: "none" }}
                    >
                      {i18n.language === "ar" && <span>حسابي</span>}
                      {i18n.language === "en" && <span>Profile</span>}
                      {i18n.language === "fr" && <span>Profil</span>}
                    </Link>{" "}
                  </li>
                  <li dir="auto" className="bg-danger">
                    <a
                      className="Pro"
                      href="/Profil"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        signOut(auth)
                          .then(() => {
                            navigate("/");
                          })
                          .catch((error) => {
                            // An error happened.
                          });
                      }}
                    >
                      {i18n.language === "ar" && <span>الخروج</span>}
                      {i18n.language === "en" && <span>Sign-Out</span>}
                      {i18n.language === "fr" && <span>Déconnecté</span>}
                    </a>
                  </li>
                  {/* {user.email === "mohamedelaouan8@gmail.com" && (
                    <li>eeeeee</li>
                  )} */}
                  {Val &&
                    Val.docs.map((item, ind) => {
                      if (
                        item.data().email === user.email &&
                        item.data().Type === "Admin"
                      ) {
                        Vall = true;
                        return (
                          <li dir="auto" key={ind}>
                            <Link
                              className="Pro"
                              to="/ShowProblem"
                              style={{ textDecoration: "none" }}
                            >
                              {i18n.language === "ar" && <span>الادارة</span>}
                              {i18n.language === "en" && <span>Admin</span>}
                              {i18n.language === "fr" && <span>Admin</span>}
                            </Link>{" "}
                          </li>
                        );
                      }
                      if (
                        item.data().email === user.email &&
                        item.data().Type === "SuperAdmin"
                      ) {
                        Vall = true;
                        return (
                          <div key={ind}>
                            <li dir="auto">
                              <Link
                                className="Pro"
                                to="/ShowProblem"
                                style={{ textDecoration: "none" }}
                              >
                                {i18n.language === "ar" && <span>الادارة</span>}
                                {i18n.language === "en" && (
                                  <span>Super Admin</span>
                                )}
                                {i18n.language === "fr" && (
                                  <span>Super Admin</span>
                                )}
                              </Link>{" "}
                            </li>
                            <li dir="auto">
                              <Link
                                className="Pro"
                                to="/Processing"
                                style={{ textDecoration: "none" }}
                              >
                                {i18n.language === "ar" && <span>في طور المعالجة</span>}
                                {i18n.language === "en" && (
                                  <span>In Processing</span>
                                )}
                                {i18n.language === "fr" && (
                                  <span>en traitement</span>
                                )}
                              </Link>{" "}
                            </li>
                          </div>
                        );
                      }
                    })}
                  {/* {Val.docs.map((item) => {
                      if (
                        item.data().email === user.email &&
                        item.data().Type === "SuperAdmin"
                      ) {
                        Vall=true;
                        return "Salam";
                      }
                    })} */}
                  {/* {Vall && (
                    <li dir="auto">
                      <a
                        className="Pro"
                        href="/ShowProblem"
                        style={{ textDecoration: "none" }}
                      >
                        {i18n.language === "ar" && <span>الادارة</span>}
                        {i18n.language === "en" && <span>Admin</span>}
                        {i18n.language === "fr" && <span>Admin</span>}
                      </a>{" "}
                    </li>
                  )} */}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );

  // return (
  //   <header className={`tete ${theme}`}>
  //     <nav>
  //       <div
  //         className="logo"
  //         onClick={() => {
  //           document.location.href = "/";
  //         }}
  //       >
  //         <a className="" href="/">
  //           <img src="./image-removebg-preview (1).png" alt="" />
  //         </a>
  //       </div>
  //       <ul className="menu">
  //         <li>
  //         <div className="">
  //         <button
  //           onClick={() => {
  //             CHANGE_theme(theme === "Light" ? "Dark" : "Light");
  //           }}
  //           className={`btnTheme ${theme}`}
  //         >
  //           <i className={`fa-solid fa-sun fa-xl SUN ${theme}`}></i>
  //           <i className={`fa-solid fa-moon fa-xl MOON ${theme}`}></i>
  //         </button>
  //       </div>
  //         </li>
  //         <li>
  //         {user && (
  //         <div className="">
  //           <NavLink className="btnNav" aria-current="page" to="/">
  //             Home
  //           </NavLink>
  //         </div>
  //       )}
  //         </li>
  //         <li>
  //         {user && (
  //         <div className="">
  //           <NavLink className="btnNav" to="/Categorie">
  //             Categorie
  //           </NavLink>
  //         </div>
  //       )}
  //         </li>
  //         <li>
  //         {user && (
  //         <div className="">
  //           <NavLink className="btnNav" to="/Contact">
  //             Contact
  //           </NavLink>
  //         </div>
  //       )}
  //         </li>
  //         <li>
  //         {!user && (
  //         <div className="">
  //           <NavLink className="btnNav btn btn-primary" to="/SignIn">
  //             Sign In
  //           </NavLink>
  //         </div>
  //       )}
  //         </li>
  //         <li>
  //         {!user && (
  //         <div className="">
  //           <NavLink className="btnNav btn btn-danger" to="/SignUp">
  //             Sign Up
  //           </NavLink>
  //         </div>
  //       )}
  //         </li>
  //       </ul>

  //       <div
  //         className="bar"
  //         onClick={() => {
  //           X();
  //         }}
  //       >
  //         <div className="bar-1" />
  //         <div className="bar-2" />
  //         <div className="bar-3" />
  //       </div>
  //     </nav>
  //   </header>
  // );
};

export default Header;
