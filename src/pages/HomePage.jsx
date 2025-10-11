import { useContext, useEffect, useState } from "react";
import Home from "../components/Home/Home";
import { AuthContext } from "../context/AuthContext";
import { getAllQuestions } from "../services/api";


const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await getAllQuestions();
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading questions...</p>;

  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return <Home currentUser={user} questions={questions} />;
};

export default HomePage;
