import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        console.log(res.data);
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Новые пользователи</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmItem" key={user._id}>
            <img
              className="widgetSmImg"
              src={user.img || "http://unsplash.it/45/45"}
              alt="User Avatar"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{user.username}</span>
            </div>
            <Link to={`/user/${user._id}`} style={{ textDecoration: "none" }}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Показать
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
