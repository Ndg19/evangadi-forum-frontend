import { FaUserCircle, FaChevronRight } from "react-icons/fa";
import styles from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import EditQuestion from "./EditQuestion";

const Question = ({ question }) => {
  const navigate = useNavigate();

  // Resolve id (some code uses `id`, others `question_id`)
  const id = question?.question_id || question?.id;

  const handleClick = () => {
    if (!id) return;
    navigate(`/answer/${id}`); //  Go to Answer Page
  };

  // Resolve username from several possible shapes the API may return
  const username =
    question?.username ||
    question?.user?.username ||
    question?.user_name ||
    "Anonymous";

  // Resolve avatar from possible locations
  const avatar = question?.user?.avatar || question?.user_avatar || null;

  return (
    <div className={styles.card} onClick={handleClick} role="button">
      <div className={styles.left}>
        <div className={styles.userinfo}>
          {avatar ? (
            <img src={avatar} alt={username} className={styles.avatar} />
          ) : (
            <FaUserCircle className={styles.avatar} />
          )}
          <p className={styles.username}>{username}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.title}>{question?.title}</p>
        </div>
      </div>
      <FaChevronRight className={styles.arrow} />
    </div>
  );
};

export default Question;
