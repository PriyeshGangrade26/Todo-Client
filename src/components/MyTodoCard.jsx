import React from "react";
import styles from "../assets/css/MyTodoCard.module.css";
import "../assets/css/global.css";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const MyTodoCard = ({
  id,
  isUser,
  username,
  title,
  description,
  stack,
  image,
  time,
  ago,
}) => {
  const navigate = useNavigate();

  const TodoEdit = () => {
    navigate(`/todo-update/${id}`);
  };

  function getImageClass(image) {
    if (image === "Pending") {
      return styles.pending;
    } else if (image === "In Progress") {
      return styles.inProgress;
    } else if (image === "Completed") {
      return styles.completed;
    } else {
      return "";
    }
  }

  function getStackColor(stack) {
    if (stack === "Low") {
      return styles.low;
    } else if (stack === "Medium") {
      return styles.medium;
    } else if (stack === "High") {
      return styles.high;
    } else {
      return "";
    }
  }

  const TodoDelete = async () => {
    const deleteConfirmation = () => {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this todo?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
                const { data } = await axios.delete(`/todo/delete-todo/${id}`);
                if (data?.success) {
                  sessionStorage.setItem("todoDeleted", "true");
                  window.location.reload();
                }
              } catch (error) {
                console.log(error);
              }
            },
          },
          {
            label: "No",
            onClick: () => {
              // Do nothing if "No" is clicked
            },
          },
        ],
      });
    };

    deleteConfirmation();
  };

  return (
    <div className={styles.MarginTop}>
      <div className="spaceBetween">
        <div>
          <div className={`${"alignRow MarginBottom10"} ${styles.leftWidth}`}>
            <div className={styles.profileIcon}>
              <span className={styles.profileName}>{username.charAt(0)}</span>
            </div>

            <div className="CenterInCol">
              <div className="alignRowCenter">
                <p className={styles.userName}>{username}</p>
                <p className={styles.userName}>•</p>
                <p className={styles.postDate}>{time}</p>
              </div>
            </div>
          </div>
          <div className="MarginBottom10">
            <p className={`${styles.todoTitle} ${"MarginBottom10"}`}>
              Task : {title}
            </p>
            <p className={styles.todoDescription}>{description}</p>
            <p className={styles.todoDescription}>
              Priority: <span className={getStackColor(stack)}>{stack}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="alignCenter">
        <p className={`${styles.chip} ${getImageClass(image)}`}>{image}</p>
        <p className={styles.chip}>{ago}</p>
        {id && (
          <>
            <FontAwesomeIcon
              icon={faEdit}
              className={`${styles.fontAwesomeIcon} ${styles.iconBlue}`}
              onClick={() => TodoEdit()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={`${styles.fontAwesomeIcon} ${styles.iconRed}`}
              onClick={() => TodoDelete()}
            />
          </>
        )}
      </div>
      <p className="todoCardBottomBorder"></p>
    </div>
  );
};

export { MyTodoCard };
