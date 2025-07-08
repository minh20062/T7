import React, { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

export default function Revenue() {
  const { products, revenue } = useContext(ProductContext);

  const getRevenue = (product) => product.price * (product.sold || 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        💰 Thống kê doanh thu
      </h1>

      {/* Tổng doanh thu */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Tổng doanh thu:
          <span className="text-green-600 ml-2">
            ₫{revenue.toLocaleString()}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          Dựa trên số lượng sản phẩm đã bán × đơn giá.
        </p>
      </div>

      {/* Bảng doanh thu */}
      <table className="min-w-full text-sm bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-500 uppercase">
          <tr>
            <th className="p-3 text-left">Sản phẩm</th>
            <th className="p-3 text-left">Giá</th>
            <th className="p-3 text-left">Đã bán</th>
            <th className="p-3 text-left">Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₫{p.price.toLocaleString()}</td>
              <td className="p-3">{p.sold || 0}</td>
              <td className="p-3 text-green-600 font-semibold">
                ₫{getRevenue(p).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}