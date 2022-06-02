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
  const productSlug = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find(
      (product) => product.productSlug === productSlug
    )
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
        const res = await userRequest.get("orders/income?pid=" + product._id);
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
  }, [productSlug, MONTHS]);

  const {
    title,
    developer,
    publisher,
    releaseDate,
    platform,
    about,
    desc,
    genre,
    price,
    sale,
    requirements,
    inStock,
    img,
    wideImg,
    slider,
  } = useSelector((state) =>
    state.product.products.find(
      (product) => product.productSlug === productSlug
    )
  );
  const [inputs, setInputs] = useState({
    title,
    productSlug,
    developer,
    publisher,
    releaseDate,
    platform,
    about,
    desc,
    price,
    sale,
    inStock,
    img,
    wideImg,
  });
  const [image, setImage] = useState(null);
  const [requ, setRequ] = useState({ ...requirements });
  console.log("REQU---", requ);
  const [genres, setGenres] = useState([...genre]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleRequ = (e) => {
    const requ = e.target.name.split(".");
    setRequ((prev) => ({
      ...prev,
      [requ[0]]: {
        ...prev[requ[0]],
        [requ[1]]: e.target.value,
      },
    }));
  };
  const handleLang = (e) => {
    setRequ((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleGenre = (e) => {
    setGenres(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

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
            genre: genres,
            requirements: requ,
          };
          updateProduct(product._id, product, dispatch);
        });
      }
    );
  };

  const navigate = useNavigate();

  const handleClickNoImg = async (e) => {
    e.preventDefault();
    const product = {
      ...inputs,
      genre: genres,
      requirements,
    };
    await updateProduct(productSlug, product, dispatch);
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
              defaultValue={product.title}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Slug продукта</label>
            <input
              className="productFormLeftInput"
              name="productSlug"
              type="text"
              placeholder={product.productSlug}
              defaultValue={product.productSlug}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Разработчик</label>
            <input
              className="productFormLeftInput"
              name="developer"
              type="text"
              placeholder={product.developer}
              defaultValue={product.developer}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Издатель</label>
            <input
              className="productFormLeftInput"
              name="publisher"
              type="text"
              placeholder={product.publisher}
              defaultValue={product.publisher}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Дата выпуска</label>
            <input
              className="productFormLeftInput"
              name="releaseDate"
              type="text"
              placeholder={product.releaseDate}
              defaultValue={product.releaseDate}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Платформа</label>
            <input
              className="productFormLeftInput"
              name="platform"
              type="text"
              placeholder={product.platform}
              defaultValue={product.platform}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Краткое описание</label>
            <textarea
              className="productFormLeftInput"
              name="about"
              type="text"
              placeholder={product.about}
              defaultValue={product.about}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Описание продукта</label>
            <textarea
              className="productFormLeftInput"
              name="desc"
              type="text"
              placeholder={product.desc}
              defaultValue={product.desc}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Жанр</label>
            <input
              className="productFormLeftInput"
              name="genre"
              type="text"
              placeholder={product.genre}
              defaultValue={product.genre}
              onChange={handleGenre}
            />
            <label className="productFormLeftLabel">Цена</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="text"
              placeholder={product.price}
              defaultValue={product.price}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Скидка</label>
            <input
              className="productFormLeftInput"
              name="sale"
              type="text"
              placeholder={product.sale}
              defaultValue={product.sale}
              onChange={handleChange}
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
          {/* CENTER */}
          <div className="productCenter">
            <h3>Системные требования</h3>
            <label className="productFormLeftLabel">ОС</label>
            <input
              className="productFormLeftInput"
              name="os.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.os.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="os.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.os.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">Процессор</label>
            <input
              className="productFormLeftInput"
              name="processor.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.processor.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="processor.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.processor.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">Оперативная память</label>
            <input
              className="productFormLeftInput"
              name="memory.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.memory.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="memory.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.memory.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">Место на диске</label>
            <input
              className="productFormLeftInput"
              name="storage.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.storage.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="storage.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.storage.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">DirectX</label>
            <input
              className="productFormLeftInput"
              name="direct.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.direct.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="direct.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.direct.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">Графика</label>
            <input
              className="productFormLeftInput"
              name="graphics.min"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.graphics.min}
              onChange={handleRequ}
            />
            <input
              className="productFormLeftInput"
              name="graphics.rec"
              type="text"
              placeholder={"рекумендуемые"}
              defaultValue={requirements.graphics.rec}
              onChange={handleRequ}
            />
            <label className="productFormLeftLabel">Поддерживаемые языки</label>
            <textarea
              className="productFormLeftInput"
              name="languages"
              type="text"
              placeholder={"минимальные"}
              defaultValue={requirements.languages}
              onChange={handleLang}
            />
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
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="productButton"
              onClick={image ? handleClick : handleClickNoImg}
            >
              Обновить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
