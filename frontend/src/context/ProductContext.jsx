import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);
  const [inventory, setInventory] = useState({ total: 0, lowStock: 0 });
  const [topProducts, setTopProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  // ✅ Đọc products từ localStorage hoặc API
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
      setLoading(false);
    } else {
      axios
        .get("https://api.minhcompany.com/products")
        .then((res) => {
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi lấy sản phẩm:", err);
          setLoading(false);
        });
    }
  }, []);

  // ✅ Cập nhật products → tính toán & ghi localStorage
  useEffect(() => {
    if (!products.length) {
      setRevenue(0);
      setInventory({ total: 0, lowStock: 0 });
      setTopProducts([]);
      return;
    }

    localStorage.setItem("products", JSON.stringify(products));

    const doanhThu = products.reduce(
      (sum, p) => sum + (p.price || 0) * (p.sold || 0),
      0
    );
    setRevenue(doanhThu);

    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStockCount = products.filter((p) => (p.stock || 0) < 5).length;
    setInventory({ total: totalStock, lowStock: lowStockCount });

    const top = [...products]
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 5);
    setTopProducts(top);
  }, [products]);

  // ✅ Đọc manufacturers từ localStorage khi init
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("manufacturers")) || [];
    setManufacturers(saved);
  }, []);

  // ✅ Ghi manufacturers mọi lúc thay đổi (kể cả mảng rỗng)
  useEffect(() => {
    localStorage.setItem("manufacturers", JSON.stringify(manufacturers));
  }, [manufacturers]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        setProducts,
        revenue,
        inventory,
        topProducts,
        manufacturers,
        setManufacturers,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
