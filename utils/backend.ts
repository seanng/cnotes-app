import { ValidationError } from 'apollo-server-errors'
import merge from 'ramda/src/merge'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import groupBy from 'ramda/src/groupBy'
import getVideoId from 'get-video-id'
import { PortfolioItem } from 'shared/types'
import youtubeClient from 'lib/youtube'
// import { getVideoMeta } from 'tiktok-scraper'

// const getTiktokData = async (item): Promise<PortfolioItem> => {
//   const { collector } = await getVideoMeta(item.url)
//   return {
//     ...item,
//     title: collector[0].text,
//     platformMediaId: collector[0].id,
//     thumbnailUrl: collector[0].imageUrl,
//     videoUrl: collector[0].videoUrl,
//     publishedAt: new Date(collector[0].createTime),
//     viewCount: collector[0].playCount,
//     commentCount: collector[0].commentCount,
//   }
// }

const getYoutubeData = async (
  ids: string[]
): Promise<Omit<PortfolioItem, 'url'>[]> => {
  const {
    data: { items },
  } = await youtubeClient.videos.list({
    id: ids,
    part: ['statistics', 'id', 'snippet'],
  })

  return items.map(({ id, snippet, statistics }) => ({
    platformMediaId: id,
    title: snippet.title,
    thumbnailUrl:
      snippet?.thumbnails?.standard?.url ||
      snippet?.thumbnails?.high?.url ||
      snippet?.thumbnails?.medium?.url,
    publishedAt: snippet.publishedAt,
    viewCount: statistics.viewCount,
    commentCount: statistics.commentCount,
    likeCount: statistics.likeCount,
    dislikeCount: statistics.dislikeCount,
  }))
}

export const populatePortfolioData = async (
  portfolio: PortfolioItem[]
): Promise<PortfolioItem[]> => {
  const youtubeIds = []
  const items = [...portfolio]

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    const { id, service } = getVideoId(item.url)
    if (service !== 'youtube' && service !== 'tiktok') {
      throw new ValidationError('Platform not found')
    }
    item.platform = service
    item.platformMediaId = id
    if (service === 'youtube') {
      // so we can make 1 combined request to youtube api
      youtubeIds.push(id)
      // } else if (service === 'tiktok') {
      //   items[i] = await getTiktokData(item)
    }
  }

  const youtubeList = await getYoutubeData(youtubeIds)
  const youtubeListById = groupBy(prop('platformMediaId'), youtubeList)
  const combinedItems = map<PortfolioItem, PortfolioItem>(item =>
    merge(item, youtubeListById[item.platformMediaId][0])
  )(items)

  return combinedItems
}

export default function noOp() {
  // no op
}
