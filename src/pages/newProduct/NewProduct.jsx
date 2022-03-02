import "./newProduct.css";

export default function newProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Новый продукт</h1>
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
