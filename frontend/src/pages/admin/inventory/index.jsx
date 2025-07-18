import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { CubeIcon } from "@heroicons/react/24/solid";

export default function Inventory() {
  const { products } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(""); // "", "low", "empty"

  const getStatus = (qty) => {
    if (qty === 0) return "Hết hàng";
    if (qty < 10) return "Sắp hết";
    return "Còn hàng";
  };

  const getColor = (qty) => {
    if (qty === 0) return "text-red-600";
    if (qty < 10) return "text-yellow-500";
    return "text-green-600";
  };

  const filteredProducts = products.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());

    if (filter === "low") return matchName && item.stock < 10 && item.stock > 0;
    if (filter === "empty") return matchName && item.stock === 0;
    return matchName;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
        <CubeIcon className="h-6 w-6 text-amber-800" />
        Kho hàng
      </h1>

      {/* 🔎 Bộ lọc */}
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="low">Sắp hết (dưới 10)</option>
          <option value="empty">Hết hàng</option>
        </select>
      </div>

      {/* 🧾 Bảng sản phẩm */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-left">
            <tr>
              <th className="p-4">Tên sản phẩm</th>
              <th className="p-4">Mã SKU</th>
              <th className="p-4">Số lượng</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((item) => (
                <tr key={item.id || item.sku} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.sku || `SP-${item.id}`}</td>
                  <td className="p-4">{item.stock}</td>
                  <td className={`p-4 font-semibold ${getColor(item.stock)}`}>
                    {getStatus(item.stock)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 italic text-center text-gray-500"
                >
                  Không tìm thấy sản phẩm phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
