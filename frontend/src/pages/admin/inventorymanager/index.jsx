import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { BanknotesIcon } from "@heroicons/react/24/solid";

export default function InventoryManager() {
  const { products, setProducts } = useContext(ProductContext);
  const [activeImportId, setActiveImportId] = useState(null);
  const [activeExportId, setActiveExportId] = useState(null);
  const [quantity, setQuantity] = useState("");

  // 📥 Nhập hàng
  function handleImport(id, quantity) {
    const qty = parseInt(quantity); // đảm bảo là số
    if (isNaN(qty) || qty <= 0) {
      alert("Số lượng nhập phải là số dương!");
      return;
    }

    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            stock: p.stock + qty,
            imported: (p.imported || 0) + qty,
          }
        : p
    );

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  // 📤 Bán hàng
  function handleExport(id, quantity) {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Số lượng bán phải là số dương!");
      return;
    }

    const updated = products.map((p) =>
      p.id === id && p.stock >= qty
        ? {
            ...p,
            stock: p.stock - qty,
            sold: (p.sold || 0) + qty,
          }
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
      <div className="mt-6 text-right font-semibold text-green-700 text-lg flex items-center justify-end gap-2 py-3">
        <BanknotesIcon className="h-6 w-6 text-green-700" />
        Tổng doanh thu: ₫{totalRevenue.toLocaleString()}
      </div>

      <table className="min-w-full text-sm bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="p-3 text-left">SST</th>
            <th className="p-3 text-left">Sản phẩm</th>
            <th className="p-3 text-left">Giá</th>
            <th className="p-3 text-left">Tồn kho</th>
            <th className="p-3 text-left">Đã nhập</th>
            <th className="p-3 text-left">Đã bán</th>
            <th className="p-3 w-64 ">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">₫{p.price.toLocaleString()}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">{p.imported || 0}</td>
              <td className="p-3">{p.sold || 0}</td>
              <td className="p-3">
                <td className="p-3">
                  <td className="p-3 w-64">
                    <div className="space-y-2">
                      {/* 📥 Nhập hàng */}
                      <div className="relative">
                        {activeImportId === p.id ? (
                          <div className="flex items-center gap-2 transition duration-200 ease-in-out">
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="Số lượng"
                              className="border px-2 py-1 rounded w-20"
                            />
                            <button
                              onClick={() => {
                                handleImport(p.id, quantity);
                                setQuantity("");
                                setActiveImportId(null);
                              }}
                              className="px-1 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              ✔ OK
                            </button>
                            <button
                              onClick={() => {
                                setActiveImportId(null);
                                setQuantity("");
                              }}
                              className="px-1 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                              ✖
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveImportId(p.id);
                              setActiveExportId(null);
                            }}
                            className="w-full px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          >
                            📥 Nhập
                          </button>
                        )}
                      </div>

                      {/* 📤 Bán hàng */}
                      <div className="relative">
                        {activeExportId === p.id ? (
                          <div className="flex items-center gap-2 transition duration-200 ease-in-out">
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="Số lượng"
                              className="border px-2 py-1 rounded w-20"
                            />
                            <button
                              onClick={() => {
                                handleExport(p.id, quantity);
                                setQuantity("");
                                setActiveExportId(null);
                              }}
                              className="px-1 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                              ✔ OK
                            </button>
                            <button
                              onClick={() => {
                                setActiveExportId(null);
                                setQuantity("");
                              }}
                              className="px-1 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                              ✖
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveExportId(p.id);
                              setActiveImportId(null);
                            }}
                            className="w-full px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                          >
                            📤 Bán
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
