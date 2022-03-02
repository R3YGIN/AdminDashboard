import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./user.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Редактировать пользователя</h1>
        <Link to="/newUser">
          <button className="userAddBtn">Создать</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              className="userShowImg"
              src="http://unsplash.it/50/50"
              alt="User Avatar"
            />
            <div className="userShowTopTitle">
              <span className="userShowUserName">Иван Петров</span>
              <span className="userShowUserTitle">Инженер программист</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Данные аккаунта</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">petrov777</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">13.01.2000</span>
            </div>
            <span className="userShowTitle">Контактные данные</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+7 999 655 56 56</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">petrov777@mail.ru</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Ростов-на-Дону, Россия</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Редактирование</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Имя пользователя</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="petrov777"
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Имя Фамилия</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="Иван Петров"
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Почта</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="petrov777@mail.ru"
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Телефон</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="+7 999 655 56 56"
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Адрес</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="Ростов-на-Дону, Россия"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="http://unsplash.it/150/150"
                  alt="New avatar"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Обновить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
