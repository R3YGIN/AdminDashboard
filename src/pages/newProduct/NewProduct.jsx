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

export default function NewProduct() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
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
          const product = { ...inputs, img: downloadURL, categories: category };
          addProduct(product, dispatch);
        });
      }
    );
  };

  // console.log(file);

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
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Название</label>
          <input
            className="addProductItemInput"
            name="title"
            type="text"
            placeholder="название"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Описание</label>
          <input
            className="addProductItemInput"
            name="desc"
            type="text"
            placeholder="описание..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Цена</label>
          <input
            className="addProductItemInput"
            name="price"
            type="number"
            placeholder="цена"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label className="addProductItemLabel">Категория</label>
          <input
            className="addProductItemInput"
            type="text"
            placeholder="категория1, категори2, ..."
            onChange={handleCategory}
          />
        </div>
        <div className="addProductItem">
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
        <button className="addProductButton" onClick={handleClick}>
          Создать
        </button>
      </form>
    </div>
  );
}
