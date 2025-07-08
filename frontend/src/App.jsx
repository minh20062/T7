import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";

// 📦 Các module admin
import DashboardHome from "./pages/admin/DashboardHome"; // ✅ đúng file tổng quan
import Products from "./pages/admin/products";
import Revenue from "./pages/admin/revenue";
import Inventory from "./pages/admin/inventory";
import Analytics from "./pages/admin/analytics";

export default function App() {
  return (
    <Routes>
      {/* 🟢 Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />

      {/* 🔐 Admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      >
        {/* 📊 Route mặc định khi vào /admin */}
        <Route index element={<DashboardHome />} />

        {/* 🛍️ Các module cụ thể */}
        <Route path="products" element={<Products />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}