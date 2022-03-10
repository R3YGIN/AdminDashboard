import { Publish } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { userRequest } from "../../requestMethods";
import "./product.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

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

  const { title, desc, price, categories, inStock, img } = useSelector(
    (state) => state.product.products.find(({ _id }) => _id === productId)
  );
  const [inputs, setInputs] = useState({
    title,
    desc,
    price,
    inStock,
    img,
  });
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([...categories]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategory = (e) => {
    setCategory(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: category,
          };
          updateProduct(productId, product, dispatch);
        });
      }
    );
  };

  const navigate = useNavigate();

  const handleClickNoImg = async (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      categories: category,
    };
    await updateProduct(productId, product, dispatch);
    await navigate(-1);
  };

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
              <span className="productInfoValue">
                {pStats.reduce((acc, cur) => acc + cur.Sales, 0)}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">в наличии:</span>
              <span className="productInfoValue">
                {product.inStock ? "Да" : "Нет"}
              </span>
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
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Описание продукта</label>
            <input
              className="productFormLeftInput"
              name="desc"
              type="text"
              placeholder={product.desc}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Цена</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="text"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Категория</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="text"
              placeholder={product.categories}
              onChange={handleCategory}
            />
            <label className="productFormLeftLabel">В наличии</label>
            <select
              className="productFormLeftSelect"
              name="inStock"
              id="idStock"
              onChange={handleChange}
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
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="productButton"
              onClick={file ? handleClick : handleClickNoImg}
            >
              Обновить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
