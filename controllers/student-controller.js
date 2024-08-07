require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const { student } = require("../validators/student-validator");
const prisma = require("../models/db");
const cloudUpload = require("../utils/cloudupload");
const createError = require("../utils/createError");

module.exports.getMajor = async (req, res, next) => {
  const getM = await db.major.findMany({
    include: {
      user: true,
    },
  });
  res.json({ getM });
};
module.exports.getClass = async (req, res, next) => {
  const getC = await db.class.findMany();
  res.json({ getC });
};
exports.getGender = async (req, res, next) => {
  try {
    const getGen = await db.gender.findMany();
    res.json({ getGen });
  } catch (err) {
    next(err);
  }
};
exports.getNationality = async (req, res, next) => {
  try {
    const getNation = await db.nationality.findMany();
    res.json({ getNation });
  } catch (err) {
    next(err);
  }
};
exports.getReligion = async (req, res, next) => {
  try {
    const getReligion = await db.religion.findMany();
    res.json({ getReligion });
  } catch (err) {
    next(err);
  }
};

exports.getETH = async (req, res, next) => {
  try {
    const getETH = await db.ethicity.findMany();
    res.json({ getETH });
  } catch (err) {
    next(err);
  }
};

exports.getProvince = async (req, res, next) => {
  try {
    const getProv = await db.province.findMany({
      orderBy: {
        prov_thainame: "asc",
      },
    });
    res.json({ getProv });
  } catch (err) {
    next(err);
  }
};

exports.getStudent = async (req, res, next) => {
  try {
    let skip = req.query.skip;
    const pageSize = 10;
    skip = skip === -10 ? 0 : +skip;

    const getS = await db.student.findMany({
      include: {
        class: true,
        major: true,
        gender: true,
        nationality: true,
        religion: true,
      },
      skip: skip,
      take: pageSize,
    });

    res.json({ getS });
    // console.log(skip)
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.me = (req, res, next) => {
  const msg = "12";
  res.json({ msg: "1234" });
};

exports.searchData = async (req, res, next) => {
  try {
    const name = req.query.name || "";
    const grade = req.query.grade || "";
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    // console.log(grade)
    const search = decodeURIComponent(name);
    // const lastname = req.query.lastname;
    const getD = await db.student.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                std_name: {
                  contains: search,
                },
              },
              {
                std_lastname: {
                  contains: search,
                },
              },
              {
                std_yearIn: {
                  contains: search,
                },
              },
              {
                std_school: {
                  contains: search,
                },
              },
            ],
          },
          grade !== "" ? { class: { class_id: +grade } } : {},
        ],
      },
      include: {
        class: true,
        major: true,
        gender: true,
        nationality: true,
        religion: true,
        Province: true,
      },
      take: limit,
      skip: skip,
    });
    if (getD.length === 0) {
      return createError(400, "ไม่พบข้อมูล");
    }
    res.json({ getD, skip, limit, page });
    // console.log(getD);
  } catch (err) {
    next(err);
  }
};
// exports.searchYear = async (req, res, next) => {
//   try {
//     const year = req.query.year;

//     // console.log(name);
//     // const lastname = req.query.lastname;
//     const getDY = await db.student.findMany({
//       where: {
//         std_yearIn: {
//           contains: year,
//         },
//       },
//       include: {
//         class: true,
//         major: true,
//         gender: true,
//         nationality: true,
//         religion: true,
//       },
//     });
//     res.json({ getDY });
//     // console.log(getD);
//   } catch (err) {
//     next(err);
//   }
// };
// exports.searchClass = async (req, res, next) => {
//   try {
//     const cls = req.query.cls;

