import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-4">Tổng quan</h1>
          {/* Nơi bạn thêm các card thống kê, biểu đồ, v.v. */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;