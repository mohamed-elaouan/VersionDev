import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import "../Compenent/Themes.css";
import { Helmet } from "react-helmet-async";
import Loading from "../Compenent/loading";
//Call Component
import TiTle from "./TitelTask";
import OprBtn from "./OprTasks";
import Details from "./TaskDetail";

import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../Firebase/Config";
import "./TaskEdit.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import ReactLoading from "react-loading";
const EditTask = () => {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);
  const [ZoneAdd, setZoneAdd] = useState("ZoneAddHide");
  const [TaskAdd, setTaskAdd] = useState("");
  const [Completedd, setCompletedd] = useState(" ");
  
  let { id } = useParams();
  const [ShowData, setShowData] = useState(false);
  if (user && !user.emailVerified) {
    return navigate("/");
  }
  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Loading />
      </div>
    );
  }
  if (!user) {
    navigate("/SignIn");
  }
  const TitleChange = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      Title: eo.target.value,
    });
  };
  const CompletedChange = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, id), {
        Completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, id), {
        Completed: false,
      });
    }
  };
  const RemoveTask = async (eo, item) => {
    await updateDoc(doc(db, user.uid, id), {
      TasksSup: arrayRemove(item),
    });
  };
  const BtnAddMore = () => {
    setZoneAdd("ZoneAddShow");
    setTaskAdd("");
  };

  const replirTask = (eo) => {
    setTaskAdd(eo.target.value);
  };

  const AddNewTask = async () => {
    setZoneAdd("ZoneAddHide");
    const Valeu = TaskAdd;
    await updateDoc(doc(db, user.uid, id), {
      TasksSup: arrayUnion(Valeu),
    });
  };
  //Delete Task:
  const BtnDelete = async () => {
    setShowData(true);
    await deleteDoc(doc(db, user.uid, id));
    navigate("/", { replace: true });
  };

  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Task-Edit</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        {ShowData === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
              height: "69vh",
              alignItems: "center",
            }}
          >
            <ReactLoading type="spokes" color="violet" height={77} width={77} />
          </div>
        ) : (
          <main className="GrandParent">
            <TiTle
              user={user}
              db={db}
              idTask={id}
              TitleChange={TitleChange}
              Completed={Completedd}
            />
            <Details
                user={user}
                db={db}
                idTask={id}
                CompletedChange={CompletedChange}
                RemoveTask={RemoveTask}
                ZoneAdd={ZoneAdd}
                setZoneAdd={setZoneAdd}
                replirTask={replirTask}
                AddNewTask={AddNewTask}
                TaskAdd={TaskAdd}
                setTaskAdd={setTaskAdd} setCompletedd={setCompletedd}/>
            <OprBtn
              user={user}
              db={db}
              idTask={id}
              BtnAddMore={BtnAddMore}
              BtnDelete={BtnDelete}
            />
          </main>
        )}

        <Footer></Footer>
      </div>
    );
  }
};

export default EditTask;
