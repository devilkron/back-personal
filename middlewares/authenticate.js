const jwt = require("jsonwebtoken");
const db = require("../models/db");
require('dotenv').config();


module.exports = async (req, res, next) => {
    try{
      // console.log('TEST');
        const {authorization} = req.headers;
        if (!authorization) {
          throw new Error("Unauthorized");
        }

        if (!(authorization.startsWith("Bearer"))) {
          throw new Error("Unauthorized");
        }

        const token = authorization.split(" ")[1];
        // console.log(req.headers)

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token);
      
      
        const user = await db.user.findFirst({ where: { user_id: payload.id } });
        // console.log(user)


        delete user.user_password;
        // console.log(admin)
        req.user = user;
        // res.json(req.user)
        next()
        
    }catch(err){
        next(err)
    }
};
