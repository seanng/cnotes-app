const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      'collabski-dev.s3.us-east-1.amazonaws.com',
      'collabski-prod.s3.us-east-1.amazonaws.com',
      'd29zuagwjyq1tv.cloudfront.net',
      'd2vh08r8g1sliz.cloudfront.net',
      'i.imgur.com',
    ],
  },
})
