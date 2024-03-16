require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../models/db");

exports.register = async (req, res, next) => {
  const { identity, name,lastname ,email ,password ,confirmPassword} = req.body;
  try {
    
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    // console.log(hased);

    const data = {
      user_identity : identity, 
      user_name: name,
      user_lastname: lastname,
      user_email: email,
      user_password: hased,
      user_role: "GUEST"
    };
    //                                db  / const db
    const rs = await db.user.create({ data: data });
    // console.log(rs);

    res.json({ message: "Register SUCCESSFUL!!!" });
  } catch (err) {
    next(err);
  }
};
exports.getUserById = async(req, res , next) => {
  try {
    const { user_id } = req.params;
    const rs = await db.user.findFirst({
      where:{ user_id: Number(user_id)}
    })
  }catch(err){
    next(err)
  }
}
exports.showSTDbyUser = async( req, res, next) => {
  try{

    const showstd = await db.student.findMany({
      include: {
        class: true,
        major: true,
      },
      where:{
        user_id: req.user.user_id
      }

    });
    res.json({showstd})
  }catch(err){
    next(err)
  }
}
exports.showDtById = async (req,res, next )=> {
  try{
    
    const {std_id} = req.params; 

    const showDt = await db.student.findFirst({
      where:{
        std_id: +std_id,
      },
      include:{
        class: true,
        major: true,
      }
    })
    // console.log(std_id)
    res.json({showDt})
  }catch(err){
    next(err)
  }
}
exports.dashGet = async (req,res,next) => {
  try{
    const dashGet = await db.student.findMany({
      include: {
        class: true,
        major: true
      }
    })
    const dashSec1 = await db.student.findMany({
      where: {
        class: {
          class_type: "SECONDARY1"
        }
      }
    })
    const dashSec2 = await db.student.findMany({
      where: {
        class: {
          class_type: "SECONDARY2"
        }
      }
    })
    const dashMATHSCI = await db.student.findMany({
      where:{
        major: {
          major_type: "MATHSCI"
        }
      }
    })
    const dashARTSOC= await db.student.findMany({
      where:{
        major: {
          major_type: "ARTSOC"
        }
      }
    })
    const dashARTFREE = await db.student.findMany({
      where:{
        major: {
          major_type: "ARTFREE"
        }
      }
    })
    const dashARTENG = await db.student.findMany({
      where:{
        major: {
          major_type: "ARTENG"
        }
      }
    })
    const dashARTMATH = await db.student.findMany({
      where:{
        major: {
          major_type: "ARTMATH"
        }
      }
    })
    const countMATHSCI = dashMATHSCI.length
    const countARTMATH = dashARTMATH.length
    const countARTENG= dashARTENG.length
    const countARTSOC= dashARTSOC.length
    const countARTFREE= dashARTFREE.length
    const countClass2 = dashSec2.length
    const countClass = dashSec1.length
    const count = dashGet.length;
    // console.log(dashGet)
    res.json({count,countClass,countClass2,countMATHSCI,countARTENG,countARTFREE,countARTSOC,countARTMATH})
  }catch(err){
    next(err)
  }
}
