import React, { useState } from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

    const maxContentLength = 150; 

    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({
        title: "", 
        content: ""
    });

    function handleChange(event){
        const {name, value} = event.target;

        if (name === "content" && value.length > maxContentLength) {
            return;
        }

        setNote(prevNote =>{
            return {
                ...prevNote,
                [name] : value
            };
        });
    }

    function submitNote(event){
        props.onAdd(note);
        setNote({
            title:"",
            content:""
        })
        event.preventDefault();
    }

    function expand(){
        setExpanded(true);
    }
    return (
        <div>
            <form className="create-note">
                <input 
                    name="title" 
                    onClick={expand}
                    onChange={handleChange} 
                    value={note.title} 
                    placeholder={isExpanded ? "Title" : "Write your thought..."}
                    rows={isExpanded ? 3 : 1}

                />
                {isExpanded && <textarea 
                    name="content" 
                    onChange={handleChange}
                    value={note.content} 
                    placeholder="Content" 
                    maxLength={maxContentLength}
                     
                />}
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <PushPinIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;