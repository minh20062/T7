import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { CubeIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const { products, setProducts } = useContext(ProductContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🛠 Xử lý sửa
  function handleEdit(product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  // 🛠 Xử lý xoá
  function handleDelete(id) {
    if (window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated)); // ✅ đồng bộ ngay
    }
  }

  // 🛠 Xử lý lưu (thêm hoặc sửa)
  function handleSave() {
    if (
      !selectedProduct.name ||
      selectedProduct.price < 0 ||
      selectedProduct.stock < 0
    ) {
      alert("Vui lòng nhập đầy đủ và đúng dữ liệu!");
      return;
    }

    let updated;

    if (selectedProduct.id) {
      // 🧩 Sửa sản phẩm có sẵn
      updated = products.map((p) =>
        p.id === selectedProduct.id ? selectedProduct : p
      );
    } else {
      // ➕ Thêm mới sản phẩm
      const newProduct = {
        ...selectedProduct,
        id: Date.now(),
        sold: 0, // ✅ Gút để hệ thống đồng bộ doanh thu
      };
      updated = [...products, newProduct];
    }

    // 🧠 Cập nhật context và localStorage
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated)); // nếu bạn chưa có useEffect lưu tự động

    // 🧼 Dọn UI
    setShowModal(false);
    setSelectedProduct(null);
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4">
        🛍️ Quản lý sản phẩm
      </h1>
      {/* 👉 Nút thêm */}
      <button
        onClick={() => {
          setSelectedProduct({ name: "", price: 0, stock: 0 });
          setShowModal(true);
        }}
        className="mb-4 px-4 py-2 bg-black text-white rounded flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        Thêm sản phẩm
      </button>

      <section className="p-8">
        <h1 className="text-3xl font-bold text-black bg-gray-100 p-4 rounded shadow flex items-center justify-center gap-4">
          <CubeIcon className="h-6 w-6 text-amber-800" />
          DANH SÁCH CÁC SẢN PHẨM
        </h1>
      </section>
      {/* 🧾 Bảng sản phẩm */}
      <table className="min-w-full text-sm bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-500 uppercase">
          <tr>
            <th className="p-3 text-left">Tên</th>
            <th className="p-3 text-left">Giá</th>
            <th className="p-3 text-left">Tồn kho</th>
            <th className="p-3 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₫{p.price.toLocaleString()}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  🗑️ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ✨ Modal thêm / sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">
              {selectedProduct?.id ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: +e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tồn kho
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: +e.target.value,
                  })
                }
              />
            </div>

            <div className="text-right space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
