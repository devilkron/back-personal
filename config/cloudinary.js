const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'docrzu4gx', 
  api_key: '783641815187392', 
  api_secret: process.env.CLOUDINARY_SECRET 
});

module.exports = cloudinary