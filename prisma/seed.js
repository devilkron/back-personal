const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { date } = require("joi");

const password = bcrypt.hashSync("1234");
const userData = [
  {
    user_name: "Korn",
    user_lastname: "EiEi",
    user_email: "k@mail.com",
    user_identity: "1234567891234",
    user_password: password,
    user_role: "ADMIN",
    gender_id: 1,
  },
  {
    user_name: "group",
    user_lastname: "EiEi",
    user_email: "go@mail.com",
    user_identity: "8975542343460",
    user_password: password,
    user_role: "STUDENT",
    gender_id: 4,
  },
  {
    user_name: "Parent",
    user_lastname: "Parent",
    user_email: "parent@mail.com",
    user_identity: "1234576902346",
    user_password: password,
    user_role: "PARENT",
    gender_id : 3,
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
//สัญชาติ
const nationalityData = [
  {nation_name: "THAI"},
  {nation_name: "OTHER"},
];
//ศาสนา
const religionData = [
  {religion_name: "buddhism"},
  {religion_name: "Christian"},
  {religion_name: "Islam"},
  {religion_name: "OTHER"}
]
//เชื้อชาติ
const ethicityData = [
  {eth_name: "THAI"},
  {eth_name: "OTHER"}
]

const run = async () => {
  // await prisma.todo.deleteMany({});
  // await prisma.user.deleteMany({});
  await prisma.ethicity.createMany({
    data: ethicityData
  })
  await prisma.religion.createMany({
    data: religionData,
  })
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
  await prisma.nationality.createMany({
    data:nationalityData
  })
};

run();
