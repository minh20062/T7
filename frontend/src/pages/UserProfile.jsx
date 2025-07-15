import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function UserProfile() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UserCircleIcon className="h-6 w-6 text-black" />
        Thông tin cá nhân
      </h1>

      <div className="mb-4">
        <div className="flex justify-center">
          <img
            src="/assets/mm.png"
            alt="Avatar"
            className="h-16 w-16 rounded-full border object-cover"
          />
        </div>
        <label className="block text-center text-gray-700 mb-2">
          Ảnh đại diện
        </label>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-gray-700">Tên người dùng</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value="Minh" // ✅ Có thể dùng state
            readOnly
          />
        </div>
        <div>
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value="ceo@minhcompany.vn"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
