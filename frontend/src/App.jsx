import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserProfile from "./pages/UserProfile";

// 📦 Các module admin
import DashboardHome from "./pages/admin/DashboardHome"; // ✅ đúng file tổng quan
import Products from "./pages/admin/products";
import Revenue from "./pages/admin/revenue";
import Inventory from "./pages/admin/inventory";
import Analytics from "./pages/admin/analytics";
import InventoryManager from "./pages/admin/inventorymanager";
import Manufacturers from "./pages/admin/manufacturers";


export default function App() {
  return (
    <Routes>
      {/* 🟢 Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<UserProfile />} />

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
        <Route path="inventory-manager" element={<InventoryManager />} />
        <Route path="manufacturers" element={<Manufacturers />} />

      </Route>
    </Routes>
  );
}
