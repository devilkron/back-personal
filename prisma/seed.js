const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("1234");
const userData = [
  {
    user_name: "Korn",
    user_lastname: "EiEi",
    user_email: "k@mail.com",
    user_identity: "1234567891234",
    user_password: password,
    user_role: "ADMIN",
    user_gender: "MR"
  },
  {
    user_name: "group",
    user_lastname: "EiEi",
    user_email: "go@mail.com",
    user_identity: "8975542343460",
    user_password: password,
    user_role: "STUDENT",
    user_gender: "BOY"
  },
  {
    user_name: "Parent",
    user_lastname: "Parent",
    user_email: "parent@mail.com",
    user_identity: "1234576902346",
    user_password: password,
    user_role: "PARENT",
    user_gender: "MISS"
  },
];

const majorData = [
  { major_type: "MATHSCI" },
  { major_type: "ARTMATH" },
  { major_type: "ARTENG" },
  { major_type: "ARTSOC" },
  { major_type: "ARTFREE" },
];
const classData = [{ class_type: "SECONDARY1" }, { class_type: "SECONDARY2" }];
const genderData = [
  { gender_type: "MR" },
  { gender_type: "MRS" },
  { gender_type: "MISS" },
  { gender_type: "BOY" },
  { gender_type: "GIRL" },
];

const run = async () => {
  // await prisma.todo.deleteMany({});
  // await prisma.user.deleteMany({});

  await prisma.gender.createMany({
    data: genderData,
  });
  await prisma.user.createMany({
    data: userData,
  });

  await prisma.major.createMany({
    data: majorData,
  });
  await prisma.class.createMany({
    data: classData,
  });
};

run();
