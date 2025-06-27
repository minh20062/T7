import { useState } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; 


export default function LoginForm(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[errorMsg,setErrorMsg]=useState("");
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        setErrorMsg("");

        try{
            const res = await axios.post("/auth/login",{
                email,
                password,
            });

            const {token,user} = res.data;

            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));

            alert("Dang nhap thanh cong!");

            if(user.role == "admin"){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
        }catch(err){
            console.error(err);
            setErrorMsg("Email hoac mat khau khong dung.!");
        }
    };

   return (
     <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>LOGIN</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input
          type="email"
          placeholder="Nhập Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">LOGIN</button>
      </form>
    </div>

  );

}