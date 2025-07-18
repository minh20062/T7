import React from "react";
import { FaBoxes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  FaBoxOpen,
  FaDollarSign,
  FaWarehouse,
  FaChartBar,
} from "react-icons/fa";
import { FaIndustry } from "react-icons/fa"; // ✅ Icon nhà sản xuất

const linkClass = ({ isActive }) =>
  isActive
    ? "flex items-center gap-2 p-2 rounded-md bg-black text-white font-medium"
    : "flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-black hover:text-white transition-colors duration-200";

const Sidebar = () => (
  <aside className="Sidebar p-4 space-y-4 bg-white border-r min-h-screen">
    <NavLink to="/admin" className="flex items-center gap-2">
      <h2 className="logo text-xl font-bold text-black flex items-center gap-2">
        <img
          src="/assets/logo.jpg"
          alt="Logo"
          className="h-8 w-8 object-contain"
        />
        M&L
      </h2>
    </NavLink>
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
          <FaBoxes /> Kho hàng
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/analytics" className={linkClass}>
          <FaChartBar /> Thống kê
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/inventory-manager" className={linkClass}>
          <FaWarehouse /> Nhập / Xuất kho
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/manufacturers" className={linkClass}>
          <FaIndustry /> Nhà sản xuất
        </NavLink>
      </li>
    </ul>
  </aside>
);

export default Sidebar;
