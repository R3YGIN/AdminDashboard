import React, { useState } from "react";
import "./news.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateNews } from "../../redux/apiCalls";

const News = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsSlug = location.pathname.split("/")[2];

  const currNews = useSelector((state) =>
    state.news.news.find((item) => item.newsSlug === newsSlug)
  );
  const isFetching = useSelector((state) => state.news.isFetching);

  const { title, img, desc, link } = currNews;

  const [inputs, setInputs] = useState({
    title,
    newsSlug,
    img,
    desc,
    link,
  });
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
          img: imgUrl ? imgUrl : img,
        };

        updateNews(currNews._id, news, dispatch);
        await navigate("/news");
      }
    : (e) => {
        e.preventDefault();
      };

  return (
    <div className="news">
      <div className="newsTitleContainer">
        <h1 className="newsTitle">Новость</h1>
        <Link to="/newnews">
          <button className="newsAddBtn">Создать</button>
        </Link>
      </div>
      <div className="newsFormContainer">
        <form className="newsForm">
          <label className="newsFormLabel">Название новости</label>
          <input
            type="text"
            className="newsFormInput"
            name="title"
            placeholder={title}
            defaultValue={title}
            onChange={handleChange}
            required
            minLength={4}
          />

          <label className="newsFormLabel">Slug новости</label>
          <input
            type="text"
            className="newsFormInput"
            name="newsSlug"
            placeholder={newsSlug}
            defaultValue={newsSlug}
            onChange={handleChange}
            required
            minLength={3}
          />

          <label className="newsFormLabel">Описание</label>
          <textarea
            type="text"
            className="newsFormInput"
            name="desc"
            placeholder={desc}
            defaultValue={desc}
            onChange={handleChange}
            required
            minLength={4}
          />

          <label className="newsFormLabel">Ссылка</label>
          <input
            type="text"
            className="newsFormInput"
            name="link"
            placeholder={link}
            defaultValue={link}
            onChange={handleChange}
          />

          <label className="newsFormLabel">Изображение</label>
          <div className="newsImgContainer">
            <img
              className="newsImg"
              src={imgUrl ? imgUrl : img}
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
            {isFetching ? "Обновление..." : "Обновить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default News;
