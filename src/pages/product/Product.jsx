import { Publish } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { userRequest } from "../../requestMethods";
import "./product.css";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

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
          <Chart data={pStats} dataKey="Sales" title="Показатель продаж" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              className="productInfoImg"
              src={product.img}
              alt="Product img"
            />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">продажи:</span>
              <span className="productInfoValue">3123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">в наличии:</span>
              <span className="productInfoValue">{product.inStock}</span>
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
              name="title"
              type="text"
              placeholder={product.title}
            />
            <label className="productFormLeftLabel">Описание продукта</label>
            <input
              className="productFormLeftInput"
              name="desc"
              type="text"
              placeholder={product.desc}
            />
            <label className="productFormLeftLabel">Цена</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="text"
              placeholder={product.price}
            />
            <label className="productFormLeftLabel">Категория</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="text"
              placeholder={product.categories}
            />
            <label className="productFormLeftLabel">В наличии</label>
            <select
              className="productFormLeftSelect"
              name="inStock"
              id="idStock"
            >
              <option value="true">Да</option>
              <option value="false">Нет</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                className="productUploadImg"
                src={product.img}
                alt="Upload img"
              />
              <label htmlFor="file">
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
