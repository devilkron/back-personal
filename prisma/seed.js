const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { date } = require("joi");
const { province } = require("../models/db");

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
  { major_type: "วิทย์คณิต" , user_id: 1},
  { major_type: "ศิลป์คำนวณ", user_id: 1 },
  { major_type: "ศิลป์ภาษา", user_id: 1 },
  
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

const provinceData = [
  { prov_name: 'Bangkok', prov_thainame: 'กรุงเทพมหานคร' },
  { prov_name: 'Samut Prakan', prov_thainame: 'สมุทรปราการ' },
  { prov_name: 'Nonthaburi', prov_thainame: 'นนทบุรี' },
  { prov_name: 'Pathum Thani', prov_thainame: 'ปทุมธานี' },
  { prov_name: 'Phra Nakhon Si Ayutthaya', prov_thainame: 'พระนครศรีอยุธยา' },
  { prov_name: 'Ang Thong', prov_thainame: 'อ่างทอง' },
  { prov_name: 'Lop Buri', prov_thainame: 'ลพบุรี' },
  { prov_name: 'Sing Buri', prov_thainame: 'สิงห์บุรี' },
  { prov_name: 'Chai Nat', prov_thainame: 'ชัยนาท' },
  { prov_name: 'Saraburi', prov_thainame: 'สระบุรี' },
  { prov_name: 'Chon Buri', prov_thainame: 'ชลบุรี' },
  { prov_name: 'Rayong', prov_thainame: 'ระยอง' },
  { prov_name: 'Chanthaburi', prov_thainame: 'จันทบุรี' },
  { prov_name: 'Trat', prov_thainame: 'ตราด' },
  { prov_name: 'Chachoengsao', prov_thainame: 'ฉะเชิงเทรา' },
  { prov_name: 'Prachin Buri', prov_thainame: 'ปราจีนบุรี' },
  { prov_name: 'Nakhon Nayok', prov_thainame: 'นครนายก' },
  { prov_name: 'Sa Kaeo', prov_thainame: 'สระแก้ว' },
  { prov_name: 'Nakhon Ratchasima', prov_thainame: 'นครราชสีมา' },
  { prov_name: 'Buri Ram', prov_thainame: 'บุรีรัมย์' },
  { prov_name: 'Surin', prov_thainame: 'สุรินทร์' },
  { prov_name: 'Si Sa Ket', prov_thainame: 'ศรีสะเกษ' },
  { prov_name: 'Ubon Ratchathani', prov_thainame: 'อุบลราชธานี' },
  { prov_name: 'Yasothon', prov_thainame: 'ยโสธร' },
  { prov_name: 'Chaiyaphum', prov_thainame: 'ชัยภูมิ' },
  { prov_name: 'Amnat Charoen', prov_thainame: 'อำนาจเจริญ' },
  { prov_name: 'Bueng Kan', prov_thainame: 'บึงกาฬ' },
  { prov_name: 'Nong Bua Lam Phu', prov_thainame: 'หนองบัวลำภู' },
  { prov_name: 'Khon Kaen', prov_thainame: 'ขอนแก่น' },
  { prov_name: 'Udon Thani', prov_thainame: 'อุดรธานี' },
  { prov_name: 'Loei', prov_thainame: 'เลย' },
  { prov_name: 'Nong Khai', prov_thainame: 'หนองคาย' },
  { prov_name: 'Maha Sarakham', prov_thainame: 'มหาสารคาม' },
  { prov_name: 'Roi Et', prov_thainame: 'ร้อยเอ็ด' },
  { prov_name: 'Kalasin', prov_thainame: 'กาฬสินธุ์' },
  { prov_name: 'Sakon Nakhon', prov_thainame: 'สกลนคร' },
  { prov_name: 'Nakhon Phanom', prov_thainame: 'นครพนม' },
  { prov_name: 'Mukdahan', prov_thainame: 'มุกดาหาร' },
  { prov_name: 'Chiang Mai', prov_thainame: 'เชียงใหม่' },
  { prov_name: 'Lamphun', prov_thainame: 'ลำพูน' },
  { prov_name: 'Lampang', prov_thainame: 'ลำปาง' },
  { prov_name: 'Uttaradit', prov_thainame: 'อุตรดิตถ์' },
  { prov_name: 'Phrae', prov_thainame: 'แพร่' },
  { prov_name: 'Nan', prov_thainame: 'น่าน' },
  { prov_name: 'Phayao', prov_thainame: 'พะเยา' },
  { prov_name: 'Chiang Rai', prov_thainame: 'เชียงราย' },
  { prov_name: 'Mae Hong Son', prov_thainame: 'แม่ฮ่องสอน' },
  { prov_name: 'Nakhon Sawan', prov_thainame: 'นครสวรรค์' },
  { prov_name: 'Uthai Thani', prov_thainame: 'อุทัยธานี' },
  { prov_name: 'Kamphaeng Phet', prov_thainame: 'กำแพงเพชร' },
  { prov_name: 'Tak', prov_thainame: 'ตาก' },
  { prov_name: 'Sukhothai', prov_thainame: 'สุโขทัย' },
  { prov_name: 'Phitsanulok', prov_thainame: 'พิษณุโลก' },
  { prov_name: 'Phichit', prov_thainame: 'พิจิตร' },
  { prov_name: 'Phetchabun', prov_thainame: 'เพชรบูรณ์' },
  { prov_name: 'Ratchaburi', prov_thainame: 'ราชบุรี' },
  { prov_name: 'Kanchanaburi', prov_thainame: 'กาญจนบุรี' },
  { prov_name: 'Suphan Buri', prov_thainame: 'สุพรรณบุรี' },
  { prov_name: 'Nakhon Pathom', prov_thainame: 'นครปฐม' },
  { prov_name: 'Samut Sakhon', prov_thainame: 'สมุทรสาคร' },
  { prov_name: 'Samut Songkhram', prov_thainame: 'สมุทรสงคราม' },
  { prov_name: 'Phetchaburi', prov_thainame: 'เพชรบุรี' },
  { prov_name: 'Prachuap Khiri Khan', prov_thainame: 'ประจวบคีรีขันธ์' },
  { prov_name: 'Nakhon Si Thammarat', prov_thainame: 'นครศรีธรรมราช' },
  { prov_name: 'Krabi', prov_thainame: 'กระบี่' },
  { prov_name: 'Phang Nga', prov_thainame: 'พังงา' },
  { prov_name: 'Phuket', prov_thainame: 'ภูเก็ต' },
  { prov_name: 'Surat Thani', prov_thainame: 'สุราษฎร์ธานี' },
  { prov_name: 'Ranong', prov_thainame: 'ระนอง' },
  { prov_name: 'Chumphon', prov_thainame: 'ชุมพร' },
  { prov_name: 'Songkhla', prov_thainame: 'สงขลา' },
  { prov_name: 'Satun', prov_thainame: 'สตูล' },
  { prov_name: 'Trang', prov_thainame: 'ตรัง' },
  { prov_name: 'Phatthalung', prov_thainame: 'พัทลุง' },
  { prov_name: 'Pattani', prov_thainame: 'ปัตตานี' },
  { prov_name: 'Yala', prov_thainame: 'ยะลา' },
  { prov_name: 'Narathiwat', prov_thainame: 'นราธิวาส' }
]

const run = async () => {
  // await prisma.todo.deleteMany({});
  // await prisma.user.deleteMany({});
  for (const {prov_name,prov_thainame} of provinceData) {
    await prisma.province.create({
      data: { prov_name, prov_thainame },
    });
  }
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
