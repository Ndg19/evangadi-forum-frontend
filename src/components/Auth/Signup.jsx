import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { signupUser } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, first_name, last_name, email, password } = formData;

    if (!username || !first_name || !last_name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await signupUser(formData);
      alert("Signup successful! Please login.");
      navigate("/auth/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed. Try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <h1 className={styles.mainTitle}>Join the Network</h1>
        <h3 className={styles.subTitle}>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className={styles.yellowButtonSmall}
          >
            Sign In
          </button>
        </h3>

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <div className={styles.nameRow}>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password field with toggle icon */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555"
              }}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.termsSection}>
            <h3>
              I agree to the{" "}
              <button type="button" className={styles.yellowButtonSmall}>
                Privacy Policy
              </button>{" "}
              and{" "}
              <button type="button" className={styles.yellowButtonSmall}>
                Terms of Service
              </button>
            </h3>
          </div>

          <button type="submit" className={styles.blueButtonSmall}>
            Agree and Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
