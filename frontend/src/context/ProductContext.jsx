import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [inventory, setInventory] = useState({ total: 0, lowStock: 0 });
  const [topProducts, setTopProducts] = useState([]);

  // Đọc dữ liệu từ localStorage nếu có
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
      setLoading(false);
    } else {
      // Nếu không có: gọi API
      axios
        .get("https://api.minhcompany.com/products")
        .then((res) => {
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data)); // lưu local
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi lấy sản phẩm:", err);
          setLoading(false);
        });
    }
  }, []);

  // Cập nhật localStorage mỗi khi products thay đổi
  useEffect(() => {
    if (!products.length) return;

    // Tổng doanh thu
    const doanhThu = products.reduce(
      (sum, p) => sum + (p.price || 0) * (p.sold || 0),
      0
    );
    setRevenue(doanhThu);

    // Tồn kho
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStockCount = products.filter((p) => (p.stock || 0) < 5).length;
    setInventory({ total: totalStock, lowStock: lowStockCount });

    // Top sản phẩm bán chạy
    const top = [...products]
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 5);
    setTopProducts(top);

    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        setProducts,
        revenue,
        inventory,
        topProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
