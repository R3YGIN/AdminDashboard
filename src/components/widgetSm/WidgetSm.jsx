import { Visibility } from "@mui/icons-material";
import "./widgetSm.css";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Новые пользователи</span>
      <ul className="widgetSmList">
        <li className="widgetSmItem">
          <img
            className="widgetSmImg"
            src="http://unsplash.it/45/45"
            alt="User Avatar"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Ivan Petrov</span>
            <span className="widgetSmUserTitle">Инженер программист</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Показать
          </button>
        </li>
        <li className="widgetSmItem">
          <img
            className="widgetSmImg"
            src="http://unsplash.it/46/45"
            alt="User Avatar"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Ivan Petrov</span>
            <span className="widgetSmUserTitle">Инженер программист</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Показать
          </button>
        </li>
        <li className="widgetSmItem">
          <img
            className="widgetSmImg"
            src="http://unsplash.it/45/46"
            alt="User Avatar"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Ivan Petrov</span>
            <span className="widgetSmUserTitle">Инженер программист</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Показать
          </button>
        </li>
        <li className="widgetSmItem">
          <img
            className="widgetSmImg"
            src="http://unsplash.it/46/46"
            alt="User Avatar"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Ivan Petrov</span>
            <span className="widgetSmUserTitle">Инженер программист</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Показать
          </button>
        </li>
        <li className="widgetSmItem">
          <img
            className="widgetSmImg"
            src="http://unsplash.it/44/45"
            alt="User Avatar"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Ivan Petrov</span>
            <span className="widgetSmUserTitle">Инженер программист</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Показать
          </button>
        </li>
      </ul>
    </div>
  );
}
