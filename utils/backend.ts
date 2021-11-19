import { ValidationError } from 'apollo-server-errors'
import merge from 'ramda/src/merge'
import prop from 'ramda/src/prop'
import map from 'ramda/src/map'
import groupBy from 'ramda/src/groupBy'
import getVideoId from 'get-video-id'
import { PortfolioItem } from 'shared/types'
import { YOUTUBE, TIKTOK } from 'shared/constants'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { getYoutubeData } from 'lib/youtube'
import { getTiktokData } from 'lib/tiktok'

export const mergeWithSourceData = async (
  youtubeIds = [],
  tiktokUrls = [],
  listToMutate = []
): Promise<PortfolioItem[]> => {
  const youtubeData = await getYoutubeData(youtubeIds)
  const tiktokData = await getTiktokData(tiktokUrls)
  const tiktokAndYoutubeData = tiktokData.concat(youtubeData)
  const dataById = groupBy(prop('mediaId'), tiktokAndYoutubeData)
  return map<PortfolioItem, PortfolioItem>(item => {
    const populatedItem = dataById[item.mediaId]?.[0] || {}
    return merge(item, populatedItem)
  })(listToMutate)
}

export const populatePortfolioData = async (
  portfolio: PortfolioItem[]
): Promise<PortfolioItem[]> => {
  // Separate portfolio item into youtubeIds or tiktok
  const [youtubeIds, tiktokUrls, items] = [[], [], [...portfolio]]
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    item.url = item.url.trim()
    const { id, service } = getVideoId(item.url)
    if (service !== YOUTUBE && service !== TIKTOK) {
      throw new ValidationError('Platform not found')
    }
    item.platform = service
    item.mediaId = id
    if (!id) {
      // handle youtube short links ie. https://www.youtube.com/shorts/pUi01oPrN_A/
      if (service === YOUTUBE && item.url.includes('/shorts/')) {
        const splittedUrl = item.url.split('/shorts/')
        item.mediaId = splittedUrl[splittedUrl.length - 1]
          .split('/')[0] // handle end slash
          .split('?')[0] // handle query params
      } else {
        // break if cant get id from getVideoId
        continue
      }
    }
    if (service === YOUTUBE) {
      youtubeIds.push(item.mediaId)
    } else if (service === TIKTOK) {
      tiktokUrls.push(item.url)
    }
  }

  const mergedItems = await mergeWithSourceData(youtubeIds, tiktokUrls, items)
  return mergedItems
}

const API_KEY = 'cnotes123'

export const withApiGuard =
  (handler: NextApiHandler, method: string) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req.headers['x-api-key']) {
      res.status(403).send({
        message: 'No API Key found in headers',
      })
      return
    }
    if (req.headers['x-api-key'] !== API_KEY) {
      res.status(403).send({
        message: 'Incorrect API Key',
      })
      return
    }
    if (req.method !== method) {
      res.status(405).send({
        message: 'Method not allowed',
      })
      return
    }
    await handler(req, res)
  }
