const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("123456");
const userData = [
  
]

const todoData = [

];

const run = async () => {
  // await prisma.todo.deleteMany({});
  // await prisma.user.deleteMany({});

  await prisma.user.createMany({
    data: userData,
  });

  await prisma.todo.createMany({
    data: todoData,
  });
};

run();
