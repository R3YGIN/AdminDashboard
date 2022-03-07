import "./login.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
    await window.location.reload();
  };

  return (
    <div className="login">
      <input
        className="loginInput"
        type="text"
        placeholder="Имя пользователя"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="loginInput"
        type="password"
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="loginButton" onClick={handleClick}>
        Войти
      </button>
    </div>
  );
};

export default Login;
