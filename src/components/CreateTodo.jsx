import React, { useState, useEffect } from 'react';
import Todolist from './Todolist';
import swal from "sweetalert";

const CreateTodo = () => {
  const [todo, setTodo] = useState({ title: "", done: false });
  const [todoArr, setTodoArr] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const todosFromStorage = localStorage.getItem("todos");
    if (todosFromStorage) {
      setTodoArr(JSON.parse(todosFromStorage));
    }
  }, []);

  const onChange = (event) => {
    const { value } = event.target;
    setTodo({ title: value, done: false });
  };

  const createTodo = (event) => {
    const { name } = event.target;
    if (event.key === "Enter" || name === "addTodo") {
      if (todo.title !== "") {
        const newTodos = [{ ...todo, id: Date.now() }, ...todoArr]; // Add unique id
        setTodoArr(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodo({ title: "", done: false });
        swal("Good Job!", "Todo added", "success");
      } else {
        swal("Oops", "Please write todo first", "error");
      }
    }
  };

  const completeTodo = (id) => {
    const updatedTodos = todoArr.map((item) => 
      item.id === id ? { ...item, done: true } : item
    );
    setTodoArr(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    swal("Good Job!", "Todo completed", "success");
  };

const deleteTodo =(i) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    button: true,
    dangerMode: true
  }).then(res => {
    if(res) {
      const updatedTodos = todoArr.filter((item) => item.id !== i);
      setTodoArr(updatedTodos);
      localStorage.setItem('todos',JSON.stringify(updatedTodos));
      swal("Proof!", "Your todo has been deleted","success" );  
    }
  })
}

  return (
    <div className='box'>
      <div className='text-end'>
        <h2>React Todo App</h2>
        <h4>Add a new Todo</h4>
      </div>
      <div className='text-addTodo'>
        <input 
          type='text' 
          name='todo' 
          placeholder='Write here....' 
          onChange={onChange} 
          value={todo.title} 
          onKeyPress={createTodo}
        />
        <button className='btn-addTodo' type='button' name='addTodo' onClick={createTodo}> 
          Add Todo 
        </button>
      </div>
      <Todolist todoArr={todoArr} completeTodo={completeTodo} 
      deleteTodo={deleteTodo} />
    </div>
  );
}

export default CreateTodo;


