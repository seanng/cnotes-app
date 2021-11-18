import S3 from 'react-aws-s3'

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME
const region = process.env.NEXT_PUBLIC_S3_REGION

export default function s3(options) {
  return new S3({
    bucketName,
    region,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    s3Url: `https://${bucketName}.s3.${region}.amazonaws.com`,
    ...options,
  })
}
