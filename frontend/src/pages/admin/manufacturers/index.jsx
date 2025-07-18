import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Manufacturers() {
  const { manufacturers, setManufacturers } = useContext(ProductContext);
  const [showForm, setShowForm] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Form thêm
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Sửa
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingLocation, setEditingLocation] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [editingEmail, setEditingEmail] = useState("");

  const handleAdd = () => {
    const name = newName.trim();
    const location = newLocation.trim();
    const phone = newPhone.trim();
    const email = newEmail.trim();

    if (!name || !location) {
      alert("Vui lòng nhập đầy đủ tên và địa chỉ!");
      return;
    }

    const isDuplicate = manufacturers.some(
      (m) => m.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert("Tên nhà sản xuất đã tồn tại!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      location,
      phone,
      email,
    };

    const updated = [...manufacturers, newItem];
    setManufacturers(updated);
    localStorage.setItem("manufacturers", JSON.stringify(updated));

    // Reset form
    setNewName("");
    setNewLocation("");
    setNewPhone("");
    setNewEmail("");
  };

  const handleDelete = (id) => {
    if (confirm("Xác nhận xoá nhà sản xuất?")) {
      const updated = manufacturers.filter((m) => m.id !== id);
      setManufacturers(updated);
      localStorage.setItem("manufacturers", JSON.stringify(updated));
    }
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setEditingName(m.name);
    setEditingLocation(m.location);
    setEditingPhone(m.phone);
    setEditingEmail(m.email);
  };

  const handleUpdate = () => {
    const name = editingName.trim();
    const location = editingLocation.trim();
    const phone = editingPhone.trim();
    const email = editingEmail.trim();

    if (!name || !location) {
      alert("Vui lòng nhập đầy đủ tên và địa chỉ!");
      return;
    }

    const updated = manufacturers.map((m) =>
      m.id === editingId ? { ...m, name, location, phone, email } : m
    );

    setManufacturers(updated);
    localStorage.setItem("manufacturers", JSON.stringify(updated));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingLocation("");
    setEditingPhone("");
    setEditingEmail("");
  };

  const filteredManufacturers = manufacturers.filter((m) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      m.name.toLowerCase().includes(keyword) ||
      m.phone.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
        <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
        Quản lý nhà sản xuất
      </h1>

      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="🔍 Tìm nhà sản xuất..."
          className="w-full md:w-1/2 border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-green-500 transition w-full md:w-auto"
        >
          {showForm ? "✖ Đóng form" : "➕ Thêm nhà sản xuất"}
        </button>
      </div>

      {/* ➕ Form thêm */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow-xl border border-black/30 mb-8 transition">
          <h2 className="text-lg font-semibold text-black mb-4">
            ➕ Thêm nhà sản xuất mới
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên công ty
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="VD: MINHCOMPANY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <input
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="VD: TP HCM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="VD: 0909xxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email liên hệ
              </label>
              <input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="VD: contact@minhcompany.vn"
              />
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              onClick={handleAdd}
              className="bg-black text-white px-6 py-2 rounded hover:bg-green-500 transition hover:-translate-y-1"
            >
              💾 Lưu nhà sản xuất
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex items-center justify-center bg-gray-100 border border-gray-300 rounded px-4 py-3 mb-4 shadow-sm">
        <span className="text-orange-500 text-2xl mr-3">📦</span>
        <h2 className="text-2xl font-bold text-black uppercase tracking-wide">
          DANH SÁCH NHÀ SẢN XUẤT
        </h2>
      </div>

      {/* 📦 Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-xl border border-black/30 overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-black">
              <th className="p-3">SST</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Email</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredManufacturers.map((m, i) => (
              <tr key={m.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-semibold text-black">
                  {editingId === m.id ? (
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    m.name
                  )}
                </td>
                <td className="p-3">
                  {editingId === m.id ? (
                    <input
                      value={editingLocation}
                      onChange={(e) => setEditingLocation(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    m.location
                  )}
                </td>
                <td className="p-3">
                  {editingId === m.id ? (
                    <input
                      value={editingPhone}
                      onChange={(e) => setEditingPhone(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    m.phone
                  )}
                </td>
                <td className="p-3">
                  {editingId === m.id ? (
                    <input
                      value={editingEmail}
                      onChange={(e) => setEditingEmail(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    m.email
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editingId === m.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        💾 Lưu
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                      >
                        ✖ Huỷ
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(m)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        🗑️ Xoá
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
