require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const { student } = require("../validators/student-validator");
const prisma = require("../models/db");
const cloudUpload = require("../utils/cloudupload");
const createError = require("../utils/createError");



module.exports.getMajor = async (req, res, next) => {
  const getM = await db.major.findMany();
  res.json({ getM });
};
module.exports.getClass = async (req, res, next) => {
  const getC = await db.class.findMany();
  res.json({ getC });
};

exports.getStudent = async (req, res, next) => {
  const getS = await db.student.findMany({
    include: {
      class: true,
      major: true,
    },
  });
  res.json({ getS });
};

exports.me = (req, res, next) => {
  const msg = "12";
  res.json({ msg: "1234" });
};

exports.searchData = async (req, res, next) => {
  try {
    const { search } = req.body;
    const getD = await db.student.findMany({
      where: {
        std_name: search,
      },
      include: {
        class: true,
        major: true,
      },
    });
    res.json({ getD });
    console.log(getD);
  } catch (err) {
    next(err);
  }
};
exports.updateData = async (req, res, next) => {
  const { std_id } = req.params;
  const {
    std_identity,
    std_name,
    std_lastname,
    std_bd,
    std_address,
    std_phone,
    std_email,
    std_grade,
    img_profile,
    img_grade,
    majorId,
    classId,
  } = req.body;
  // console.log(req.user)
  // console.log(req.params)
  // console.log(req.body);
  try {
    const rs = await db.student.update({
      data: {
        std_identity,
        std_name,
        std_lastname,
        std_bd,
        std_address,
        std_phone,
        std_email,
        std_grade,
        img_profile,
        img_grade,
        majorId,
        classId,
      },
      where: { std_id: Number(std_id) },
    });
    // console.log(rs);
    res.json({ message: "UPDATE", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async(req, res, next)=> {
  const { std_id } = req.params;
  const {
    status
  } = req.body
  try{
const rs = await db.student.update({
  data: {
    status,
  },
  where: { std_id: Number(std_id) },
})
console.log(rs)
res.json({ message: "UPDATE Status", result: rs });
  }catch(err){
    next(err)
  }
}
exports.rejectStatus = async(req, res, next)=> {
  const { std_id } = req.params;
  const {
    status
  } = req.body
  try{
const rs = await db.student.update({
  data: {
    status,
  },
  where: { std_id: Number(std_id) },
})
console.log(rs)
res.json({ message: "UPDATE Status", result: rs });
  }catch(err){
    next(err)
  }
}

exports.delData = async (req, res, next) => {
  try {
    const { std_id } = req.params;
    console.log(std_id);
    const delStd = await prisma.student.delete({
      where: {
        std_id: Number(std_id),
      },
    });
    res.json({ result: delStd });
  } catch (err) {
    console.log(err);
    // next(err)
  }
};

module.exports.studentCreate = async (req, res, next) => {
  try {
    const value = await student.validateAsync(req.body);

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);
    const { classId, majorId, status } = req.body;
    // console.log("Received status:", status);
    const stdCreate = await prisma.student.create({
      data: {
        ...value,
        class: {
          connect: {
            class_id: Number(classId),
          },
        },
        major: {
          connect: {
            major_id: Number(majorId),
          },
        },
        status,

        img_profile: imageUrlArray[0],
      },
    });
    res.json({ stdCreate, Message: "สมัครสอบเสร็จสิ้น" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

