import { useNavigate } from "react-router-dom";
import "./newUser.css";

export default function NewUser() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

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
          <input className="newUserInput" type="text" placeholder="petrov777" />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Имя Фамилия</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="Иван Петров"
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Почта</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="petrov777@mail.ru"
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Пароль</label>
          <input
            className="newUserInput"
            type="password"
            placeholder="пароль"
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Телефон</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="+7 999 655 56 56"
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Адрес</label>
          <input
            className="newUserInput"
            type="text"
            placeholder="Ростов-на-Дону, Россия"
          />
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Пол</label>
          <div className="newUserGender">
            <input
              className="newUserGenderInput"
              type="radio"
              name="gender"
              id="male"
              value="male"
            />
            <label className="newUserGenderLabel" htmlFor="male">
              Мужчина
            </label>
            <input
              className="newUserGenderInput"
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            <label className="newUserGenderLabel" htmlFor="female">
              Женщина
            </label>
            <input
              className="newUserGenderInput"
              type="radio"
              name="gender"
              id="other"
              value="other"
            />
            <label className="newUserGenderLabel" htmlFor="other">
              Другой
            </label>
          </div>
        </div>
        <div className="newUserItem">
          <label className="newUserLabel">Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </select>
        </div>
        <button className="newUserButton">Создать</button>
      </form>
    </div>
  );
}
