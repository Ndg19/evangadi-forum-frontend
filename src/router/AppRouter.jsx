import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import About from "../components/About/About";
import QuestionPage from "../pages/QuestionPage";
import AnswerPage from "../pages/AnswerPage";
import { AuthContext } from "../context/AuthContext";
import Answer from "../components/Answer/Answer";
import HowItWorks from "../components/About/Howitworks/HowItWorks";
import { ClipLoader } from "react-spinners";
import EditQuestion from "../components/Question/EditQuestion";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <ClipLoader color="#3498db" size={60} />
        <div className="spinner" />
        Checking authentication...
      </div>
    );

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
};

// Redirect helper for legacy /question/:question_id links
const RedirectToAnswer = () => {
  const { question_id } = useParams();
  if (!question_id) return <Navigate to="/home" />;
  return <Navigate to={`/answer/${question_id}`} replace />;
};

const AppRouter = () => {
  return (
    <Router className="app-wrapper">
      <Header />
      <div className="main-content">
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
          <Route path="/detail" element={<HowItWorks />} />

          {/* Question post page (Ask Question) */}
          <Route
            path="/question/post"
            element={
              <ProtectedRoute>
                <QuestionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/edit/:question_id"
            element={
              <ProtectedRoute>
                <EditQuestion />
              </ProtectedRoute>
            }
          />

          {/* Legacy question route - redirect to answer page while preserving id */}
          <Route path="/question/:question_id" element={<RedirectToAnswer />} />
          <Route
            path="/questions/:questionId"
            element={
              <ProtectedRoute>
                <AnswerPage />
              </ProtectedRoute>
            }
          />

          {/* Answer Page (canonical) */}
          <Route
            path="/answer/:questionId"
            element={
              <ProtectedRoute>
                <AnswerPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default AppRouter;
