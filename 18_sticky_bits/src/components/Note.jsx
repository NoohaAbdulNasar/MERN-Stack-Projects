import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';

function Note(props){

    function handleClick(){
        props.onDelete(props.id);
    }

    return (
        <div className="note">
            <button onClick={handleClick} className="deleteIcon"><CancelIcon /></button>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    )
}

export default Note;