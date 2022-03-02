import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Админ панель</h3>
          <ul className="sidebarList">
            <Link className="link" to="/">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Главная
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Анализ
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Продажи
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Быстрое меню</h3>
          <ul className="sidebarList">
            <Link className="link" to="/users">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Пользователи
              </li>
            </Link>
            <Link className="link" to="/products">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Продукты
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Операции
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Отчеты
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Уведомления</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Почта
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Обратная связь
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Сообщения
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Персонал</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Управление
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Аналитика
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Жалобы
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
