import { useState, useEffect } from "react";
import api from '../utils/axios.js';
import { useNavigate } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get("/api/notes");
                setNotes(res.data.data);
            } catch (err) {
                console.error("Failed to load notes");
            }
        }

        fetchTasks();
    }, []);

    return (
        <div style={styles.container}>
            <h2>Your Notes</h2>

            {notes.length === 0 ? (
                <p>No notes yet</p>
            ) : (
                <div style={styles.grid}>
                    {notes.map((note) => (
                        <div 
                            key={note.id}
                            style={styles.card}
                            onClick={() => navigate(`/notes/${note.id}`)}
                            >
                            <h4>{note.title}</h4>
                            <small>{formatDate(note.updated_at)}</small>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

const styles = {
  container: {
    padding: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
  },
};

export default Home;