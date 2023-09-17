import React, {useState} from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";

function App() {

  const [items, setItems] = useState([]);

  function addItem(inputText){
    setItems((prevItems)=> [...prevItems, inputText]);
  }

  function deleteItem(id){
    setItems((prevItems) => {
      return prevItems.filter(
        (item, index) => {
          return index !== id
        }
      )
    })
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div>
        <InputArea 
          onClick = {addItem}
        />
      </div>
      <div>
        <ul>
          {items.map((item, index)=> 
            <TodoItem 
              key = {index}
              id = {index} 
              todoItem = {item}
              onDelete = {deleteItem}
            /> 
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
