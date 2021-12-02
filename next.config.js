const { withSentryConfig } = require('@sentry/nextjs')

// Your existing module.exports
const moduleExports = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})({
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  outputFileTracing: false,
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

// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
module.exports = withSentryConfig(moduleExports, {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
})
