// FRONTEND ONLY.
import pick from 'ramda/src/pick'
import pipe from 'ramda/src/pipe'
import map from 'ramda/src/map'
import over from 'ramda/src/over'
import lensProp from 'ramda/src/lensProp'
import split from 'ramda/src/split'
import head from 'ramda/src/head'
import type { GetServerSidePropsResult, Redirect } from 'next'
import S3 from 'lib/s3-react'
import type { Blob } from 'buffer'
import {
  Listing,
  Deal,
  User,
  TransformedProfile,
  PortfolioItem,
} from 'shared/types'
import {
  ACTIVE,
  SELECTING,
  LISTING,
  NO_OFFERS,
  portfolioItemFields,
} from 'shared/constants'

export function getErrorMessage(error: Record<string, any>): string {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-restricted-syntax
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        return graphQLError.message
      }
    }
  }
  return error.message
}

export function redirTo(location: string): GetServerSidePropsResult<Redirect> {
  return {
    redirect: {
      destination: location,
      permanent: false,
    },
  }
}

export async function uploadToS3(
  file: Blob | File,
  dirName: string,
  fileName = 'anon'
): Promise<string> {
  if (!dirName || !file) {
    throw new Error('file and dirName must be provided.')
  }
  const ReactS3Client = S3({ dirName })
  const { key } = await ReactS3Client.uploadFile(file, fileName)
  return key
}

type DeleteResponse = {
  ok: boolean
  status: number
  message: string
  fileName: string
}

export async function deleteS3File(
  dirName: string,
  fileName: string
): Promise<DeleteResponse> {
  if (!dirName || !fileName) {
    throw new Error('fileName and dirName must be provided.')
  }
  const ReactS3Client = S3({ dirName })
  const response = await ReactS3Client.deleteFile(fileName)
  return response
}

type Count = string | number
export function formatCountNumber(payload: Count): string {
  const count = Number(payload)
  const thousands = count / 1000
  if (thousands < 1000) {
    return `${thousands}k`
  }
  const millions = thousands / 1000
  return `${millions.toFixed(1)}m`
}

export function getCreatorListingOrDealStatus(data: Listing | Deal): string {
  if (data.status === ACTIVE) {
    if (new Date(data.auctionEndsAt) < new Date()) {
      return data.offers.length > 0 ? SELECTING : NO_OFFERS
    }
    return LISTING
  }
  return data.status
}

export const calculateTimeLeft = (
  start: string | undefined,
  end: string
): Record<string, number> => {
  const startDate = start ? +new Date(start) : +new Date()
  const difference = +new Date(end) - startDate
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

export function profileTransformer(data: User): TransformedProfile {
  const portfolio = data.portfolio
    .map(vid => ({
      ...vid,
      rating: (
        (Number(vid.likeCount) /
          (Number(vid.likeCount) + Number(vid.dislikeCount))) *
        100
      ).toFixed(0),
      engagementRate: (
        (Number(vid.commentCount) / Number(vid.viewCount)) *
        100
      ).toFixed(0),
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    )

  return {
    ...data,
    portfolio,
    collabs: portfolio.filter(item => !!item.companyName),
  }
}

// picks necessary fields + removes query parameters from URL
export const portfolioTransformer = map<PortfolioItem, PortfolioItem>(
  pipe(pick(portfolioItemFields), over(lensProp('url'), pipe(split('?'), head)))
)