//     // console.log(name);
//     // const lastname = req.query.lastname;
//     const getDC = await db.student.findMany({
//       where: {
//         classId: {
//           equals: 1,
//         },
//       },
//       include: {
//         class: true,
//         major: true,
//         gender: true,
//         nationality: true,
//         religion: true,
//       },
//     });
//     res.json({ getDC });
//     // console.log(getD);
//   } catch (err) {
//     next(err);
//   }
// };
exports.updateData = async (req, res, next) => {
  const { std_id } = req.params;
  const {
    std_yearIn,
    std_school,
    std_grade,
    std_identity,
    std_name,
    std_lastname,
    std_bd,
    std_address,
    std_phone,
    std_email,
    img_profile,
    nation_other,
    religion_other,
    majorId,
    classId,
    gender_id,
    nation_id,
    religion_id,
    eth_id,
    prov_id,
  } = req.body;

  try {
    const getMajor = await db.major.findFirst({
      where: { major_id: +majorId },
    });
    const getClass = await db.class.findFirst({
      where: { class_id: +classId },
    });
    const getGen = await db.gender.findFirst({
      where: { gender_id: +gender_id },
    });
    const getNation = await db.nationality.findFirst({
      where: { nation_id: +nation_id },
    });
    const getReligion = await db.religion.findFirst({
      where: { religion_id: +religion_id },
    });
    const getProv = await db.province.findFirst({
      where: { prov_id: +prov_id },
    });
    const getETH = await db.ethicity.findFirst({
      where: { eth_id: +eth_id },
    });

    const rs = await db.student.update({
      data: {
        std_yearIn,
        std_school,
        std_grade,
        std_identity,
        std_name,
        std_lastname,
        std_bd,
        std_address,
        std_phone,
        std_email,
        img_profile,
        nation_other,
        religion_other,
        major: { connect: { major_id: getMajor.major_id } },
        class: { connect: { class_id: getClass.class_id } },
        gender: { connect: { gender_id: getGen.gender_id } },
        nationality: { connect: { nation_id: getNation.nation_id } },
        religion: { connect: { religion_id: getReligion.religion_id } },
        ethicity: { connect: { eth_id: getETH.eth_id } },
        Province: { connect: { prov_id: getProv.prov_id } },
      },
      where: { std_id: Number(std_id) },
    });

    res.json({ message: "UPDATE", result: rs });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const { std_id } = req.params;
  const { status } = req.body;
  try {
    const rs = await db.student.update({
      data: {
        status,
      },
      where: { std_id: Number(std_id) },
    });
    console.log(rs);
    res.json({ message: "UPDATE Status", result: rs });
  } catch (err) {
    next(err);
  }
};
exports.rejectStatus = async (req, res, next) => {
  const { std_id } = req.params;
  const { status } = req.body;
  try {
    const rs = await db.student.update({
      data: {
        status,
      },
      where: { std_id: Number(std_id) },
    });
    console.log(rs);
    res.json({ message: "UPDATE Status", result: rs });
  } catch (err) {
    next(err);
  }
};

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

exports.studentCreate = async (req, res, next) => {
  try {
    // console.log("1234")
    const value = await student.validateAsync(req.body);

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);
    const {
      classId,
      majorId,
      gender_id,
      nation_id,
      status,
      religion_id,
      eth_id,
      std_email,
      prov_id,
    } = req.body;
    // console.log("Received status:", status);
    const stdCreate = await prisma.student.create({
      data: {
        ...value,
        user: {
          connect: {
            user_id: req.user.user_id,
          },
        },
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
        gender: {
          connect: {
            gender_id: Number(gender_id),
          },
        },
        nationality: {
          connect: {
            nation_id: Number(nation_id),
          },
        },
        religion: {
          connect: {
            religion_id: Number(religion_id),
          },
        },
        ethicity: {
          connect: {
            eth_id: Number(eth_id),
          },
        },
        Province: {
          connect: {
            prov_id: Number(prov_id),
          },
        },
        status,

        img_profile: imageUrlArray[0],
        std_email: std_email || "null",
      },
    });
    res.json({ stdCreate, Message: "สมัครสอบเสร็จสิ้น" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.showSTDbyUser = async (req, res, next) => {
  try {
    const showstd = await db.student.findMany({
      include: {
        class: true,
        major: true,
      },
      where: {
        user_id: req.user.user_id,
      },
    });
    res.json({ showstd });
  } catch (err) {
    next(err);
  }
};

exports.MajorAdd = async (req, res, next) => {
  const { major_type } = req.body;
  const duplicatemajor = await db.major.findFirst({
    where: { major_type },
  });
  if (duplicatemajor) {
    return res.status(400).json({ message: "มีสาขานี้อยู่แล้ว" });
  } 
  else {
    try {
      const data = {
        major_type: major_type,
        user: {
          connect: {
            user_id: req.user.user_id,
          },
        },
      };
      const rs = await db.major.create({ data: data });
      // console.log(rs)
      res.json({ message: "เพิ่มสายการเรียนเรียบร้อย" });
    } catch (err) {
      next(err);
    }
  }
};

exports.UpdateMajor = async (req, res, next) => {
  const { major_id } = req.params;
  const { major_type } = req.body;
  const duplicatemajor = await db.major.findFirst({
    where: { major_type },
  });
  if (duplicatemajor) {
    return res.status(400).json({ message: "มีสาขานี้อยู่แล้ว" });
  }
  try {
    const rs = await db.major.update({
      data: {
        major_type,
      },
      where: { major_id: Number(major_id) },
    });
    res.json({ message: "แก้ไขเรียบร้อย", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.Delmajor = async (req, res, next) => {
  try {
    const { major_id } = req.params;
    const Delm = await prisma.major.delete({
      where: {
        major_id: +major_id,
      },
    });
    res.json({ result: Delm });
  } catch (err) {
    next(err);
  }
};
