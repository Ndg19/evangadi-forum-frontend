import { useLocation } from "react-router-dom";
import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import About from "../components/About/About";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  // Determine which form to display based on the current URL
  const isSignUp = location.pathname === "/auth/signup";

  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.authContainer}>
        {/* Left: Form */}
        <div className={styles.formSide}>
          {isSignUp ? <Signup /> : <Login />}
        </div>

        {/* Right: About / Info */}
        <div className={styles.aboutSide}>
          <About />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
