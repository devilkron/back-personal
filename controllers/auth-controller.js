require("dotenv").config()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

exports.register = async (req, res, next) => {
  const { identity, name, lastname,gender_id, email, password, confirmPassword,role } =
    req.body;
  try {
    if (confirmPassword !== password) {
      throw new Error("password not match");
    }
    const hased = await bcrypt.hash(password, 8);
    // console.log(hased);

    const data = {
      user_identity: identity,
      user_name: name,
      user_lastname: lastname,
      user_role : role,
      user_email: email,
      user_password: hased,
      gender: {
        connect: {
          gender_id: Number(gender_id),
        },
      },
    };
    //                                db  / const db
    const rs = await db.user.create({ data: data });
    // console.log(rs);

    res.json({ message: "Register SUCCESSFUL!!!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validation
    if (!(email.trim() && password.trim())) {
      throw new Error("Please Enter your input");
    }
    //find username in db.user
    const user = await db.user.findFirstOrThrow({
      where: { user_email: email },
    });
    if (user.user_role === "ADMIN") {
      throw new Error("ไม่อนุญาต");
    }
    //check password
    const pwOK = await bcrypt.compare(password, user.user_password);
    if (!pwOK) {
      throw new Error("Invaild login");
    }

    //issue jwt token
    const payload = { id: user.user_id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {});
    // console.log(payload)
    // console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.adminlogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validation
    if (!(email.trim() && password.trim())) {
      throw new Error("Please Enter your input");
    }
    //find username in db.user
    const user = await db.user.findFirstOrThrow({
      where: { user_email: email },
    });
    if (user.user_role === "STUDENT" && "PARENT") {
      throw new Error("ไม่อนุญาต");
    }
    //check password

    const pwOK = await bcrypt.compare(password, user.user_password);
    if (!pwOK) {
      throw new Error("Invaild login");
    }

    //issue jwt token
    const payload = { id: user.user_id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {});
    // console.log(payload)
    // console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.GETME = async(req, res, next) => {
 
  res.json(req.user);
};

exports.updateUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { user_name, user_lastname, user_email, user_identity } = req.body;
  // console.log(req.body)
  try{
    const rs = await db.user.update({
      data: {
        user_name,
        user_lastname,
        user_email,
        user_identity
      },
      where: {user_id: Number(user_id)}
    })
    res.json({message: "UPDATE", result: rs})
  }catch(err){
    next(err)
  }
};

