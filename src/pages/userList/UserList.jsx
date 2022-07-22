import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAccounts } from "../../redux/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);

  useEffect(() => {
    getAccounts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteAccount(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "account",
      headerName: "Пользователь",
      width: 220,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.username}</div>;
      },
    },
    { field: "email", headerName: "Почта", width: 180 },
    {
      field: "action",
      headerName: "Действие",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Редактировать</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={accounts}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
