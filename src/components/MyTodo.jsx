import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { MyTodoCard } from "./MyTodoCard";
import styles from "../assets/css/TodoCard.module.css";

const MAX_NAME_LENGTH = 20;
const MAX_TITLE_LENGTH = 25;
const MAX_STACK_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 230;

const MyTodo = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  // Get user todos
  const getUserTodos = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/todo/user-todo/${id}`);
      if (data?.success) {
        setTodos(data?.userTodo.todos);
        setName(data?.userTodo.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, []);
  return (
    <>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          const shortenedDescription =
            todo?.description.length > MAX_DESCRIPTION_LENGTH
              ? todo?.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
              : todo?.description;
          const shortenedTitle =
            todo?.title.length > MAX_TITLE_LENGTH
              ? todo?.title.substring(0, MAX_TITLE_LENGTH) + "..."
              : todo?.title;
          const shortenedstack =
            todo?.stack.length > MAX_STACK_LENGTH
              ? todo?.stack.substring(0, MAX_STACK_LENGTH) + "..."
              : todo?.stack;
          const shortenedUsername =
            name.length > MAX_NAME_LENGTH
              ? name.substring(0, MAX_NAME_LENGTH) + "..."
              : name;

          return (
            <>
              <div
                className="MarginLeft5d"
                key={todo._id}>
                <MyTodoCard
                  id={todo?._id}
                  isUser={localStorage.getItem("userId") === todo?.user?._id}
                  username={shortenedUsername}
                  title={shortenedTitle}
                  stack={shortenedstack}
                  description={shortenedDescription}
                  image={todo?.image}
                  time={moment(todo.createdAt).format("ll")}
                  ago={
                    moment(todo.createdAt).isAfter(
                      moment().subtract(1, "minutes")
                    )
                      ? "just now"
                      : moment(todo.createdAt).fromNow()
                  }
                />
              </div>
            </>
          );
        })
      ) : (
        <>
          <p className={styles.todoNotCreated}>
            It seems like you haven't created a todo yet.
          </p>
        </>
      )}
    </>
  );
};

export { MyTodo };
