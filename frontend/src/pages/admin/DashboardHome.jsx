// src/pages/admin/DashboardHome.jsx
import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function DashboardHome() {
  const { revenue, inventory, topProducts } = useContext(ProductContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">📊 Trang tổng quan quản trị</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Doanh thu</h2>
          <p className="text-xl font-semibold text-green-600">
            ₫{revenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Tồn kho</h2>
          <p className="text-xl font-semibold">{inventory.total} sản phẩm</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Hàng sắp hết</h2>
          <p className="text-xl font-semibold text-red-500">
            {inventory.lowStock}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Top bán chạy</h2>
          {topProducts.length ? (
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {topProducts.map((p, i) => (
                <li key={p.id}>
                  #{i + 1} {p.name} ({p.sold} đã bán)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-gray-400 mt-2">Chưa có dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
}