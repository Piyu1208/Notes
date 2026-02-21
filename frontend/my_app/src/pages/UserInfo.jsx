import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";

function UserInfo() {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get(`/api/admin/notes/${id}`);
                setNotes(res.data.data);
            } catch (err) {
                console.error("Failed to get notes");
            }
        }

        const fetchUser = async () => {
            try {
                const res = await api.get(`/api/users/${id}`);
                setUser(res.data.data);
            } catch (err) {
                console.error('Failed to fetch user');
            }
        }

        fetchNotes();
        fetchUser();
    }, []);


    const handleRoleUpdate = async (id) => {
        if (!window.confirm("Update user role?")) return;

        try {
            const res = await api.patch(`/api/users/${id}`, user);
            console.log(res.data);
            navigate('/admin');
        } catch (err) {
            console.error("Failed to update role");
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Permanently delete this note?")) return;

        try {
            await api.delete(`/api/admin/notes/${id}`);
            setNotes((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Failed to delete note");
        }
    };


    return (
        <>
            {user && (
                <div style={styles.userBox}>
                    <p><strong>Email:</strong> {user.email}</p>

                    <div style={styles.roleRow}>
                        <label>Role:</label>
                        <select 
                            value={user.role}
                            onChange={(e) =>
                                setUser({ ...user, role: e.target.value })
                            }
                            style={styles.select}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <button style={styles.btn} onClick={() => handleRoleUpdate(user.id)}>
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.container}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tr}>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note) => (
                            <tr key={note.id} style={styles.tr}>
                                <td style={styles.td}>{note.title}</td>
                                <td
                                    style={{
                                        ...styles.td,
                                        color: note.is_archived ? "#ff4d4f" : "#52c41a",
                                    }}
                                >
                                    {note.is_archived ? "Archived" : "Active"}
                                </td>
                                <td style={styles.td}>
                                    <button
                                        style={{...styles.btn, ...styles.danger}}
                                        onClick={() => handleDelete(note.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    );
};


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
  userBox: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "16px",
    background: "#fff",
    borderRadius: "8px",
  },
  roleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  select: {
    padding: "6px",
    borderRadius: "4px",
  },
};


export default UserInfo;