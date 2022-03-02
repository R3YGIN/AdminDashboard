import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 160 },
    {
      field: "product",
      headerName: "Продукт",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="Avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Количество", width: 160 },
    {
      field: "status",
      headerName: "Статус",
      width: 160,
    },
    {
      field: "price",
      headerName: "Цена",
      width: 160,
    },
    {
      field: "action",
      headerName: "Действие",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Редактировать</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
