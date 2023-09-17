import React, { useState } from "react";
import Header from "./Header";
import Note  from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Hero from './Hero'; 

function App(){
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        })
    }

    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header />
            <Hero />
            <div className="container">
                <h2>📌 Pin your StickyBits</h2>
                <CreateArea 
                    onAdd={addNote}
                />
                <div className="notes-container">
                    {notes.map((noteItem, index) => {
                        return <Note 
                            key={index}
                            id={index}
                            title={noteItem.title}      
                            content={noteItem.content}
                            onDelete={deleteNote}    
                        />
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App;