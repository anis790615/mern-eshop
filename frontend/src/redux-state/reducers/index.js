import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./productReducers";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import { userSigninReducer, userRegisterReducer } from "./userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";

const reducers = combineReducers({
  productList: productListReducer,
  productSave: productSaveReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});
export default reducers;
