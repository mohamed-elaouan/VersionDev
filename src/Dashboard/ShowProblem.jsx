import "../App.css";
import "../Compenent/Themes.css";
import Header from "../Compenent/Header";
import Footer from "../Compenent/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Problem from "./Problems";
import { auth, db } from "../Firebase/Config";
import Loading from "../Compenent/loading";
import { useAuthState } from "react-firebase-hooks/auth";
function ShowProblem() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  // useEffect(() => {
  //   if (user) {
  //     alert("Loading,uk");
  //   }else{
  //     alert("Loading,Sortie");
  //     navigate("/");
  //   }
  // }, [user]);
  if (user) {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div className="Content">
          <h2 className="container">Dashboard :</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Problem user={user} db={db} />
            <br />

            <a className="btn btn-primary mb-4" href="/Admins">
              List Admin
            </a>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
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
  if (!user || error) {
    return navigate("/");
  }
}

export default ShowProblem;
