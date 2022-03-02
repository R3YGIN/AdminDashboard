import { Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import "./product.css";

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Продукт</h1>
        <Link to="/newproduct">
          <button className="productAddBtn">Создать</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Показатель продаж" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              className="productInfoImg"
              src="http://unsplash.it/54/54"
              alt="Product img"
            />
            <span className="productName">Футболка Nike</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">продажи:</span>
              <span className="productInfoValue">3123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">да</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">в наличии:</span>
              <span className="productInfoValue">нет</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label className="productFormLeftLabel">Название продукта</label>
            <input
              className="productFormLeftInput"
              type="text"
              placeholder="Футболка Nike"
            />
            <label className="productFormLeftLabel">В наличии</label>
            <select
              className="productFormLeftSelect"
              name="inStock"
              id="idStock"
            >
              <option value="yes">Да</option>
              <option value="yes">Нет</option>
            </select>
            <label className="productFormLeftLabel">Active</label>
            <select className="productFormLeftSelect" name="active" id="active">
              <option value="yes">Да</option>
              <option value="yes">Нет</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                className="productUploadImg"
                src="http://unsplash.it/154/154"
                alt="Upload img"
              />
              <label for="file">
                <Publish className="productUploadIcon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Обновить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
