const router = require('express').Router();
// allows for image upload
const multer = require('multer');
// destination to upload
const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController');

router.post(
  '/setProfilePic',
  upload.single('croppedImage'),
  userController.setProfilePic
);
// router.get('/setProfilePic', userController.setProfilePic);
module.exports = router;
