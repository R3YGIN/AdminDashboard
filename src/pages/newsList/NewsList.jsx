import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./newsList.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { deleteNews, getNews } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    getNews(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteNews(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "news",
      headerName: "Новость",
      width: 420,
      renderCell: (params) => {
        return (
          <div className="newsListItem">
            <img className="newsListImg" src={params.row.img} alt="Avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Действие",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/news/" + params.row.newsSlug}>
              <button className="newsListEdit">Редактировать</button>
            </Link>
            <DeleteOutline
              className="newsListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="newsList">
      <DataGrid
        rows={news}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default NewsList;
