import React from 'react';
import { FaBoxOpen, FaDollarSign, FaWarehouse, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="logo">🏢 Tên Doanh Nghiệp</h2>
    <ul className="menu">
      <li><FaBoxOpen /> Sản Phẩm</li>
      <li><FaDollarSign /> Doanh Thu</li>
      <li><FaWarehouse /> Kho Hàng</li>
      <li><FaChartBar /> Thống kê</li>
    </ul>
  </aside>
);

export default Sidebar;