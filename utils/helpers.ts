// FRONTEND ONLY.
import Compressor from 'compressorjs'
import { GetServerSidePropsResult, Redirect } from 'next'
import S3 from 'lib/s3'
import { Blob } from 'buffer'
import { Offer } from 'shared/types'
import { ACTIVE } from 'shared/constants'

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
  const { location } = await ReactS3Client.uploadFile(file, fileName)
  return location
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

export const compress = (payload: File): Promise<Blob> =>
  new Promise(
    (resolve, reject) =>
      new Compressor(payload, {
        quality: 0.98,
        success: resolve,
        error: reject,
      })
  )

export function getStatusLabel(offer: Offer): string {
  if (offer.status === ACTIVE) {
    return new Date() < new Date(offer.auctionEndsAt) ? 'Bidding' : 'Select'
  }
  return offer.status
}
