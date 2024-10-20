 
import React from 'react';

const Todolist = (props) => {
  const { completeTodo, deleteTodo } = props;
  let todoArr = props.todoArr.length > 0 ? props.todoArr : JSON.parse(localStorage.getItem('todos')) || [];

  return (
    <div style={{ maxHeight: "210px", overflow: "auto" }}>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {todoArr && todoArr.length > 0 ? 
          todoArr.map((el) => (
            <li key={el.id}> {/* Use a unique identifier if available */}
              <div className={el.done ? "line-through" : null}>{el.title}</div>
              <div style={{ display: "flex", justifyContent: "space-between", width: "50px" }}>
                <i 
                  className={`fa-regular fa-circle-check ${el.done ? "green" : "blue"}`} 
                  onClick={() => completeTodo(el.id)} // Call completeTodo with the todo id
                  aria-label="Complete todo"
                  title="Complete todo"
                ></i>
                <i 
                  className="fa-solid fa-delete-left" 
                  onClick={() => deleteTodo(el.id)} // Call deleteTodo with the todo id
                  aria-label="Delete todo"
                  title="Delete todo"
                ></i>
              </div>
            </li>
          )) : <li>No todos available.</li>
        }
      </ul>
    </div>
  );
}

export default Todolist;