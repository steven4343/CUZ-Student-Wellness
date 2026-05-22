const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export const auth = {
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (email, password, full_name, student_id) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, full_name, student_id }),
    }),
  guest: () =>
    request("/auth/guest", { method: "POST" }),
  me: () => request("/auth/me"),
};
