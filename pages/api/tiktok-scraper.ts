import { getVideoMeta } from 'tiktok-scraper'

export default async function handler(req, res) {
  if (req.method !== 'POST') return
  const urls = req.body
  const data = []
  for (const url of urls) {
    try {
      const { collector } = await getVideoMeta(url)
      data.push({
        platformMediaId: collector[0].id,
        title: collector[0].text,
        thumbnailUrl: collector[0].imageUrl,
        publishedAt: new Date(collector[0].createTime).toString(),
        url,
        videoUrl: collector[0].videoUrl,
        viewCount: collector[0].playCount,
        commentCount: collector[0].commentCount,
      })
    } catch (error) {
      console.error('getVideoMeta error: ', error)
    }
  }
  res.json(data)
}
