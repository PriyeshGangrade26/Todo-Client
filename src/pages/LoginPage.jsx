import React, { useState } from "react";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import styles from "../assets/css/Login.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ CheckAuthentication }) => {
  const [account, setAccount] = useState(true);
  const ToggleAccount = () => {
    if (account === true) {
      setAccount(false);
      toast("Welcome back! Please enter your email and password to sign in.");
    } else {
      setAccount(true);
      toast("Welcome! Please create an account to continue.");
    }
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.left}>Todo.</div>
        <div className={styles.right}>
          {account ? (
            <SignUp ToggleAccount={ToggleAccount} />
          ) : (
            <SignIn
              ToggleAccount={ToggleAccount}
              CheckAuthentication={CheckAuthentication}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export { LoginPage };
