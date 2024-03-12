const Joi = require('joi')
const joi = require('joi')

exports.student = joi.object({
    std_identity: joi.string().required(),
    std_name: joi.string().required(),
    std_lastname : joi.string().required(),
    std_bd: joi.date().required(),
    std_address: joi.string().required(),
    std_phone : joi.string().required(),
    std_email: joi.string().required(),
    img_profile: joi.string().empty('').default("https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png"),
    status: joi.string().required(),
    classId : joi.number().required().strip(),
    majorId : joi.number().required().strip(),
    user_id : Joi.number().required().strip()
})