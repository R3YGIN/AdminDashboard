import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import "./widgetLg.css";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return (
      <button
        className={
          type === "Принят"
            ? "widgetLgButton Approved"
            : type === "Отклонен"
            ? "widgetLgButton Declined"
            : "widgetLgButton Pending"
        }
      >
        {type}
      </button>
    );
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Последние транзакции</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Клиент</th>
            <th className="widgetLgTh">Дата</th>
            <th className="widgetLgTh">Сумма</th>
            <th className="widgetLgTh">Статус</th>
          </tr>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">{order.amount}р.</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
