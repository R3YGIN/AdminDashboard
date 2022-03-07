import "./app.css";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";

function App() {
  const user =
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser || "noAuth";
  const admin = user.isAdmin;
  console.log(admin);

  return (
    <Routes>
      <Route
        path="login"
        element={admin && user !== "noAuth" ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={
          !admin && user === "noAuth" ? <Navigate to="login" /> : <Layout />
        }
      >
        <Route index element={<Home />} />
        <Route path="users" element={<UserList />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="newUser" element={<NewUser />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="newproduct" element={<NewProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
