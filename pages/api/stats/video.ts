import type { NextApiRequest, NextApiResponse } from 'next'
import getVideoId from 'get-video-id'
import { YOUTUBE, TIKTOK } from 'shared/constants'
import { mergeWithSourceData, withApiGuard } from 'utils/backend'

// TODO: Refactor with populatePortfolioData
async function videoStatsHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { urls } = req.query as { urls: string[] }
  // Separate portfolio item into youtubeIds or tiktok
  const [list, youtubeIds, tiktokUrls] = [[], [], []]
  for (let i = 0; i < urls.length; i += 1) {
    const item = { mediaId: null, platform: null }
    const url = urls[i]
    const { id, service } = getVideoId(url)
    if (service !== YOUTUBE && service !== TIKTOK) {
      list.push({ ...item, url })
      continue
    }
    item.platform = service
    item.mediaId = id
    if (!id) {
      // handle youtube short links ie. https://www.youtube.com/shorts/pUi01oPrN_A/
      if (service === YOUTUBE && url.includes('/shorts/')) {
        const splittedUrl = url.split('/shorts/')
        item.mediaId = splittedUrl[splittedUrl.length - 1]
          .split('/')[0] // handle end slash
          .split('?')[0] // handle query params
      } else {
        // iterate next url if cant get id from getVideoId
        continue
      }
    }
    list.push(item)
    if (service === YOUTUBE) {
      youtubeIds.push(item.mediaId)
    } else if (service === TIKTOK) {
      tiktokUrls.push(url)
    }
  }

  const populatedList = await mergeWithSourceData(youtubeIds, tiktokUrls, list)
  res.status(200).json(populatedList)
}

export default withApiGuard(videoStatsHandler)
