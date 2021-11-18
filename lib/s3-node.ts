import AWS from 'aws-sdk'
import axios from 'axios'
import S3UploadStream from 's3-upload-stream'

AWS.config.update({ region: process.env.NEXT_PUBLIC_S3_REGION })
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
})

const getUploadParams = (dir, fileName) => ({
  Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
  ContentType: 'image/jpeg',
  Key: `${dir}/${fileName}`,
  ACL: 'public-read',
})

// Upload a file from url piped to s3
export async function uploadUrl(url, dir, fileName = new Date().toString()) {
  if (!dir || !url) {
    throw new Error('file and url must be provided.')
  }
  const params = getUploadParams(dir, fileName)
  const upload = S3UploadStream(new AWS.S3()).upload(params)

  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(upload)

  return new Promise((resolve, reject) => {
    upload.on('uploaded', resolve)
    upload.on('error', reject)
  })
}

// export async function uploadFile(file, dir, fileName = new Date().toString()) {
//   if (!dir || !file) {
//     throw new Error('file and dir must be provided.')
//   }
//   const params = getUploadParams(dir, fileName)

//   return new Promise((resolve, reject) =>
//     new AWS.S3().upload(params, function (err, data) {
//       console.log('err: ', err)
//       if (err) reject(err)
//       console.log('data: ', data)
//       resolve(data)
//     })
//   )
// }
