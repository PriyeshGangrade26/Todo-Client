import React, { useState } from "react";
import "./assets/css/global.css";
import { LoginPage } from "./pages/LoginPage";
import { TodoPage } from "./pages/TodoPage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, Navigate } from "react-router-dom";
import { About } from "./components/About";
import { PageNotFound } from "./components/PageNotFound";
import { PostTodo } from "./components/PostTodo";
import { TodoUpdate } from "./pages/TodoUpdate";

const App = () => {
  const [Authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("userId")
  );

  const CheckAuthentication = () => {
    setAuthenticated(!!localStorage.getItem("userId"));
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LoginPage CheckAuthentication={CheckAuthentication} />}
        />
        <Route
          path="/todo"
          element={
            Authenticated ? (
              <TodoPage CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/post"
          element={
            Authenticated ? (
              <PostTodo CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/todo-update/:id"
          element={
            Authenticated ? (
              <TodoUpdate CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/about"
          element={
            Authenticated ? (
              <About CheckAuthentication={CheckAuthentication} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </>
  );
};

const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export { MainApp };
