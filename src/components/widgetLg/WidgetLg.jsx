import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Последние транзакции</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Клиент</th>
          <th className="widgetLgTh">Дата</th>
          <th className="widgetLgTh">Сумма</th>
          <th className="widgetLgTh">Статус</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              className="widgetLgImg"
              src="http://unsplash.it/45/45"
              alt=""
            />
            <span className="widgetLgName">Ivan Petrov</span>
          </td>
          <td className="widgetLgDate">11 Января 2022</td>
          <td className="widgetLgAmount">1499р.</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              className="widgetLgImg"
              src="http://unsplash.it/46/45"
              alt=""
            />
            <span className="widgetLgName">Ivan Petrov</span>
          </td>
          <td className="widgetLgDate">11 Января 2022</td>
          <td className="widgetLgAmount">1499р.</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              className="widgetLgImg"
              src="http://unsplash.it/45/46"
              alt=""
            />
            <span className="widgetLgName">Ivan Petrov</span>
          </td>
          <td className="widgetLgDate">11 Января 2022</td>
          <td className="widgetLgAmount">1499р.</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              className="widgetLgImg"
              src="http://unsplash.it/44/45"
              alt=""
            />
            <span className="widgetLgName">Ivan Petrov</span>
          </td>
          <td className="widgetLgDate">11 Января 2022</td>
          <td className="widgetLgAmount">1499р.</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
      </table>
    </div>
  );
}
