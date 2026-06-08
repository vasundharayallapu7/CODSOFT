const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("./models/Job");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Job.deleteMany({});

    await Job.insertMany([
      {
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Hyderabad",
        salary: "₹6 LPA",
        description: "React developer with JavaScript knowledge.",
      },
      {
        title: "Backend Developer",
        company: "CodeWorks",
        location: "Bangalore",
        salary: "₹8 LPA",
        description: "Node.js and MongoDB developer.",
      },
      {
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Chennai",
        salary: "₹5 LPA",
        description: "Design user-friendly web interfaces.",
      },
      {
        title: "Full Stack Developer",
        company: "InnovateX",
        location: "Pune",
        salary: "₹10 LPA",
        description: "MERN Stack developer required.",
      },
      {
        title: "Software Engineer",
        company: "Infosys",
        location: "Hyderabad",
        salary: "₹7 LPA",
        description: "Develop and maintain web applications.",
      },
    ]);

    console.log("Sample jobs inserted successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });