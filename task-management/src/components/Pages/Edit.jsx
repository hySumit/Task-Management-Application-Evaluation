import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  id: "",
  title: "",
  date: "",
  description: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export const Edit = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id, title, date, description } = state;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleTodoSelect = (todo) => {
    setSelectedTodo(todo);
    dispatch({ type: "SET_ID", payload: todo.id });
    dispatch({ type: "SET_TITLE", payload: todo.title });
    dispatch({ type: "SET_DATE", payload: todo.date });
    dispatch({ type: "SET_DESCRIPTION", payload: todo.description });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedTodo = {
      title,
      date,
      description,
    };

    try {
      await axios.put(`http://localhost:8080/todos/${id}`, updatedTodo);
      dispatch({ type: "RESET_FORM" });
      setSelectedTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      setSelectedTodo(null);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
      <div>
        <h3>Select Todo to Edit:</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} onClick={() => handleTodoSelect(todo)}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
      {selectedTodo && (
        <form onSubmit={handleEdit}>
          <label>Title</label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            placeholder="Enter Title"
          />

          <label>Description</label>
          <input
            required
            type="text"
            value={description}
            onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
            placeholder="Enter Description"
          />

          <label>Date</label>
          <input
            required
            type="date"
            value={date}
            onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })}
            placeholder="Complete it by the date"
          />

          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
      )}
    </div>
  );
};
