import React from "react";
import { FaTrash } from "react-icons/fa"; 

function TodoItem(props){
    
    return (
        <div>
            <li>
                {props.todoItem}
                <button onClick={() => props.onDelete(props.id)}>
                    <FaTrash style={{ padding: "5px" }}/>
                </button>
            </li>
        </div>
    )
}

export default TodoItem;