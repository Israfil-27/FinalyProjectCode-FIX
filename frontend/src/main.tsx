import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.tsx";
import HomeScreen from "./screens/Screens.tsx";
import PricateRouter from "./components/privateRouter/pricateRouter.tsx";
import Admin from "./components/admin/Admin.tsx";
import ProductScreen from "./screens/productScreens/ProductScreen.tsx";
import CartScreen from "./screens/cartScreens/cartScreens.tsx";
import LoginScreen from "./screens/LoginScreens/LoginScreens.tsx";
import RegisterScreens from "./screens/registerscreen/registerScreens.tsx";
import ShippingScreen from "./screens/shippingScreen/ShippingScreen.tsx";
import PaymentScreens from "./screens/Payment/PaymentScreens.tsx";
import PlaceOrderScreens from "./screens/PlaceorderScreens/PlaceOrderScreens.tsx";
import OrderScreens from "./screens/orderScreens/OrderScreens.tsx";
import Profile from "./screens/profileScreens/profile.tsx";
import OrderListScreens from "./screens/orderListScreens/orderListScreens.tsx";
import ProductListScreen from "./components/admin/ProductListScreen.tsx";
import ProductEdit from "./components/admin/productEdit.tsx";
import UserListScreen from "./components/admin/UserListScreen.tsx";
import UserEditScreen from "./components/admin/userEditScreens.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreens />} />
      <Route path="" element={<PricateRouter />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreens />} />
        <Route path="/placeorder" element={<PlaceOrderScreens />} />
        <Route path="/order/:id" element={<OrderScreens />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<Admin />}>
        <Route path="/admin/orderlist" element={<OrderListScreens />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
