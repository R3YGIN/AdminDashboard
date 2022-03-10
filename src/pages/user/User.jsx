import {
  CalendarToday,
  MailOutline,
  Password,
  PermIdentity,
  Publish,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateAccount } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const location = useLocation();
  const accountId = location.pathname.split("/")[2];

  const account = useSelector((state) =>
    state.account.accounts.find((account) => account._id === accountId)
  );

  const { username, email } = useSelector((state) =>
    state.account.accounts.find(({ _id }) => _id === accountId)
  );
  const [inputs, setInputs] = useState({
    username,
    email,
    isAdmin: false,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const account = { ...inputs };
    await updateAccount(accountId, account, dispatch);
    await navigate(-1);
  };

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
            <PermIdentity className="userShowIcon" />
            <div className="userShowTopTitle">
              <span className="userShowUserName">{account.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Данные аккаунта</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Имя пользователя:</b> {account.username}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Дата регистрации:</b> {account.createdAt}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Админ:</b> {"" + account.isAdmin}
              </span>
            </div>
            <div className="userShowInfo">
              <Password className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Пароль:</b>{" "}
              </span>
            </div>
            <span className="userShowTitle">Контактные данные</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                <b>Почта:</b> {account.email}
              </span>
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
                  name="username"
                  placeholder={account.username}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Почта</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  name="email"
                  placeholder={account.email}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Админ</label>
                <select className="userUpdateSelect" name="isAdmin">
                  <option value="false">Нет</option>
                  <option value="true">Да</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label className="userUpdateLabel">Пароль</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  name="password"
                  placeholder="новый пароль"
                  // onChange={handleChange} //ДОБАВИТЬ
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Обновить
              </button>
            </div>
            {/* <div className="userUpdateRight">
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
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
