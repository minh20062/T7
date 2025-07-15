import React, { useState, useEffect, useRef } from "react";
import {
  IdentificationIcon,
  PowerIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();
  const handleProfile = () => navigate("/profile");

  // ✅ Đóng menu nếu click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Xử lý đăng xuất
  const handleLogout = () => {
    // Nếu có xác thực, bạn có thể xoá token ở đây
    // localStorage.removeItem("token");
    navigate("/login"); // ✅ Chuyển trang
  };

  return (
    <header className="bg-white shadow flex justify-end px-6 py-3 relative">
      <div ref={menuRef} className="flex items-center gap-4 relative">
        <img
          src="/assets/mm.png"
          alt="Avatar CEO Minh"
          className="h-10 w-10 rounded-full border object-cover cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="absolute top-16 right-0 bg-white border shadow-lg rounded w-52 z-50">
            <ul className="text-sm text-gray-700">
              <li
                onClick={handleProfile}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <IdentificationIcon className="h-5 w-5 text-gray-600" />
                Thông tin cá nhân
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <PowerIcon className="h-5 w-5 text-red-500" />
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
