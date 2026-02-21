import { useState, useEffect } from "react";
import api from "../utils/axios";

function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/api/users', { withCredentials: true });
                console.log(res.data);
                setUsers(res.data.data);
            } catch (err) {
                console.error("Failed to load users");
            }
        }

        fetchUsers();
    }, []);

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
                    <button style={styles.btn}>
                        View
                    </button>
                    <button
                        style={{ ...styles.btn, ...styles.danger }}
                        onClick={() => handleDelete(user.id)}
                    >
                        Delete
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    padding: "6px 10px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  danger: {
    background: "#ff4d4f",
    color: "#fff",
  },
};



export default AdminPanel;