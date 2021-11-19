import { getYoutubeData } from 'lib/youtube'
import { getTiktokData } from 'lib/tiktok'
import { mergeWithSourceData, populatePortfolioData } from 'utils/backend'

jest.mock('lib/youtube', () => ({
  getYoutubeData: jest.fn(),
}))

jest.mock('lib/tiktok', () => ({
  getTiktokData: jest.fn(),
}))

const fakeYoutubeData = [
  {
    mediaId: 'abcdefg',
    title: 'Fake Youtube Vid',
    url: 'https://youtube.com/watch?v=abcdefg12345',
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
  {
    mediaId: 'abcdefg123',
    title: 'Fake Youtube Vid 2',
    url: 'https://youtube.com/watch?v=abcdefg12345',
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
  {
    mediaId: 'abcdefg456',
    title: 'Fake Youtube Vid 3',
    url: 'https://youtube.com/watch?v=abcdefg12345',
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
]

const fakeTiktokData = [
  {
    url: 'https://www.tiktok.com/@tsukislice/video/6977600504406871302',
    mediaId: '6977600504406871302',
    viewCount: 1234,
    likeCount: 122,
    commentCount: 1,
    title: 'tsuki on tiktok',
    thumbnailUrl:
      'https://d29zuagwjyq1tv.cloudfront.net/tiktok-thumbnails/tsukislice/6977600504406871302.jpg',
  },
]

describe('utils/backend', () => {
  describe('mergeWithSourceData', () => {
    const inputList = [
      { mediaId: fakeTiktokData[0].mediaId, platform: 'tiktok' },
      { mediaId: fakeYoutubeData[0].mediaId, platform: 'youtube' },
      { mediaId: fakeYoutubeData[1].mediaId, platform: 'youtube' },
      { mediaId: fakeYoutubeData[2].mediaId, platform: 'youtube' },
    ]
    beforeAll(() => {
      ;(getTiktokData as jest.Mock).mockResolvedValue(fakeTiktokData)
      ;(getYoutubeData as jest.Mock).mockResolvedValue(fakeYoutubeData)
    })
    it('contains both youtube and tiktok data', async () => {
      const mergedItems = await mergeWithSourceData([], [], inputList)
      expect(mergedItems).toHaveLength(4)
      expect(mergedItems[0].platform).toBe('tiktok')
      expect(mergedItems[1].platform).toBe('youtube')
      expect(mergedItems[2].platform).toBe('youtube')
      expect(mergedItems[3].platform).toBe('youtube')
    })
    it('correctly merges object properties', async () => {
      const mergedItems = await mergeWithSourceData([], [], inputList)
      expect(mergedItems[0]).toHaveProperty('platform')
      expect(mergedItems[0]).toHaveProperty('mediaId')
      expect(mergedItems[0]).toHaveProperty('likeCount')
      expect(mergedItems[0]).toHaveProperty('viewCount')
      expect(mergedItems[0]).toHaveProperty('commentCount')
    })
  })

  describe('populatePortfolioData', () => {
    it('returns an empty array if no portfoliodata', async () => {
      const data = await populatePortfolioData([])
      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(0)
    })
  })
})
