import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import {
  getAccountStart,
  getAccountSuccess,
  getAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
  addAccountStart,
  addAccountSuccess,
  addAccountFailure,
} from "./accountRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import {
  getNewsStart,
  getNewsSuccess,
  getNewsFailure,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFailure,
  updateNewsStart,
  updateNewsSuccess,
  updateNewsFailure,
  addNewsStart,
  addNewsSuccess,
  addNewsFailure,
} from "./newsRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logoutFunc = async (dispatch) => {
  dispatch(logout());
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getNews = async (dispatch) => {
  dispatch(getNewsStart());
  try {
    const res = await publicRequest.get("news");
    dispatch(getNewsSuccess(res.data));
  } catch (err) {
    dispatch(getNewsFailure());
  }
};

export const getAccounts = async (dispatch) => {
  dispatch(getAccountStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getAccountSuccess(res.data));
  } catch (err) {
    dispatch(getAccountFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const deleteNews = async (id, dispatch) => {
  dispatch(deleteNewsStart());
  try {
    // const res = await userRequest.delete(`/news/${id}`);
    dispatch(deleteNewsSuccess(id));
  } catch (err) {
    dispatch(deleteNewsFailure());
  }
};

export const deleteAccount = async (id, dispatch) => {
  dispatch(deleteAccountStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteAccountSuccess(id));
  } catch (err) {
    dispatch(deleteAccountFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const updateNews = async (id, news, dispatch) => {
  dispatch(updateNewsStart());
  try {
    const res = await userRequest.put(`/news/${id}`, news);
    dispatch(updateNewsSuccess({ news }));
  } catch (err) {
    dispatch(updateNewsFailure());
  }
};

export const updateAccount = async (id, account, dispatch) => {
  dispatch(updateAccountStart());
  try {
    const res = await userRequest.put(`/users/${id}`, account);
    dispatch(updateAccountSuccess({ account }));
  } catch (err) {
    dispatch(updateAccountFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const addNews = async (news, dispatch) => {
  dispatch(addNewsStart());
  try {
    const res = await userRequest.post(`/news/`, news);
    dispatch(addNewsSuccess(res.data));
  } catch (err) {
    dispatch(addNewsFailure());
  }
};

export const createAccount = async (account, dispatch) => {
  dispatch(addAccountStart());
  try {
    const res = await userRequest.post(`/auth/register/`, account);
    dispatch(addAccountSuccess(res.data));
  } catch (err) {
    dispatch(addAccountFailure());
  }
};
