import { collection, doc, query, updateDoc } from "firebase/firestore";
import React from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import ReactLoading from "react-loading";
import Moment from "react-moment";

const TaskDetail = ({
  user,
  db,
  idTask,
  TaskAdd,
  setTaskAdd,
  AddNewTask,
  CompletedChange,
  replirTask,
  RemoveTask,
  ZoneAdd,
  setZoneAdd,
  setCompletedd,
}) => {
  // const [value, loading, error] = useCollection(
  //   query(collection(db, user.uid))
  // );
  const [value, loading, error] = useDocument(doc(db, user.uid, idTask));
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
  if (value) {
    return (
      <section className="parentTasks">
        {value.data().Completed
          ? setCompletedd("IsCompleted")
          : setCompletedd("")}
        <div className="headTable">
          <p>
            Created:{" "}
            <b>
              <Moment fromNow>{value.data().Id}</Moment>
            </b>
          </p>

          <span style={{ marginTop: "3px" }}>
            <input
              type="checkbox"
              onChange={(eo) => {
                CompletedChange(eo);
              }}
              defaultChecked={value.data().Completed ? true : false}
              name=""
              id="chek"
            />
            <label
              htmlFor="Completed"
              style={{ position: "relative", bottom: "3px", marginLeft: "3px" }}
            >
              Completed
            </label>
          </span>
        </div>
        <article>
          {value.data().TasksSup.map((item) => {
            return (
              <div className="Task " key={item}>
                {/* <input
                  type="text"
                  defaultValue={item}
                  className="TaskNomLigne"/> */}
                <p className="TaskNomLigne">{item}</p>
                <i
                  className="fa-regular fa-trash-can "
                  onClick={(eo) => {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("Est ce que tu Sure pour delete cette Task")) {
                      RemoveTask(eo, item);
                    }
                  }}
                ></i>
              </div>
            );
          })}


          <form className={`Task ${ZoneAdd}`}>
            <input
              type="text"
              onChange={(eo) => {
                replirTask(eo);
              }}
              value={TaskAdd}
              className="TaskNomLigne"
            />

            {/* Add button */}
            <input
              type="submit"
              className="btn btn-primary"
              defaultValue={"Add"}
              onClick={(eo) => {
                eo.preventDefault();
                setTaskAdd("");
                AddNewTask();
              }}
            />

            <input
              type="button"
              className="btn btn-danger"
              defaultValue={"Annuler"}
              onClick={(eo) => {
                eo.preventDefault();
                setZoneAdd("ZoneAddHide");
              }}
            />
          </form>



        </article>
      </section>
    );
  }
};

export default TaskDetail;
