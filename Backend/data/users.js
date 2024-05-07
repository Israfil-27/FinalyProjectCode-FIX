import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Admin User",
    email: "Israfilav@code.edu.az",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Elgun User",
    email: "Elgun@code.edu.az",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Elxan User",
    email: "Elxan@code.edu.az",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default Users