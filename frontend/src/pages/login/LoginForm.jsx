import { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    console.log("Đang login với:", email, password);

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Đăng nhập thành công!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/assets/logo.jpg" alt="Logo" className="logo-img" />
        <span className="brand-name">MINHCOMPANY</span>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>ĐĂNG NHẬP</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ĐĂNG NHẬP</button>
      </form>
    </div>
  );
}