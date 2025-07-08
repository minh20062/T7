import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBoxOpen,
  FaDollarSign,
  FaWarehouse,
  FaChartBar,
} from "react-icons/fa";

const linkClass = ({ isActive }) =>
  isActive
    ? "flex items-center gap-2 p-2 rounded-md bg-blue-100 text-blue-600 font-medium"
    : "flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200";

const Sidebar = () => (
  <aside className="Sidebar p-4 space-y-4 bg-white border-r min-h-screen">
    <h2 className="logo text-xl font-bold text-blue-600">🏢 M&L</h2>
    <ul className="menu space-y-1">
      <li>
        <NavLink to="/admin/products" className={linkClass}>
          <FaBoxOpen /> Sản phẩm
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/revenue" className={linkClass}>
          <FaDollarSign /> Doanh thu
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/inventory" className={linkClass}>
          <FaWarehouse /> Kho hàng
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/analytics" className={linkClass}>
          <FaChartBar /> Thống kê
        </NavLink>
      </li>
    </ul>
  </aside>
);

export default Sidebar;