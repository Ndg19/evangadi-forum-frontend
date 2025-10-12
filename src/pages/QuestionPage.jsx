import { useState, useEffect, useContext } from "react";
import styles from "./QuestionPage.module.css";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { FaArrowCircleRight } from "react-icons/fa";

const QuestionPage = () => {
  const { token } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [search] = useState({ title: "", description: "" });
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/question");
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostQuestion = async () => {
    if (!newQuestion.title.trim() || !newQuestion.description.trim()) {
      setMessage("Please enter both title and description.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await api.post("/question", newQuestion);
      setQuestions((prev) => [res.data, ...prev]);
      setNewQuestion({ title: "", description: "" });
      setMessage("Question posted successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Failed to post question.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchTitle = q.title
      ?.toLowerCase()
      .includes(search.title.toLowerCase());
    const matchDesc = q.description
      ?.toLowerCase()
      .includes(search.description.toLowerCase());
    return matchTitle && matchDesc;
  });

  return (
    <div className={styles.container}>
      {/* Steps Section */}
      <div className={styles.steps}>
        <h2>Steps To Write A Good Question.</h2>
        <ul>
          <li>
            <FaArrowCircleRight className={styles.icon} />
            Summarize your problems in a one-line-title.
          </li>
          <li>
            <FaArrowCircleRight className={styles.icon} />
            Describe your problem in more detail.
          </li>
          <li>
            <FaArrowCircleRight className={styles.icon} />
            Describe what you tried and what you expected to happen.
          </li>
          <li>
            <FaArrowCircleRight className={styles.icon} />
            Review your question and post it here.
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className={styles.form_box}>
        <h3>Post Your Question</h3>

        <input
          type="text"
          name="title"
          placeholder="Question title"
          value={newQuestion.title}
          onChange={(e) => handleChange(e, setNewQuestion)}
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Describe your question..."
          value={newQuestion.description}
          onChange={(e) => handleChange(e, setNewQuestion)}
          className={styles.textarea}
        />

        {message && <p className={styles.message}>{message}</p>}

        <button
          onClick={handlePostQuestion}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
