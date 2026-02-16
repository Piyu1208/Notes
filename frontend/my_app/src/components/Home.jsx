import { useState } from 'react';

function Home() {
    const [notes, setNotes] = useState([
        { id: 1, title: 'My note', body: 'content'}
    ]);


    return (
        <div className="home">
        {notes.map((note) => (
            <div className="note-preview" key={note.id}>
            <h2>{note.title}</h2>
            <p>
                {`Updated at: now`}
            </p>
            </div>
        ))}
        </div>
    );
}

export default Home;