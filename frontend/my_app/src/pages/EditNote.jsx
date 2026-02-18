import { useParams } from "react-router-dom";

function EditNote() {
    const { id } = useParams();
    return (
        <h2>Edit Note {id}</h2>
    );
}

export default EditNote;