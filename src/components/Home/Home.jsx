import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = ({ currentUser, questions, error }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter questions
  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.homeWrapper}>
      {/* Top bar */}
      <div className={styles.topRow}>
        <button
          className={styles.askButton}
          onClick={() =>
            currentUser ? navigate("/question/post") : navigate("/auth/login")
          }
        >
          Ask Question
        </button>
        <div className={styles.welcomeText}>
          Welcome, {currentUser?.first_name || currentUser?.username || "Guest"}
        </div>
      </div>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Questions list */}
      <section className={styles.usersSection}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
            
              key={q.question_id}
              className={styles.userRow}
              onClick={() => navigate(`/question/${q.question_id}`)}
            >
              <div className={styles.userInfo}>
                <img
                  src={q.user?.avatar || "/default-avatar.png"}
                  alt={q.user?.first_name || q.user_name || "Anonymous"}
                  className={styles.avatar}
                />
                <span className={styles.username}>
                  {q.user?.first_name || q.user_name || "Anonymous"}
                </span>
                <span className={styles.questionPreview}>
                  {q.title.length > 50 ? q.title.slice(0, 50) + "..." : q.title}
                </span>
              </div>
              
              <button className={styles.detailButton}>&gt;</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No questions found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
