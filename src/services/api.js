import axios from "axios";

// Base URL from environment
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ===== Auth APIs =====
export const checkUser = () => api.get("/user/checkUser");
export const signupUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post("/user/login", data);

// ===== Questions =====
export const getAllQuestions = () => api.get("/question");
export const getSingleQuestion = (question_id) =>
  api.get(`/question/${question_id}`);
export const postQuestion = (data) => api.post("/question", data);

export const updateQuestion = (question_id, data) => {
  return api.put(`/question/edit/${question_id}`, data);
};

// ===== Answers =====
export const getAnswers = (question_id) => api.get(`/answer/${question_id}`);
export const postAnswer = (data) => api.post("/answer", data);

export default api;
