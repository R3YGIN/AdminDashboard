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
import { RemoveCircle } from "@mui/icons-material";

export default function Product() {
  const location = useLocation();
  const productSlug = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const currProduct = useSelector((state) =>
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
        const res = await userRequest.get(
          "orders/income?pid=" + currProduct._id
        );
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
  const [imgUrl, setImgUrl] = useState(null);

  const [wideImage, setWideImage] = useState(null);
  const [wideImgUrl, setWideImgUrl] = useState(null);

  const [sliderImg, setSliderImg] = useState([]);
  const [sliderURL, setSliderURL] = useState([...slider]);

  const handleClearCurrFiles = (e) => {
    e.preventDefault();
    setSliderURL([]);
  };
  const handleDeleteCurrFile = (e) => {
    e.preventDefault();
    const value = e.target.dataset.currImg;
    setSliderURL((prev) => prev.filter((item) => item !== value));
  };

  const handleClearAddedFiles = (e) => {
    e.preventDefault();
    setSliderImg([]);
  };
  const handleDeleteAddedFile = (e) => {
    e.preventDefault();
    const value = e.target.dataset.addedImg;
    setSliderImg((prev) => prev.filter((item) => item.name !== value));
  };

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

  const handleUploadImg = (image, type) => {
    //type - img = img, wide = wideImg, slider = slider
    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    console.log("storageRef", storageRef);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
            return;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type === "img") setImgUrl(downloadURL);
          if (type === "wide") setWideImgUrl(downloadURL);
          if (type === "slider") setSliderURL((prev) => [...prev, downloadURL]);
        });
      }
    );
  };

  const handleClick1 = async (e) => {
    e.preventDefault();
    image && handleUploadImg(image, "img");
    wideImage && handleUploadImg(wideImage, "wide");
    sliderImg.length &&
      sliderImg.forEach((item) => handleUploadImg(item, "slider"));
  };

  const handleClick2 = async (e) => {
    e.preventDefault();

    const product = {
      ...inputs,
      img: imgUrl ? imgUrl : img,
      wideImg: wideImgUrl ? wideImgUrl : wideImg,
      slider: sliderURL,
      genre: genres,
      requirements: requ,
    };

    updateProduct(currProduct._id, product, dispatch);
    await navigate("/products");
  };

  const navigate = useNavigate();

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
              src={currProduct.img}
              alt="Product img"
            />
            <span className="productName">{currProduct.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{currProduct._id}</span>
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
                {currProduct.inStock ? "Да" : "Нет"}
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
              placeholder={currProduct.title}
              defaultValue={currProduct.title}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Slug продукта</label>
            <input
              className="productFormLeftInput"
              name="productSlug"
              type="text"
              placeholder={currProduct.productSlug}
              defaultValue={currProduct.productSlug}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Разработчик</label>
            <input
              className="productFormLeftInput"
              name="developer"
              type="text"
              placeholder={currProduct.developer}
              defaultValue={currProduct.developer}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Издатель</label>
            <input
              className="productFormLeftInput"
              name="publisher"
              type="text"
              placeholder={currProduct.publisher}
              defaultValue={currProduct.publisher}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Дата выпуска</label>
            <input
              className="productFormLeftInput"
              name="releaseDate"
              type="text"
              placeholder={currProduct.releaseDate}
              defaultValue={currProduct.releaseDate}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Платформа</label>
            <input
              className="productFormLeftInput"
              name="platform"
              type="text"
              placeholder={currProduct.platform}
              defaultValue={currProduct.platform}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Краткое описание</label>
            <textarea
              className="productFormLeftInput"
              name="about"
              type="text"
              placeholder={currProduct.about}
              defaultValue={currProduct.about}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Описание продукта</label>
            <textarea
              className="productFormLeftInput"
              name="desc"
              type="text"
              placeholder={currProduct.desc}
              defaultValue={currProduct.desc}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Жанр</label>
            <input
              className="productFormLeftInput"
              name="genre"
              type="text"
              placeholder={currProduct.genre}
              defaultValue={currProduct.genre}
              onChange={handleGenre}
            />
            <label className="productFormLeftLabel">Цена</label>
            <input
              className="productFormLeftInput"
              name="price"
              type="number"
              placeholder={currProduct.price}
              defaultValue={currProduct.price}
              onChange={handleChange}
            />
            <label className="productFormLeftLabel">Скидка</label>
            <input
              className="productFormLeftInput"
              name="sale"
              type="number"
              placeholder={currProduct.sale}
              defaultValue={currProduct.sale}
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
              placeholder={"Русский, Английский"}
              defaultValue={requirements.languages}
              onChange={handleLang}
            />
          </div>
          {/* RIGHT */}
          <div className="productFormRight">
            <div className="productUpload">
              <h4>Основное изображение</h4>
              <img
                className="productUploadImg"
                src={imgUrl ? imgUrl : currProduct.img}
                alt="Upload img"
              />
              <input
                type="file"
                accept="image/*"
                id="fileImg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="productUpload">
              <h4>Широкое изображение</h4>
              <img
                className="productUploadImg wide"
                src={wideImgUrl ? wideImgUrl : currProduct.wideImg}
                alt="Upload img"
              />
              <input
                type="file"
                accept="image/*"
                id="fileWideImg"
                onChange={(e) => setWideImage(e.target.files[0])}
              />
            </div>
            <div className="productUpload">
              <h4>Изображения слайдера</h4>

              <span>Текущие изображения</span>
              <div className="productSliderContainer">
                {sliderURL.map((item, i) => (
                  <div className="productUploadImgContainer" key={item + i}>
                    <img
                      className="productUploadImg slider"
                      src={item}
                      alt="Upload img"
                      data-curr-img={item}
                      onClick={handleDeleteCurrFile}
                    />
                    <span className="productUploadIcon">
                      <RemoveCircle />
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={handleClearCurrFiles}>Очистить текущие</button>

              <span>Добавленные изображения:</span>
              <div className="productSliderContainer">
                {sliderImg.map((item, i) => (
                  <div className="productUploadImgContainer" key={item + i}>
                    <img
                      className="productUploadImg slider"
                      src={item}
                      alt={item.name}
                      data-added-img={item.name}
                      onClick={handleDeleteAddedFile}
                    />
                    <span className="productUploadIcon">
                      <RemoveCircle />
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={handleClearAddedFiles}>
                Очистить добавленные
              </button>
              <input
                type="file"
                multiple
                accept="image/*"
                id="filesSlider"
                onChange={(e) =>
                  setSliderImg((prev) => [...prev, ...e.target.files])
                }
              />
            </div>

            <button className="productButton" onClick={handleClick1}>
              Загрузить изображения
            </button>
            <button className="productButton" onClick={handleClick2}>
              Обновить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
