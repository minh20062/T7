import React, { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { BanknotesIcon } from "@heroicons/react/24/solid";

export default function InventoryManager() {
  const { products, setProducts } = useContext(ProductContext);

  // 📥 Nhập hàng
  function handleImport(id) {
    const updated = products.map((p) =>
      p.id === id
        ? { ...p, stock: p.stock + 1, imported: (p.imported || 0) + 1 }
        : p
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  // 📤 Bán hàng
  function handleExport(id) {
    const updated = products.map((p) =>
      p.id === id && p.stock > 0
        ? { ...p, stock: p.stock - 1, sold: (p.sold || 0) + 1 }
        : p
    );
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  // 💰 Tính doanh thu
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.sold || 0) * p.price,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
        <ArchiveBoxIcon className="h-6 w-6 text-stone-600" />
        Quản lý kho & doanh thu
      </h1>

      <table className="min-w-full text-sm bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="p-3 text-left">Sản phẩm</th>
            <th className="p-3 text-left">Giá</th>
            <th className="p-3 text-left">Tồn kho</th>
            <th className="p-3 text-left">Đã nhập</th>
            <th className="p-3 text-left">Đã bán</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₫{p.price.toLocaleString()}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">{p.imported || 0}</td>
              <td className="p-3">{p.sold || 0}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleImport(p.id)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  📥 Nhập
                </button>
                <button
                  onClick={() => handleExport(p.id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  📤 Bán
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right font-semibold text-green-700 text-lg flex items-center justify-end gap-2">
        <BanknotesIcon className="h-6 w-6 text-green-700" />
        Tổng doanh thu: ₫{totalRevenue.toLocaleString()}
      </div>
    </div>
  );
}
