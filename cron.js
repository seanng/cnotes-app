// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action

const axiosModule = require('axios')
const merge = require('ramda/src/merge')
const prop = require('ramda/src/prop')
const groupBy = require('ramda/src/groupBy')
const qs = require('qs')

const apiKey = 'cnotes123'
const baseURL = 'http://localhost:3000'
// const baseURL = 'https://collabski.com'

async function handler() {
  const axios = axiosModule.create({
    baseURL,
    headers: {
      'X-API-Key': apiKey,
    },
  })
  const { data: creators } = await axios.get('/api/users?role=creator')
  for (let i = 0; i < creators.length; i++) {
    const creator = creators[i]
    const { portfolio, _id: id, alias } = creator
    console.log(`Retrieving ${alias}'s portfolio video stats...`)
    const query = qs.stringify({
      urls: portfolio.map(p => p.url),
    })
    // For each creator portfolio, get video stats.
    const { data: vidStats } = await axios.get(`/api/stats/video?${query}`)
    console.log(`Retrieved! Updating ${alias}'s portfolio with latest stats'.`)
    const dataByUrl = groupBy(prop('url'), vidStats)
    const newPortfolio = portfolio.map(item => {
      const updatedItem = dataByUrl[item.url]?.[0] || {}
      return merge(item, updatedItem)
    })

    // update creator portfolio
    await axios.put(`/api/profile/${id}`, {
      portfolio: newPortfolio,
    })
    console.log(`Successfuly updated ${alias}'s portfolio'.`)
  }
}
handler()
