import React, { useState } from "react";
import styles from "../assets/css/Login.module.css";
import "../assets/css/global.css";
import axios from "axios";
// axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.baseURL = `https://todo-server-ek3p.onrender.com`;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const SignIn = ({ ToggleAccount, CheckAuthentication }) => {
  const navigate = useNavigate();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);

  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setloginPasswordError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const OnLoginValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setLoginData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };
  const SubmitLoginUserData = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (email === "" || !email.match(emailRegex)) {
      setloginPasswordError("");
      setLoginEmailError("Please enter a valid email address.");
    } else if (
      password === "" ||
      !password.match(passwordRegex) ||
      password.includes("password")
    ) {
      setLoginEmailError("");
      setloginPasswordError("Invalid password format.");
    } else {
      setloginPasswordError("");
      setLoginEmailError("");
      try {
        const { data } = await axios.post("/user/login", {
          email: loginData.email,
          password: loginData.password,
        });
        if (data.success) {
          sethideEverything(false);
          setLoadingSpinner(true);
          setTimeout(() => {
            setLoadingSpinner(false);
            sethideEverything(true);
            localStorage.setItem("userId", data?.user._id);
            CheckAuthentication();
            sessionStorage.setItem("isLoggedIn", "true");
            navigate("/todo");
          }, 3000);
        } else {
          sethideEverything(false);
          setLoadingSpinner(true);
          setTimeout(() => {
            setLoadingSpinner(false);
            sethideEverything(true);
            ToggleAccount();
            toast.error(
              "Invalid Credentials!, Please create an account before attempting to sign in."
            );
          }, 3000);
        }
      } catch (error) {
        toast.error("Invalid username or password. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div>
            {/* Heading */}
            <div>
              <b className={styles.signInHeading}>Sign In</b>
              <div className={styles.signInSubHeading}>
                Sign in to your account
              </div>
            </div>

            {/* Form Data Card */}
            <form
              className={`${styles.formDataCard} ${styles.MarginTop}`}
              onSubmit={SubmitLoginUserData}>
              <div className={styles.emailSubHeading}>Email address</div>
              <label className={styles.flexRow}>
                <input
                  type="text"
                  name="email"
                  value={loginData.email}
                  onChange={OnLoginValueChange}
                  placeholder="johndoe@gmail.com"
                  className={styles.emailInput}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.fontAwesomeIcon}
                />
              </label>
              {loginEmailError && (
                <span className={styles.displayError}>{loginEmailError}</span>
              )}
              <div className={styles.passwordSubHeading}>Password</div>
              <label className={styles.flexRow}>
                <input
                  type={passwordHidden ? "password" : "text"}
                  name="password"
                  value={loginData.password}
                  onChange={OnLoginValueChange}
                  placeholder="Password"
                  className={styles.passwordInput}
                />
                {passwordHidden ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className={styles.fontAwesomeIcon}
                    onClick={() => togglePasswordVisibility()}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className={styles.fontAwesomeIcon}
                    onClick={() => togglePasswordVisibility()}
                  />
                )}
              </label>
              {loginPasswordError && (
                <span className={styles.displayError}>
                  {loginPasswordError}
                </span>
              )}
              <div
                className={styles.forgotPassword}
                onClick={() => ToggleAccount()}>
                Forgot password?
              </div>
              {/* Log In Button */}
              <button
                className={styles.signBtn}
                type="submit">
                Sign In
              </button>
            </form>
            {/* Sign In Toggle */}
            <div className={styles.DontHaveAnAccount}>
              Don’t have an account?
              <span
                className={styles.register}
                onClick={() => ToggleAccount()}>
                Sign Up
              </span>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export { SignIn };
