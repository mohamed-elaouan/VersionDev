
import Header from "./Compenent/Header";
import Footer from "./Compenent/Footer";
import "./Compenent/Themes.css";
import { Helmet } from "react-helmet-async";
import Loading from "./Compenent/loading";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
const Contact = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  if (user && user.emailVerified) {
    return (
      <div>
        <Helmet>
          <title>Contact</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <h1>Hy Gays </h1>
        <Footer></Footer>
      </div>
    );
  }
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
};

export default Contact;
