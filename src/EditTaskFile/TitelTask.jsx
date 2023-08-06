import { collection, doc, query, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import ReactLoading from "react-loading";

const TitelTask = ({ user, db,idTask , TitleChange,Completed}) => {
  // const [value, loading, error] = useCollection(
  //   query(collection(db, user.uid))
  // );
  const [value, loading, error] = useDocument(doc(db, user.uid, idTask));
  const element = useRef(null);
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
      <section className="TitleTask">
        <input type="text" ref={element} onChange={ (eo) => {
          TitleChange(eo);
        }} className={`TaskNom ${Completed}`} defaultValue={value.data().Title} />
        <i onClick={() => {
          element.current.focus();
        }} className="fa-solid fa-pen-to-square fa-xl"></i>
      </section>
    );
  }
};

export default TitelTask;
