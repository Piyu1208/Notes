import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

function AdminPanel() {
    const { user: currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get(`/api/users?page=${page}&limit=${limit}`);
                setUsers(res.data.data);
                const total = res.data.total;
                setTotalPages(Math.ceil(total / limit));
            } catch (err) {
                console.error("Failed to load users");
            }
        }

        fetchUsers();
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete user?")) return;

        try {
            await api.delete(`/api/users/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (error) {
            console.error('Failed to delete user');
        }
    };


    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Users</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td style={styles.td}>
                    <button
                       style={styles.btn}
                       onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                        View
                    </button>
                    <button
                        style={{
                           ...styles.btn, 
                           ...styles.danger,
                           ...(currentUser?.id === user.id && styles.disabled),
                          }}
                        disabled={currentUser?.id === user.id}
                        onClick={() => handleDelete(user.id)}
                    >
                        Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span style={styles.pageInfo}>Page {page}</span>

          <button 
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
}


const styles = {
  container: {
    maxWidth: "900px",
    margin: "10px auto",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  tr: {
    cursor: "pointer",
  },
  btn: {
    marginRight: "8px",
  },
  danger: {
    background: "#ff4d4f",
    color: "#fff",
  },
  disabled: {
    opacity: 0.2,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "20px",
  },
  pageInfo: {
    fontWeight: "500",
  },
};



export default AdminPanel;