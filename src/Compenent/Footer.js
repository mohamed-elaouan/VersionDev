import React from "react";
import "../App.css";
import "../Compenent/Themes.css";
import { useContext } from "react";
import ThemeContext from "../Context/DataContext";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  return (
    <div className={`Pier ${theme}`}>
      <div className=" text-white">
        <p className="text-center p-4 m-0">
          {i18n.language === "ar" && <b>موقعي مطور ب رياكت و الفايربايز</b>}
          {i18n.language === "en" && <b>My Application React & Firebase </b>}
          {i18n.language === "fr" && <b>Mon Application Developpé par React et Firebase </b>}
          
        </p>
      </div>
    </div>
  );
};

export default Footer;
