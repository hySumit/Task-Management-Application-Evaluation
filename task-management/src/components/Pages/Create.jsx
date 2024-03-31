import React, { useReducer } from "react";
import axios from "axios";

const initialState = {
  title: "",
  date: "",
  // time: "",
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
   
    case "SET_DES":
      return { ...state, description: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "RESET_FORM":
      return { ...state, title: "", date: "", time: "" };
    default:
      return state;
  }
};

export const Create = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { title, date, description, todos } = state;

  const handleClick = async (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      date,
      description,
      status: false,
    };

    try {
      const res = await axios.post("http://localhost:8080/todos", newTodo);
      dispatch({ type: "ADD_TODO", payload: res.data });
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <label> Task </label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
          placeholder="Enter Your Task"
        />
        <label> Description </label>
        <input
          required
          type="text"
          value={description}
          onChange={(e) => dispatch({ type: "SET_DES", payload: e.target.value })}
          placeholder="Enter Description"
        />


        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => dispatch({ type: "SET_DATE", payload: e.target.value })}
          placeholder="Complete it by the date"
        />

        <button type="submit " className="bg-[#8059FC] p-[10px]" >Create a new Task</button>
      </form>
    </div>
  );
};
