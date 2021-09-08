import S3 from 'react-aws-s3'

export default function s3(options) {
  return new S3({
    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_S3_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    ...options,
  })
}
