import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addNews } from "../../redux/apiCalls";

const NewNews = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.news.isFetching);

  const [inputs, setInputs] = useState({});
  console.log(inputs);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUploadImg = (image) => {
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
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const handleClick1 = async (e) => {
    e.preventDefault();
    image && handleUploadImg(image);
  };

  const handleClick2 = !isFetching
    ? async (e) => {
        e.preventDefault();

        const news = {
          ...inputs,
          img: imgUrl,
        };

        addNews(news, dispatch);
        await navigate("/news");
      }
    : (e) => {
        e.preventDefault();
      };

  return (
    <div className="news">
      <div className="newsTitleContainer">
        <h1 className="newsTitle">Новость</h1>
        <button className="newsAddBtn" onClick={goBack}>
          Назад
        </button>
      </div>
      <div className="newsFormContainer">
        <form className="newsForm">
          <label className="newsFormLabel">Название новости</label>
          <input
            type="text"
            className="newsFormInput"
            name="title"
            placeholder="Заголовок"
            onChange={handleChange}
            required
            minLength={4}
          />

          <label className="newsFormLabel">Slug новости</label>
          <input
            type="text"
            className="newsFormInput"
            name="newsSlug"
            placeholder="Коротная ссылка"
            onChange={handleChange}
            required
            minLength={3}
          />

          <label className="newsFormLabel">Описание</label>
          <textarea
            type="text"
            className="newsFormInput"
            name="desc"
            placeholder="Описание"
            onChange={handleChange}
            required
            minLength={4}
          />

          <label className="newsFormLabel">Ссылка</label>
          <input
            type="text"
            className="newsFormInput"
            name="link"
            placeholder="Ссылка на что-либо"
            onChange={handleChange}
          />

          <label className="newsFormLabel">Изображение</label>
          <div className="newsImgContainer">
            <img
              className="newsImg"
              src={imgUrl ? imgUrl : null}
              alt="News Img"
            />
          </div>
          <input
            className="newsFormFile"
            type="file"
            accept="image/*"
            id="newsImg"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="newsBtn" onClick={handleClick1}>
            Загрузить изображение
          </button>
          <button className="newsBtn" onClick={handleClick2}>
            {isFetching ? "Создание..." : "Создать"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewNews;
