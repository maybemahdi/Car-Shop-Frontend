import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Error from "../pages/Error";
import Checkout from "../pages/Checkout";
import VerifyOrder from "../pages/VerifyOrder";
import WithAuth from "./WithAuth";
import DashboardHome from "../pages/Dashboard/User/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AdminRoute from "./AdminRoute";
import OrdersManagement from "../pages/Dashboard/Admin/OrdersManagement";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import ProductManagement from "../pages/Dashboard/Admin/ProductManagement";
import AddCar from "../pages/Dashboard/Admin/AddCar";
import EditCar from "../pages/Dashboard/Admin/EditCar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/car/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: (
          <WithAuth>
            <Checkout />
          </WithAuth>
        ),
      },
      {
        path: "/shurjopay-response",
        element: (
          <WithAuth>
            <VerifyOrder />
          </WithAuth>
        ),
      },
    ],
  },

  //dashboard layout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <WithAuth>
            <DashboardHome />
          </WithAuth>
        ),
      },
      {
        path: "my-orders",
        element: (
          <WithAuth>
            <MyOrders />
          </WithAuth>
        ),
      },
      {
        path: "my-profile",
        element: (
          <WithAuth>
            <MyProfile />
          </WithAuth>
        ),
      },
      {
        path: "order-management",
        element: (
          <AdminRoute>
            <OrdersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "car-management",
        element: (
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        ),
      },
      {
        path: "add-car",
        element: (
          <AdminRoute>
            <AddCar />
          </AdminRoute>
        ),
      },
      {
        path: "edit-car/:id",
        element: (
          <AdminRoute>
            <EditCar />
          </AdminRoute>
        ),
      },
    ],
  },

  // auth
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
