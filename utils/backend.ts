import { ValidationError } from 'apollo-server-errors'
import merge from 'ramda/src/merge'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import groupBy from 'ramda/src/groupBy'
import getVideoId from 'get-video-id'
import axios from 'axios'
import { PortfolioItem } from 'shared/types'
import youtubeClient from 'lib/youtube'

const getYoutubeData = async (ids: string[]): Promise<PortfolioItem[]> => {
  if (!ids || ids.length === 0) {
    return []
  }
  const { data } = await youtubeClient.videos.list({
    id: ids,
    part: ['statistics', 'id', 'snippet'],
  })

  return data.items.map(({ id, snippet, statistics }) => ({
    platformMediaId: id,
    url: `https://www.youtube.com/watch?v=${id}`,
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

const getTiktokData = async (items: string[]): Promise<PortfolioItem[]> => {
  if (!items || items.length === 0) {
    return []
  }
  const { data } = await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/tiktok-scraper`,
    data: items,
  })
  return data
}

export const populatePortfolioData = async (
  portfolio: PortfolioItem[]
): Promise<PortfolioItem[]> => {
  const items = [...portfolio]
  const youtubeIds = []
  const tiktokUrls = []

  // separate portfolio item into youtubeIds or tiktok
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    const { id, service } = getVideoId(item.url)
    if (service !== 'youtube' && service !== 'tiktok') {
      throw new ValidationError('Platform not found')
    }
    item.platform = service
    item.platformMediaId = id
    if (!id) {
      // break if cant get id from getVideoId
      continue
    }
    if (service === 'youtube') {
      youtubeIds.push(id)
    } else if (service === 'tiktok') {
      tiktokUrls.push(item.url)
    }
  }

  const tiktokData = await getTiktokData(tiktokUrls)
  const youtubeData = await getYoutubeData(youtubeIds)

  const tiktokAndYoutubeData = tiktokData.concat(youtubeData)
  const dataById = groupBy(prop('platformMediaId'), tiktokAndYoutubeData)
  const mergedItems = map<PortfolioItem, PortfolioItem>(item => {
    const populatedItem = dataById[item.platformMediaId]?.[0] || {}
    return merge(item, populatedItem)
  })(items)

  return mergedItems
}

export default function noOp() {
  // no op
}
