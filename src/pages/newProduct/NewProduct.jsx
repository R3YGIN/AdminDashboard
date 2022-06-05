import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { RemoveCircle } from "@mui/icons-material";

export default function NewProduct() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({});
  console.log("INP--", inputs);

  const [requ, setRequ] = useState([]);
  console.log("REQU--", requ);

  const [genres, setGenres] = useState([]);
  console.log("GENRE--", genres);

  const [image, setImage] = useState(null);
  console.log("IMG---", image);
  const [imgUrl, setImgUrl] = useState(null);
  console.log("imgURL--", imgUrl);

  const [wideImage, setWideImage] = useState(null);
  console.log("wideIMG--", wideImage);
  const [wideImgUrl, setWideImgUrl] = useState(null);
  console.log("wideURL--", wideImgUrl);

  const [sliderImg, setSliderImg] = useState([]);
  console.log("sliderIMG--", sliderImg);
  const [sliderURL, setSliderURL] = useState([]);
  console.log("sliderURL--", sliderURL);

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

  const handleUploadImg = (image, type) => {
    //type - img = img, wide = wideImg, slider = slider
    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
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
      img: imgUrl,
      wideImg: wideImgUrl,
      slider: sliderURL,
      genre: genres,
      requirements: requ,
    };

    console.log("!!!777---", product);
    addProduct(product, dispatch);
    await navigate("/products");
  };

  return (
    <div className="newProduct">
      <div className="addProductTitleContainer">
        <h1 className="addProductTitle">Новый продукт</h1>
        <button className="goBack" onClick={goBack}>
          Назад
        </button>
      </div>
      <form className="addProductForm">
        <div className="addProductFormLeft">
          <label className="addProductItemLabel">Название</label>
          <input
            className="addProductItemInput"
            name="title"
            type="text"
            placeholder="название"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Slug продукта</label>
          <input
            className="addProductItemInput"
            name="productSlug"
            type="text"
            placeholder="slug продукта"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Разработчик</label>
          <input
            className="addProductItemInput"
            name="developer"
            type="text"
            placeholder="разработчик"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Издатель</label>
          <input
            className="addProductItemInput"
            name="publisher"
            type="text"
            placeholder="издатель"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Дата выпуска</label>
          <input
            className="addProductItemInput"
            name="releaseDate"
            type="text"
            placeholder="дд/мм/гг"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Платформа</label>
          <input
            className="addProductItemInput"
            name="platform"
            type="text"
            placeholder="платформа"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Краткое описание</label>
          <textarea
            className="addProductItemInput"
            name="about"
            type="text"
            placeholder="краткое описание"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Описание продукта</label>
          <textarea
            className="addProductItemInput"
            name="desc"
            type="text"
            placeholder="описание"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Жанры</label>
          <input
            className="addProductItemInput"
            name="genre"
            type="text"
            placeholder="openWorld,action, ..."
            onChange={handleGenre}
          />
          <label className="addProductItemLabel">Цена</label>
          <input
            className="addProductItemInput"
            name="price"
            type="number"
            placeholder="цена"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">Скидка</label>
          <input
            className="addProductItemInput"
            name="sale"
            type="number"
            placeholder="цена"
            onChange={handleChange}
          />
          <label className="addProductItemLabel">В наличии</label>
          <select
            className="addProductItemSelect"
            name="inStock"
            onChange={handleChange}
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </div>
        {/* CENTER */}
        <div className="addProductFormCenter">
          <h3>Системные требования</h3>
          <label className="addProductItemLabel">ОС</label>
          <input
            className="addProductItemInput"
            name="os.min"
            type="text"
            placeholder="минимальные"
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="os.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">Процессор</label>
          <input
            className="productFormLeftInput"
            name="processor.min"
            type="text"
            placeholder={"минимальные"}
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="processor.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">Оперативная память</label>
          <input
            className="productFormLeftInput"
            name="memory.min"
            type="text"
            placeholder={"минимальные"}
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="memory.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">Место на диске</label>
          <input
            className="productFormLeftInput"
            name="storage.min"
            type="text"
            placeholder={"минимальные"}
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="storage.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">DirectX</label>
          <input
            className="productFormLeftInput"
            name="direct.min"
            type="text"
            placeholder={"минимальные"}
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="direct.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">Графика</label>
          <input
            className="productFormLeftInput"
            name="graphics.min"
            type="text"
            placeholder={"минимальные"}
            onChange={handleRequ}
          />
          <input
            className="productFormLeftInput"
            name="graphics.rec"
            type="text"
            placeholder={"рекумендуемые"}
            onChange={handleRequ}
          />
          <label className="productFormLeftLabel">Поддерживаемые языки</label>
          <textarea
            className="productFormLeftInput"
            name="languages"
            type="text"
            placeholder={"Русский, Английский"}
            onChange={handleLang}
          />
        </div>
        {/* --- */}
        <div className="addProductFormRight">
          {/* main */}
          <div className="productUpload">
            <h4>Основное изображение</h4>
            <img className="productUploadImg" src={imgUrl} alt={image?.name} />
            <input
              type="file"
              accept="image/*"
              id="fileImg"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          {/* wide */}
          <div className="productUpload">
            <h4>Широкое изображение</h4>
            <img
              className="productUploadImg wide"
              src={wideImgUrl}
              alt={wideImage?.name}
            />
            <input
              type="file"
              accept="image/*"
              id="fileWideImg"
              onChange={(e) => setWideImage(e.target.files[0])}
            />
          </div>
          {/* slider */}
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

          <button className="addProductButton" onClick={handleClick1}>
            Загрузить изображения
          </button>

          <button className="addProductButton" onClick={handleClick2}>
            Создать
          </button>
        </div>
      </form>
    </div>
  );
}
