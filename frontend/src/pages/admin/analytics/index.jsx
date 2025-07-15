import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext"; // đường dẫn chỉnh theo vị trí
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

export default function Analytics() {
  const { revenue, inventory, topProducts } = useContext(ProductContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
       <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-600" />
        Thống kê
      </h1>

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
            <p className="text-sm italic text-gray-400 mt-2">
              Chưa có sản phẩm bán nào
            </p>
          )}
        </div>
      </div>

      {/* Biểu đồ doanh thu, truy cập theo ngày vẫn có thể giữ nguyên hoặc tích hợp chart sau */}
    </div>
  );
}
