import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/axios";

function NoteEditor() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const res = await api.patch(`api/notes/${id}`, note);
            setNote(res.data.data);
        } catch (err) {
            console.error("Failed to save");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this note?")) return;

        try {
            const res = await api.post(`/api/notes/archive/${id}`);
            navigate("/");
        } catch (err) {
            console.error("Failed to delete note");
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/api/notes/${id}`);
                setNote(res.data.data);
            } catch (err) {
                console.error("Failed to load note");
            }
        }

        fetchNote();
    }, []);

    if (!note) return <p>Loadiing...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.editor}>
                <input 
                    value={note.title} 
                    style={styles.title}
                    onChange={(e) => 
                        setNote({...note, title: e.target.value})
                    }
                />
                <textarea 
                    value={note.content}
                    rows={12}
                    style={styles.textarea}
                    onChange={(e) =>
                        setNote({...note, content: e.target.value})
                    }
                />

                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>


        </div>
    );
}


const styles = {
  container: {
    padding: "24px",
    display: "flex",
    justifyContent: "center",
  },
  editor: {
    width: "100%",
    maxWidth: "800px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    fontSize: "16px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "none",
  },
};

export default NoteEditor;