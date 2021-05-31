const fs = require("fs");
const path = require("path");

module.exports = function () {
  const obj = {
    admin: {
      email: process.env.DEV_EMAIL ?? "admin@laravel.com",
      password: "password",
    },
    student: {
      email: process.env.STUDENT_EMAIL ?? "student@app.com",
      password: "password",
    },
  };
  fs.writeFileSync(path.resolve("./views/email.json"), JSON.stringify(obj));
};
