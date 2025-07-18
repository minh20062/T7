// src/pages/admin/DashboardHome.jsx
import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartBarIcon } from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardHome() {
  const { revenue, inventory, topProducts } = useContext(ProductContext);
  const chartData = {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Doanh thu (₫)",
        data: topProducts.map((p) => (p.price || 0) * (p.sold || 0)),
        backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₫${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
        <ChartBarIcon className="h-6 w-6 text-black" />
        Trang tổng quan quản trị
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Doanh thu */}
        <div className="p-4 rounded shadow-xl border border-black/40 bg-white hover:bg-gradient-to-br hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300">
          <h2 className="text-sm text-black font-semibold">Doanh thu</h2>
          <p className="text-xl font-semibold text-green-600">
            ₫{revenue.toLocaleString()}
          </p>
        </div>

        {/* Tồn kho */}
        <div className="p-4 rounded shadow-xl border border-black/40 bg-white hover:bg-gradient-to-br hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300">
          <h2 className="text-sm text-black font-semibold">Tồn kho</h2>
          <p className="text-xl font-semibold">{inventory.total} sản phẩm</p>
        </div>

        {/* Hàng sắp hết */}
        <div className="p-4 rounded shadow-xl border border-black/40 bg-white hover:bg-gradient-to-br hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300">
          <h2 className="text-sm text-black font-semibold">Hàng sắp hết</h2>
          <p className="text-xl font-semibold text-red-500">
            {inventory.lowStock}
          </p>
        </div>

        {/* Top bán chạy */}
        <div className="p-4 rounded shadow-xl border border-black/40 bg-white hover:bg-gradient-to-br hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300">
          <h2 className="text-sm text-black font-semibold">Top bán chạy</h2>
          {topProducts.length ? (
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              {topProducts.map((p, i) => (
                <li key={p.id} className="font-semibold">
                  {i + 1} {p.name} ({p.sold} đã bán)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-gray-400 mt-2">Chưa có dữ liệu</p>
          )}
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white p-6 rounded shadow-xl border border-black/40 w-full">
        <h2 className="text-sm text-black mb-4 font-semibold">
          📈 Doanh thu top sản phẩm
        </h2>
        <div className="w-full h-[300px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
