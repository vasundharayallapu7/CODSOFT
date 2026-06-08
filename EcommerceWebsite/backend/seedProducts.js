const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "iPhone 15",
    description: "Apple Smartphone",
    price: 79999,
    category: "Mobiles",
    image: "/images/iphone15.jpg"
  },
  {
    name: "Samsung S25",
    description: "Samsung Flagship Phone",
    price: 65000,
    category: "Mobiles",
    image: "/images/samsungs25.jpg"
  },
  {
    name: "OnePlus 13",
    description: "5G Smartphone",
    price: 49999,
    category: "Mobiles",
    image: "/images/oneplus13.jpg"
  },
  {
    name: "Google Pixel 9",
    description: "Android Smartphone",
    price: 69999,
    category: "Mobiles",
    image: "/images/pixel9.jpg"
  },
  {
    name: "Xiaomi 15",
    description: "Flagship Android Phone",
    price: 54999,
    category: "Mobiles",
    image: "/images/xiaomi15.jpg"
  },
  {
    name: "Dell Inspiron 15",
    description: "15.6 inch Laptop",
    price: 55000,
    category: "Laptops",
    image: "/images/dell.jpg"
  },
  {
    name: "HP Pavilion",
    description: "Gaming Laptop",
    price: 72000,
    category: "Laptops",
    image: "/images/hp.jpg"
  },
  {
    name: "ASUS VivoBook 15",
    description: "Thin and Lightweight Laptop",
    price: 48000,
    category: "Laptops",
    image: "/images/asus.jpg"
  },
  {
    name: "Lenovo ThinkPad",
    description: "Business Laptop",
    price: 68000,
    category: "Laptops",
    image: "/images/lenovo.jpg"
  },
  {
    name: "Boat Earbuds",
    description: "Wireless Earbuds",
    price: 2999,
    category: "Accessories",
    image: "/images/boat.jpg"
  },
  {
    name: "Apple Watch Series 10",
    description: "Smart Watch",
    price: 39999,
    category: "Accessories",
    image: "/images/applewatch.jpg"
  },
  {
    name: "Logitech MX Master 3S",
    description: "Wireless Mouse",
    price: 8999,
    category: "Accessories",
    image: "/images/logitech.jpg"
  },
  {
    name: "Samsung Galaxy Tab S10",
    description: "Android Tablet",
    price: 45999,
    category: "Accessories",
    image: "/images/tabs10.jpg"
  },
  {
    name: "iPad Air",
    description: "Apple Tablet",
    price: 59999,
    category: "Accessories",
    image: "/images/ipadair.jpg"
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();