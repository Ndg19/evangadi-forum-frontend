import { useContext, useEffect, useState } from "react";
import Home from "../components/Home/Home";
import { AuthContext } from "../context/AuthContext";
import { getAllQuestions } from "../services/api";

const HomePage = () => {
  const { user } = useContext(AuthContext); // current user
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  // Fetch questions once
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getAllQuestions();
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again later.");
      }
    };
    fetchQuestions();
  }, []);

  return (
    <Home
      currentUser={user}
      questions={questions}
      error={error} // pass error to Home for display
    />
  );
};

export default HomePage;
