require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.S3_BUCKET_NAME;
console.log(bucketName);
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// upload file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + '.jpeg',
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

//download file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,

    Key: fileKey,
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
