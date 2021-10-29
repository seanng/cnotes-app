import { gql } from '@apollo/client'
import { initializeApollo } from 'lib/apollo-client'

const CREATOR_SLUGS = gql`
  query creatorSlugs {
    creatorSlugs {
      slug
    }
  }
`
function generateSiteMap(creators) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set public URLs we know already-->
     <url>
       <loc>${baseUrl}</loc>
     </url>
     ${creators
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${baseUrl}/profile/${slug}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = initializeApollo()
  // We make an API call to gather the URLs for our site
  const {
    data: { creatorSlugs: data },
  } = await client.query({ query: CREATOR_SLUGS })

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
export default SiteMap
