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
