import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Question from "../Question/Question";

const Home = ({ currentUser, questions = [] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter questions
  const filteredQuestions = useMemo(() => {
    const q = (questions || []).filter(Boolean);
    const term = (searchTerm || "").trim().toLowerCase();
    if (!term) return q;

    return q.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const description = String(
        item?.description || item?.content || ""
      ).toLowerCase();
      const author = String(
        item?.username ||
          item?.user?.username ||
          item?.user_name ||
          item?.user?.first_name ||
          ""
      ).toLowerCase();

      return (
        title.includes(term) ||
        description.includes(term) ||
        author.includes(term)
      );
    });
  }, [questions, searchTerm]);

  // Pagination setup
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className={styles.homeWrapper}>
      {/* Top row */}
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
          <h3>Welcome : {currentUser?.username || "Guest"}</h3>
        </div>
      </div>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search questions by title, description or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Question list */}
      {paginatedQuestions.length > 0 ? (
        paginatedQuestions.map((q) => (
          <div key={q.question_id || q.id} className={styles.questionRow}>
            <div className={styles.questionContent}>
              <Question question={q} />
            </div>

            {/* Controls: Edit button + Pagination */}
            <div className={styles.questionControls}>
            {
                <button
                  className={styles.editButton}
                  onClick={() =>
                    navigate(`/question/edit/${q.question_id || q.id}`)
                  }
                >
                  Edit
                </button>
              }
            </div>
          </div>
        ))
      ) : (
        <p>No questions found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`${styles.questionControls} ${styles.pagination}`}>
          <button
            className={styles.pageNavButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={styles.pageNavButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
