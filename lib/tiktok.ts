import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { PortfolioItem } from 'shared/types'
import { uploadUrl } from 'lib/s3-node'

export const getTiktokData = async (
  urls: string[]
): Promise<PortfolioItem[]> => {
  if (!urls || urls.length === 0) {
    return []
  }
  const retVal = []
  for (const url of urls) {
    const searchStr = 'tiktok.com/@'
    if (!url.includes(searchStr)) {
      retVal.push({ url })
      continue
    }
    const splittedUrl = url.split(searchStr)[1].split('/')
    const username = splittedUrl[0].split('?')[0]
    const mediaId = splittedUrl[2].split('?')[0]

    try {
      const { data } = await axios({
        headers: {
          'X-API-KEY': process.env.TIK_API_KEY,
        },
        url: `https://api.tikapi.io/public/video?id=${mediaId}&username=${username}`,
      })

      if (data.status !== 'success') {
        console.error('tikapi not responding with success status', data.status)
        return
      }

      const info = data.itemInfo.itemStruct

      // Upload thumbnail to S3 under tiktok-thumbnails/{username} directory
      const dir = 'tiktok-thumbnails'
      const expiringUrl = info.video.cover
      const key = `${username}/${mediaId}.jpg`
      await uploadUrl(expiringUrl, dir, key)

      retVal.push({
        mediaId,
        url,
        likeCount: info.stats.diggCount,
        commentCount: info.stats.commentCount,
        viewCount: info.stats.playCount,
        title: data.shareMeta.title,
        publishedAt: new Date(info.createTime * 1000).toISOString(),
        thumbnailUrl: `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${dir}/${key}`,
      })
    } catch (error) {
      console.error('axios error: ', error)
      Sentry.captureException(error)
      retVal.push({ url, mediaId })
    }
  }
  return retVal
}
