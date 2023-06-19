import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoutes";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {" "}
      404 | Page not found
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* User Private Route */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        {/* Admin Private Route */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
        </Route>

        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
