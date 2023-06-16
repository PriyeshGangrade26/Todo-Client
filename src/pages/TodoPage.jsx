import React, { useEffect, useState } from "react";
import styles from "../assets/css/Todo.module.css";
import "../assets/css/global.css";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TodoCard } from "../components/TodoCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ExpansionPanel, {
  ExpansionPanelBody,
  ExpansionPanelHead,
} from "@fellesdatakatalog/expansion-panel";

import { MyTodo } from "../components/MyTodo";

const TodoPage = ({ CheckAuthentication }) => {
  const [userData, setUserData] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      toast.success("Successfully signed in!");
      sessionStorage.removeItem("isLoggedIn");
    }
  }, []);

  useEffect(() => {
    const postCreated = sessionStorage.getItem("postCreated");

    if (postCreated === "true") {
      toast.success("Congratulations on creating your todo!");
      sessionStorage.removeItem("postCreated");
    }
  }, []);

  useEffect(() => {
    const todoDeleted = sessionStorage.getItem("todoDeleted");

    if (todoDeleted === "true") {
      toast.success("Todo deleted!");
      sessionStorage.removeItem("todoDeleted");
    }
  }, []);

  useEffect(() => {
    const todoUpdated = sessionStorage.getItem("todoUpdated");

    if (todoUpdated === "true") {
      toast.success("Todo has just been updated with fresh content.");
      sessionStorage.removeItem("todoUpdated");
    }
  }, []);

  useEffect(() => {
    // Get the user ID from local storage
    const userId = localStorage.getItem("userId");

    // Make the Axios GET request
    axios
      // .get("http://localhost:8080/user/all-users")
      .get("https://todo-server-ek3p.onrender.com/user/all-users")
      .then((response) => {
        // Find the user with the matching ID
        const user = response.data.users.find((user) => user._id === userId);

        // Set the user data in state
        setUserData(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Get todos
  const getAllTodos = async () => {
    try {
      const { data } = await axios.get("/todo/all-todo");
      if (data?.success) {
        setTodos(data?.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTodos();
  }, []);

  const LogOut = () => {
    sethideEverything(false);
    setLoadingSpinner(true);
    setTimeout(() => {
      setLoadingSpinner(false);
      sethideEverything(true);
      sessionStorage.setItem("isLoggedOut", "true");
      localStorage.removeItem("userId");
      CheckAuthentication();
      navigate("/");
    }, 3000);
  };
  const customToastStyle = {
    marginTop: "45px",
  };

  const MAX_NAME_LENGTH = 20;
  const MAX_TITLE_LENGTH = 25;
  const MAX_STACK_LENGTH = 10;
  const MAX_DESCRIPTION_LENGTH = 230;

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div>
            <header className={`${"spaceBetween"} ${styles.header}`}>
              <div></div>
              <div className={styles.navbarHeading}>Todo</div>
              <div className="Center">
                <button
                  className={styles.logoutBtn}
                  onClick={() => LogOut()}>
                  Logout
                </button>
                <div>
                  {userData ? (
                    <div className={styles.profileIcon}>
                      <h2 className={styles.profileName}>
                        {userData.username.charAt(0)}
                      </h2>
                      {/* <p>Email: {userData.email}</p> */}
                      {/* Render other user data as needed */}
                    </div>
                  ) : (
                    <LoadingSpinner />
                  )}
                </div>
              </div>
            </header>
            <div>
              <div className="spaceBetween">
                <main className={styles.left}>
                  <div className="spaceBetween Margin15">
                    <p className={styles.articleHeading}>All Todo</p>
                  </div>
                  <p className="bottomBorder"></p>
                  {todos && todos.length > 0 ? (
                    todos.map((todo) => {
                      const shortenedDescription =
                        todo?.description.length > MAX_DESCRIPTION_LENGTH
                          ? todo?.description.substring(
                              0,
                              MAX_DESCRIPTION_LENGTH
                            ) + "..."
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
                        todo?.user?.username.length > MAX_NAME_LENGTH
                          ? todo?.user?.username.substring(0, MAX_NAME_LENGTH) +
                            "..."
                          : todo?.user?.username;

                      return (
                        <>
                          <div className={`${"Margin15"}`}>
                            <TodoCard
                              id={todo?._id}
                              isUser={
                                localStorage.getItem("userId") ===
                                todo?.user?._id
                              }
                              title={shortenedTitle}
                              stack={shortenedstack}
                              description={shortenedDescription}
                              image={todo?.image}
                              username={shortenedUsername}
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
                        It seems like no one has created a to-do list yet.
                      </p>
                    </>
                  )}
                </main>
                <aside className={`${styles.right} ${"MarginAdjust"}`}>
                  <div>
                    <div>
                      <ul className="spaceBetween">
                        <Link
                          to="/post"
                          className="isActiveColor">
                          Create Todo
                        </Link>
                        <Link
                          to="/about"
                          className="isActiveColor">
                          Created By
                        </Link>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.interestedPeople}>
                    <ExpansionPanel>
                      <ExpansionPanelHead className={styles.articleHeading}>
                        <p className={styles.articleHeading}>My Todo list</p>
                      </ExpansionPanelHead>
                      <ExpansionPanelBody>
                        <MyTodo />
                      </ExpansionPanelBody>
                    </ExpansionPanel>
                    <p className="asideBottomBorder"></p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <ToastContainer toastStyle={customToastStyle} />
        </>
      )}
    </>
  );
};

export { TodoPage };
