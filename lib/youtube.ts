import { youtube } from '@googleapis/youtube'

const youtubeClient = youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
})

export default youtubeClient
