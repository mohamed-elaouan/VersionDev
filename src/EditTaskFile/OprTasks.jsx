import { collection, doc, query } from "firebase/firestore";
import React from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import ReactLoading from "react-loading";

const OprTasks = ({ user, db ,idTask,BtnAddMore,BtnDelete }) => {
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
      <section className="flex">
        <button style={{ backgroundColor: "" }} className="btnVal " onClick={() => {
          BtnAddMore()
        }}>
          Add more <i className="fa-solid fa-plus fa-sm"></i>
        </button>
        <button
          style={{ backgroundColor: "rgb(184, 0, 0)" }}
          className="btnVal" onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Tu es Veux Delete Cette Task ??")) {
              BtnDelete();
            }
          }}
        >
          Delete Task <i className="fa-solid fa-trash fa-sm"></i>
        </button>
      </section>
    );
  }
};

export default OprTasks;
