import { getYoutubeData } from 'lib/youtube'
import pick from 'ramda/src/pick'
import { getTiktokData } from 'lib/tiktok'
import {
  mergeWithSourceData,
  populatePortfolioData,
  getNewlyAddedVideos,
} from 'utils/backend'

jest.mock('lib/youtube', () => ({
  getYoutubeData: jest.fn(),
}))

jest.mock('lib/tiktok', () => ({
  getTiktokData: jest.fn(),
}))

const fakeUrl1 = 'https://youtube.com/watch?v=abcdefg12345'
const fakeUrl2 = 'https://www.tiktok.com/@tsukislice/video/6977600504406871302'

const fakeYoutubeData = [
  {
    mediaId: 'abcdefg',
    title: 'Fake Youtube Vid',
    url: fakeUrl1,
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
  {
    mediaId: 'abcdefg123',
    title: 'Fake Youtube Vid 2',
    url: fakeUrl1,
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
  {
    mediaId: 'abcdefg456',
    title: 'Fake Youtube Vid 3',
    url: fakeUrl1,
    thumbnailUrl: 'https://i.ytimg.com/vi/pUi01oPrN_A/sddefault.jpg',
    viewCount: 123456,
    likeCount: 123456,
    commentCount: 123456,
    publishedAt: '2021-11-04T00:26:54Z',
  },
]

const fakeTiktokData = [
  {
    url: fakeUrl2,
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

  describe('getNewlyAddedVideos', () => {
    const oldPortfolio = [fakeYoutubeData[0], fakeTiktokData[0]]
    const props = ['url', 'title']

    describe('input has same URLs as old portfolio', () => {
      const input = [
        pick(props, fakeYoutubeData[0]),
        pick(props, fakeTiktokData[0]),
      ]
      const { addedVideos, existingVideos } = getNewlyAddedVideos(
        input,
        oldPortfolio
      )
      it('returns no addedVideos', () => {
        expect(addedVideos).toHaveLength(0)
      })
      it('returns existing videos with all fields', () => {
        expect(existingVideos).toMatchObject(oldPortfolio)
      })
    })

    describe('no newly added videos exist in old portfolio', () => {
      const input = [
        { url: 'https://youtube.com/watch?video=grapplr69', title: 'Title A' },
        {
          url: 'https://youtube.com/watch?video=grapplr69420',
          title: 'Title B',
        },
      ]
      const { addedVideos, existingVideos } = getNewlyAddedVideos(
        input,
        oldPortfolio
      )

      it('returns the same addedVideos as input', () => {
        expect(addedVideos).toMatchObject(input)
      })
      it('returns no existingVideos', () => {
        expect(existingVideos).toHaveLength(0)
      })
    })

    describe('some old videos and some new videos', () => {
      const newVid = {
        url: 'https://youtube.com/watch?video=grapplr69',
        title: 'Title A',
      }
      const input = [
        pick(props, fakeYoutubeData[0]),
        pick(props, fakeTiktokData[0]),
        newVid,
      ]
      const { addedVideos, existingVideos } = getNewlyAddedVideos(
        input,
        oldPortfolio
      )
      it('returns the correct format of added videos', () => {
        expect(addedVideos).toHaveLength(1)
        expect(addedVideos[0]).toMatchObject(newVid)
      })
      it('returns the correct format of exisitng videos', () => {
        expect(existingVideos).toHaveLength(2)
        expect(existingVideos[0]).toMatchObject(fakeYoutubeData[0])
        expect(existingVideos[1]).toMatchObject(fakeTiktokData[0])
      })
    })
  })
})
