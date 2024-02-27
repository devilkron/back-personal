const clodinary = require("../config/cloudinary")

const cloudUpload = async(path) => {
    const res = await clodinary.uploader.upload(path)
    return res.secure_url

}

module.exports = cloudUpload