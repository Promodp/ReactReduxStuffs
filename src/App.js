import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: "",
      isEdit: false,
      isCompleted: false,
    },
  ]);

  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleCompleteTodo = (receivedIndex) => {
    const updatedData = todos.map((i, index) => {
      if (index === receivedIndex) {
        i.isCompleted = true;
      }
      return i;
    });
    setTodos(updatedData);
  };

  const handleEditTodo = (receivedIndex) => {
    const updatedData = todos.map((i, index) => {
      if (index === receivedIndex) {
        i.isEdit = true;
      }
      return i;
    });
    updatedData.map((i, index) => {
      if (index === receivedIndex) {
        setNewValue(i.text);
      }
    });
    setTodos(updatedData);
  };

  const handleRemoveTodo = (receivedIndex) => {
    const updatedData = todos.filter((data, index) => {
      return index !== receivedIndex;
    });
    setTodos(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    setTodos((prevState) => [
      ...prevState,
      { text: value, isCompleted: false, isEdit: false },
    ]);
    setValue("");
  };
  
  const handleFinishEdit = (todo) => {
    setTodos((prevState) => [
      ...prevState,
      { text: newValue, isCompleted: false, isEdit: false },
    ]);
  };

  const handleNewVal = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li>
                {todo.isEdit ? (
                  <>
                    <input
                      type="text"
                      value={newValue}
                      placeholder="Enter the value!!"
                      onChange={(e) => handleNewVal(e)}
                    />
                    <button onClick={() => handleFinishEdit(todo)}>done</button>
                  </>
                ) : (
                  <span
                    style={{
                      textDecoration: todo.isCompleted ? "line-through" : "",
                    }}
                  >
                    {todo.text}
                  </span>
                )}
                {todo.text && (
                  <>
                    <button onClick={() => handleCompleteTodo(index)}>
                      Complete
                    </button>
                    <button onClick={() => handleEditTodo(index)}>Edit</button>

                    <button onClick={() => handleRemoveTodo(index)}>Delete</button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={value}
              placeholder="Enter the value!!"
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </>
      </div>
    </div>
  );
};

export default App;
