import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateQuestion } from "../../services/api";
import styles from "./EditQuestion.module.css";

const EditQuestion = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { question } = location.state || {};
  const [title, setTitle] = useState(question?.title || "");
  const [description, setDescription] = useState(question?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateQuestion(question_id, { title, description });
      alert("Question updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update question.");
    }
  };

  return (
    <div className={styles.editWrapper}>
      <h2 className={styles.editTitle}>Edit Question</h2>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Question description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
