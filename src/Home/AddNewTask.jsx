import "../i18n";
import ReactLoading from "react-loading";
import ModalFrgPss from "../Shared/Model.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
const AddNewTask = ({
  Addbtn,
  Detailtxt,
  Tiltetxt,
  SubBtn,
  setFrgPsw,
  Title,
  taskText,
  TaskArray,
  LodingAnimate,
  ClearModel,
}) => {
  const { t, i18n } = useTranslation();
  
  
  return (
    <div>
      <ModalFrgPss close={setFrgPsw} ClearModel={ClearModel}>
        <form className="addTask">
          <h3 style={{ textAlign: "center" }}>{i18n.language === "en" ? "Add New Task" : i18n.language === "fr"?"Ajouter Nouvelle Mission":"اضافة مهمة جديدة"}</h3>

          <input
            required
            onChange={(eo) => {
              Tiltetxt(eo);
            }}
            className="txt"
            type="text"
            value={Title} dir={i18n.language === "en"  ? "ltr" : i18n.language === "fr"?"ltr":"rtl"}
            style={{ width: "350px" }}
            placeholder={i18n.language === "en"  ? "Enter your Email" : i18n.language === "fr"?"Saisie ton Email":"ادخل بريدك الالكتروني"}
          />
          <div className="col" dir={i18n.language === "en"  ? "ltr" : i18n.language === "fr"?"ltr":"rtl"}>
            <input
              className="txt" 
              type="text"
              id="tasktxt"
              onChange={(eo) => {
                Detailtxt(eo);
              }}
              style={{ width: "300px" }}
              placeholder={i18n.language === "en" ? "Tasks ...." : i18n.language === "fr"?"Mission ....":"المهمات ....."}
              value={taskText}
            />{" "}
            <button
              onClick={(eo) => {
                Addbtn(eo);
              }}
              className="btn btn-success"
            >
              {i18n.language === "en" ? "Add" : i18n.language === "fr"?"Ajouter":"اضافة"}
            </button>
          </div>
          <ul style={{ textAlign: "start" }} dir={i18n.language === "en"  ? "ltr" : i18n.language === "fr"?"ltr":"rtl"}>
            {TaskArray.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          {/*Submit Add Data to Datbase : */}
          <button
            type="submit"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "22px",
            }}
            onClick={(eo) => {
              SubBtn(eo);
            }}
            className="btn btn-success"
          >
            {LodingAnimate === true ? (
              <ReactLoading type="spokes" color="gold" height={25} width={25} />
            ) : (
              i18n.language === "en" ? "Validate" : i18n.language === "fr"?"Valider":"تاكيد"
            )}
          </button>
        </form>
      </ModalFrgPss>
    </div>
  );
};

export default AddNewTask;
