import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo, editTodo, deleteTodo } from "../features/actions";
import "./Todo.css"

export const Todo = () => {
  const [text, setText] = useState("");

  const todos = useSelector((state)=>state.todos)

  useEffect(() => {
    getTodos();
  }, []);

  const dispatch = useDispatch();

  const addTodos = () => {
    if(text.length === 0) {
      alert('Please enter something !!')
    }else{
      fetch("http://localhost:3002/todos", {
        method: "POST",
        body: JSON.stringify({ status: false, title: text }),
        headers: { "Content-Type": "application/json" },
      })
        .then((d) => d.json())
        .then((res) => {
          dispatch(addTodo(res));
          getTodos();
          setText("");
          alert("Task added successfully")
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };

  const editTodos = (id,status) => {
    let toggleStatus; 
  if(status) {
    toggleStatus =false;
  }else {
    toggleStatus =true;
  }
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({status:toggleStatus}),
      headers: { "Content-Type": "application/json" },
    })
      .then((d) => d.json())
      .then(res => {
        dispatch(editTodo(res));
             getTodos();
             alert("Task updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodos = (id) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "Delete",
    })
        getTodos();
        alert("Task deleted successfully !!")
     };

  const getTodos = () => {
    try {
      fetch("http://localhost:3002/todos")
        .then((d) => d.json())
        .then((data) => {
          dispatch(getTodo(data));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div id="inputDiv">

      <input
      id="input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter Todo"
      />
      <button id="addBtn" onClick={addTodos}>Add Todo</button>
      </div>

   <div className="listDiv">
   {todos.map((e , i) => {
        return (
          <div className="todoDiv" key={i}>
            <p className="task">✨ {e.title} </p> 
            <div className="btnDiv">
            <button onClick={() => {editTodos(e.id,e.status)}}>{(e.status === false ? "Not Done" : "Done")}</button> 
             <button onClick={() => {deleteTodos(e.id)}}>Delete</button>
            </div>
            
          </div>
          
        );
      })}
   </div>
    </div>
  );
};
