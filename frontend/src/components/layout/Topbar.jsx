import React from 'react';

const Topbar = () => (
  <header className="topbar">
    <div className="user-info">
      <img src="/avatar.png" alt="Avatar" className="avatar" />
      <button className="logout">Đăng Xuất</button>
    </div>
  </header>
);

export default Topbar;