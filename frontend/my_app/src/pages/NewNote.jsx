import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function NewNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const res = await api.post(
                "/api/notes", 
                { title, content},             
            );
            
            const id = res.data.data.id;
            navigate(`/notes/${id}`);
        } catch (err) {
            console.error("Failed to save note");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.editor}>
                <input 
                    style={styles.title}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    style={styles.textarea}
                    value={content}
                    rows={12}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handleSave}>Save</button>
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

export default NewNote;