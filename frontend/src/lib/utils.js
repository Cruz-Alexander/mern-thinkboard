import api from "./axios";

/**
 * Format a JS Date object into a readable string
 */
export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Register a new user
 * @param {Object} userData { name, email, password }
 */
export async function registerUser(userData) {
  const res = await api.post("/auth/register", userData);
  return res.data; // typically returns { token, user }
}

/**
 * Login an existing user
 * @param {Object} credentials { email, password }
 */
export async function loginUser(credentials) {
  const res = await api.post("/auth/login", credentials);
  return res.data; // typically returns { token, user }
}

/**
 * Fetch the logged-in user's profile (if token is valid)
 */
export async function fetchUserProfile() {
  const res = await api.get("/auth/me");
  return res.data; // { id, name, email }
}
