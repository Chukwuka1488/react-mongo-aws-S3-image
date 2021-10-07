// to enable delete file in the upload folder in the backend
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const User = require('../models/userModels');

const { uploadFile, getFileStream } = require('./s3');

exports.setProfilePic = async (req, res, next) => {
  const { photoUrl } = req.body;
  const file = req.file;
  // console.log(file);
  console.log('🤝');
  const uploadResult = await uploadFile(file);
  console.log('*********************');

  try {
    let newPhoto = new User({
      photoUrl,
    });
    newPhoto = await newPhoto.save();
    const mongoFile = await User.create({ photoUrl: uploadResult.Location });
    console.log(mongoFile);
    await unlinkFile(file.path);

    console.log('*********************');
    console.log(uploadResult);
    console.log('*********************');

    res.send({ imagePath: `/images/${uploadResult.Key}` }).json({
      status: 201,
      newPhoto,
    });
  } catch (error) {
    console.log(error);
  }
};
