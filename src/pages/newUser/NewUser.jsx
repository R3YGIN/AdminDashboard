import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../redux/apiCalls";
import "./newUser.css";

export default function NewUser() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [inputs, setInputs] = useState({
    isAdmin: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const account = { ...inputs };
    createAccount(account, dispatch);
    navigate("/users");
  };

  return (
    <div className="newUser">
      <div className="newUserTitleContainer">
        <h1 className="newUserTitle">Новый пользователь</h1>
        <button className="goBack" onClick={goBack}>
          Назад
        </button>
      </div>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="newUserLabel">Имя пользователя</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Почта</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="username@mail.ru"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Пароль</label>
          <input
            className="newUserInput"
            type="password"
            placeholder="пароль"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Админ</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            onChange={handleChange}
          >
            <option value="false">Нет</option>
            <option value="true">Да</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>
          Создать
        </button>
      </form>
    </div>
  );
}
