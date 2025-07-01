const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Đã kết nối MongoDB");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new User({
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Đã tạo user admin@example.com / 123456");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Lỗi khi seed admin:", err);
  }
})();