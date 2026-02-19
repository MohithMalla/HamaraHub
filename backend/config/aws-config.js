import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Load env vars before doing anything else
dotenv.config(); 

AWS.config.update({
    region: "ap-south-1",
    // Explicitly map the credentials (in case auto-detection fails)
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const S3_BUCKET = process.env.S3_BUCKET;

export { s3, S3_BUCKET };