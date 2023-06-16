import React from "react";
import styles from "../assets/css/PageNotFound.module.css";
import "../assets/css/global.css";
import image from "../assets/images/404.jpg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.center}>
        <div className={styles.container}>
          <img
            className={styles.img_404}
            src={image}
            height="350"
            width="450"></img>
          <h3>404 Error</h3>
          <p className={styles.message_404}>OH N0! You're lost...!!!</p>
          <p className={styles.message_404}>
            The page you are looking for does not exist. How you got here is a
            mystery, But you can click the button below to go back to the login
            page.
          </p>
          <button
            className={
              styles.btn_404 + " " + styles.center + " " + styles.whiteSpace
            }
            onClick={() => goHome()}>
            HOME
          </button>
        </div>
      </div>
    </>
  );
};

export { PageNotFound };
