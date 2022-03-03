import { useNavigate } from "react-router-dom";
import "./newProduct.css";

export default function NewProduct() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="newProduct">
      <div className="addProductTitleContainer">
        <h1 className="addProductTitle">Новый продукт</h1>
        <button className="goBack" onClick={goBack}>
          Назад
        </button>
      </div>
      <form className="addProductForm">
        <div className="addProductItem">
          <label className="addProductItemLabel">Изображение</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Название</label>
          <input
            className="addProductItemInput"
            type="text"
            placeholder="Футболка Nike"
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Количество</label>
          <input
            className="addProductItemInput"
            type="text"
            placeholder="123"
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Active</label>
          <select className="addProductItemSelect" name="active" id="active">
            <option value="yes">Да</option>
            <option value="no">Нет</option>
          </select>
        </div>
        <button className="addProductButton">Создать</button>
      </form>
    </div>
  );
}
