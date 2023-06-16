import React, { useState } from "react";
import styles from "../assets/css/PostTodo.module.css";
import "../assets/css/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faPuzzlePiece,
  faFileAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
// axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.baseURL = `https://todo-server-ek3p.onrender.com`;

const PostTodo = () => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);
  const [todoData, setTodoData] = useState({
    title: "",
    stack: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    stack: "",
    description: "",
    image: "",
  });
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const OnTodoDataValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setTodoData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };

  const SubmitTodoData = async (e) => {
    e.preventDefault();

    // Validate the input fields
    let formIsValid = true;
    const newErrors = { ...errors };

    if (todoData.title.trim() === "") {
      newErrors.title = "Title is required";
      formIsValid = false;
    } else {
      newErrors.title = "";
    }

    if (todoData.stack.trim() === "") {
      newErrors.stack = "Priority is required";
      formIsValid = false;
    } else {
      newErrors.stack = "";
    }

    if (todoData.description.trim() === "") {
      newErrors.description = "Description is required";
      formIsValid = false;
    } else {
      newErrors.description = "";
    }

    if (todoData.image.trim() === "") {
      newErrors.image = "Category is required";
      formIsValid = false;
    } else {
      newErrors.image = "";
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      sethideEverything(false);
      setLoadingSpinner(true);

      // Simulate a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const { data } = await axios.post("/todo/create-todo", {
        title: todoData.title,
        stack: todoData.stack,
        description: todoData.description,
        image: todoData.image,
        user: id,
      });
      if (data?.success) {
        sessionStorage.setItem("postCreated", "true");
        navigate("/todo");
      }
      setLoadingSpinner(false);
      sethideEverything(true);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div className={styles.pageCenter}>
            <div>
              {/* Form Data Card */}
              <form
                className={`${styles.formDataCard} ${styles.MarginTop}`}
                onSubmit={SubmitTodoData}>
                <div className={styles.todoSubHeading}>Task</div>
                <label className={styles.flexRow}>
                  <input
                    type="text"
                    name="title"
                    value={todoData.title}
                    onChange={OnTodoDataValueChange}
                    placeholder="Buy groceries, Pay bills, Read book"
                    className={styles.todoInput}
                  />
                  <FontAwesomeIcon
                    icon={faHeading}
                    className={styles.fontAwesomeIcon}
                  />
                </label>
                {errors.title && (
                  <span className={styles.displayError}>{errors.title}</span>
                )}
                <div className={styles.todoSubHeading}>Description</div>
                <label className={styles.flexRow}>
                  <textarea
                    type="text"
                    name="description"
                    value={todoData.description}
                    onChange={OnTodoDataValueChange}
                    placeholder="Milk, Electricity, 'The Power of Now' by Eckhart Tolle"
                    className={styles.stopResize}
                  />
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className={styles.fontAwesomeIcon}
                  />
                </label>
                {errors.description && (
                  <span className={styles.displayError}>
                    {errors.description}
                  </span>
                )}
                <div className={styles.todoSubHeading}>Priority</div>
                <label className={styles.flexRow}>
                  <select
                    className={styles.todoDropDown}
                    value={todoData.stack}
                    onChange={(e) =>
                      setTodoData((prev) => ({
                        ...prev,
                        stack: e.target.value,
                      }))
                    }>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faPuzzlePiece}
                    className={styles.fontAwesomeIcon}
                  />
                </label>
                {errors.stack && (
                  <span className={styles.displayError}>{errors.stack}</span>
                )}
                <div className={styles.todoSubHeading}>Status</div>
                <label className={styles.flexRow}>
                  <select
                    className={styles.todoDropDown}
                    value={todoData.image}
                    onChange={(e) =>
                      setTodoData((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faHome}
                    className={styles.fontAwesomeIcon}
                  />
                </label>
                {errors.image && (
                  <span className={styles.displayError}>{errors.image}</span>
                )}

                {/* Log In Button */}
                <button
                  className={styles.submitBtn}
                  type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export { PostTodo };
