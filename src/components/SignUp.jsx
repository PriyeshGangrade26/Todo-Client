import React, { useEffect, useState } from "react";
import styles from "../assets/css/Login.module.css";
import "../assets/css/global.css";
import axios from "axios";
// axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.baseURL = `https://todo-server-ek3p.onrender.com`;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "../components/LoadingSpinner";

const SignUp = ({ ToggleAccount }) => {
  useEffect(() => {
    const isLoggedOut = sessionStorage.getItem("isLoggedOut");
    if (isLoggedOut === "true") {
      toast.success("Successfully logged out!", { autoClose: 3000 });
      sessionStorage.removeItem("isLoggedOut");
    }
  }, []);

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hideEverything, sethideEverything] = useState(true);

  const [signUpNameError, setSignUpNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState("");
  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    useState("");

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const OnSignUpValueChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setSignUpData((prev) => {
      return {
        ...prev,
        [Name]: Value,
      };
    });
  };
  const SubmitSignUpUserData = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = signUpData;
    const nameRegex = /^[A-Za-z\d\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (name === "" || !name.match(nameRegex) || name.length < 2) {
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      setSignUpNameError("Please enter a valid name");
    } else if (email === "" || !email.match(emailRegex)) {
      setSignUpNameError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      setSignUpEmailError("Please enter a valid email address.");
    } else if (
      password === "" ||
      !password.match(passwordRegex) ||
      password.includes("password")
    ) {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpConfirmPasswordError("");
      setSignUpPasswordError("Invalid password format.");
    } else if (confirmpassword === "" || confirmpassword !== password) {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("Passwords do not match.");
    } else {
      setSignUpNameError("");
      setSignUpEmailError("");
      setSignUpPasswordError("");
      setSignUpConfirmPasswordError("");
      try {
        const { data } = await axios.post("/user/register", {
          username: signUpData.name,
          email: signUpData.email,
          password: signUpData.password,
          confirmPassword: signUpData.confirmpassword,
        });
        if (data.success) {
          sethideEverything(false);
          setLoadingSpinner(true);
          setTimeout(() => {
            ToggleAccount();
            setLoadingSpinner(false);
            sethideEverything(true);
            toast.success("Successfully signed up!");
          }, 3000);
        } else {
          toast.error(data.message); // show the error message from the server
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error(
            "User already exists. Please choose a different User Name or Email."
          );
        } else {
          toast.error("Signed Up! failed. Please try again later.");
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordHidden(!confirmPasswordHidden);
  };

  return (
    <>
      {loadingSpinner && <LoadingSpinner />}
      {hideEverything && (
        <>
          <div>
            {/* Heading */}
            <div>
              <b className={styles.signInHeading}>Sign Up</b>
              <div className={styles.signInSubHeading}>
                Sign up to your account
              </div>
            </div>
            {/* Form Data Card */}
            <form
              className={styles.signUpFormDataCard}
              onSubmit={SubmitSignUpUserData}>
              <div className={styles.nameSubHeading}>Name</div>
              <label className={styles.flexRow}>
                <input
                  type="text"
                  name="name"
                  value={signUpData.name}
                  onChange={OnSignUpValueChange}
                  placeholder="John Doe"
                  className={styles.nameInput}
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.fontAwesomeIcon}
                />
              </label>
              {signUpNameError && (
                <span className={styles.displayError}>{signUpNameError}</span>
              )}
              <div className={styles.emailSubHeading}>Email address</div>
              <label className={styles.flexRow}>
                <input
                  type="text"
                  name="email"
                  value={signUpData.email}
                  onChange={OnSignUpValueChange}
                  placeholder="johndoe@gmail.com"
                  className={styles.emailInput}
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.fontAwesomeIcon}
                />
              </label>
              {signUpEmailError && (
                <span className={styles.displayError}>{signUpEmailError}</span>
              )}
              <div className={styles.passwordSubHeading}>Password</div>
              <label className={styles.flexRow}>
                <input
                  type={passwordHidden ? "password" : "text"}
                  name="password"
                  value={signUpData.password}
                  onChange={OnSignUpValueChange}
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
              {signUpPasswordError && (
                <span className={styles.displayError}>
                  {signUpPasswordError}
                </span>
              )}
              <div className={styles.passwordSubHeading}>Confirm Password</div>
              <label className={styles.flexRow}>
                <input
                  type={confirmPasswordHidden ? "password" : "text"}
                  name="confirmpassword"
                  value={signUpData.confirmpassword}
                  onChange={OnSignUpValueChange}
                  placeholder="Confirm Password"
                  className={styles.passwordInput}
                />
                {confirmPasswordHidden ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className={styles.fontAwesomeIcon}
                    onClick={() => toggleConfirmPasswordVisibility()}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className={styles.fontAwesomeIcon}
                    onClick={() => toggleConfirmPasswordVisibility()}
                  />
                )}
              </label>
              {signUpConfirmPasswordError && (
                <span className={styles.displayError}>
                  {signUpConfirmPasswordError}
                </span>
              )}
              {/* Sign In Button */}
              <button
                className={styles.signBtn}
                type="submit">
                Sign Up
              </button>
            </form>
            {/* Login Toggle */}
            <div className={styles.DontHaveAnAccount}>
              Already have an account?
              <span
                className={styles.register}
                onClick={() => ToggleAccount()}>
                Sign In
              </span>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export { SignUp };
