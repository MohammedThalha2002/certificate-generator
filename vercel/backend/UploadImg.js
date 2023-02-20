const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpvfbd55u",
  api_key: "914661449734578",
  api_secret: "JPpA2DBzLIKkvPvAywKdGYtHrFo"
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports = uploadImage;
