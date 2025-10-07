import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import About from "../components/About/About";
import QuestionPage from "../pages/QuestionPage";
import AnswerPage from "../pages/AnswerPage";
import { AuthContext } from "../context/AuthContext";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "40vh" }}>
        <div className="spinner" />
        Checking authentication...
      </div>
    );

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home (protected) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Question */}
        <Route
          path="/question/:question_id"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />

        {/*  Fixed Answer Page Route */}
        <Route
          path="/answer/:question_id"
          element={
            <ProtectedRoute>
              <AnswerPage />
            </ProtectedRoute>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
