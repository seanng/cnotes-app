import { youtube } from '@googleapis/youtube'
import { PortfolioItem } from 'shared/types'

const youtubeClient = youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export default youtubeClient

export const getYoutubeData = async (
  ids: string[]
): Promise<PortfolioItem[]> => {
  if (!ids || ids.length === 0) {
    return []
  }
  const { data } = await youtubeClient.videos.list({
    id: ids,
    part: ['statistics', 'id', 'snippet'],
  })

  return data.items.map(({ id, snippet, statistics }) => ({
    mediaId: id,
    url: `https://www.youtube.com/watch?v=${id}`,
    title: snippet.title,
    thumbnailUrl:
      snippet?.thumbnails?.standard?.url ||
      snippet?.thumbnails?.high?.url ||
      snippet?.thumbnails?.medium?.url,
    publishedAt: snippet.publishedAt,
    viewCount: Number(statistics.viewCount),
    commentCount: Number(statistics.commentCount),
    likeCount: Number(statistics.likeCount),
    dislikeCount: Number(statistics.dislikeCount),
    updatedAt: new Date().toISOString(),
  }))
}
