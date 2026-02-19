import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.email || !formData.password) return setError("Please provide email & password");
    if (!emailRegex.test(formData.email)) return setError("Invalid Email");
    if (formData.password.length < 6) return setError("Password must be at least 6 chars");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      const res = await api.post("api/signup", formData);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  
  
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Signup</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email} 
          onChange={(e) => 
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <input 
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={(e) => 
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => 
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        {!loading && <button style={styles.button} type="submit">
          Signup
        </button>}

        {loading && <button style={styles.button} type="submit">
          Signing up ...
        </button>}

      </form>

    </div>
  );
}


const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "320px",
    padding: "24px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    margin: 0,
  },
};

export default Signup;
