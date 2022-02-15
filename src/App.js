import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [apiData, setApiData] = useState([]);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [
        {
          text: "",
          isEdit: false,
          isCompleted: false,
        },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, newValue]);

  useEffect(() => {
    if (buttonClick) {
      const apiData = axios.get(
        "https://newsapi.org/v2/everything?q=tesla&from=2022-01-15&sortBy=publishedAt&apiKey=97b9c873df4244b289358dda55781776"
      );
      apiData.then((response) => {
        console.log(response.data.articles, "response");

        const newAscendingSortedCreated = response?.data?.articles.sort(
          (a, b) => {
            return 1 * a["title"].toString().localeCompare(b["title"].toString());
            // return 1 * a["title"].toString().localCompare(b["title".toString].toLowercase());
          }
        );
        console.log(newAscendingSortedCreated, "newAscendingSortedCreated");
        setApiData(newAscendingSortedCreated);
      });
    }
  }, [buttonClick]);

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
    const savedTodos = localStorage.getItem("todos");
    console.log(savedTodos, "savedTodos");
    setTodos((prevState) => [
      ...prevState,
      { text: newValue, isCompleted: false, isEdit: false },
    ]);
  };

  const handleNewVal = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 5, border: "1px solid black" }}>
        <div style={{ display: "flex" }}>
          {" "}
          <ul style={{ display: "flex", flexDirection: "column" }}>
            {todos.map((todo, index) => {
              return (
                <li style={{ flex: 4 }}>
                  {todo.isEdit ? (
                    <>
                      <input
                        type="text"
                        value={newValue}
                        placeholder="Enter the value!!"
                        onChange={(e) => handleNewVal(e)}
                      />
                      <button onClick={() => handleFinishEdit(todo)}>
                        done
                      </button>
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
                      <button
                        style={{ flex: 2 }}
                        onClick={() => handleCompleteTodo(index)}
                      >
                        Complete
                      </button>
                      <button
                        style={{ flex: 2 }}
                        onClick={() => handleEditTodo(index)}
                      >
                        Edit
                      </button>

                      <button
                        style={{ flex: 2 }}
                        onClick={() => handleRemoveTodo(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
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

      <div style={{ flex: 5 }}>
        <button onClick={() => setButtonClick(true)}>
          {" "}
          Click to make the api call
        </button>
        <div style={{ width: "100%" }}>
          {apiData.map((item) => {
            return (
              <>
                <img width="100px" src={item.urlToImage} />
                <div>{item.title}</div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
