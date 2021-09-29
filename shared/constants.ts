export const CREATOR_AVATAR_TEXT_SPACING = 4
export const CREATOR = 'CREATOR'
export const BRAND = 'BRAND'
export const EMAIL_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const URL_REGEX =
  // eslint-disable-next-line
  /(https?|http?):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export const PLATFORM_URL_REGEX =
  /(https?|http?):\/\/(www\.)?(tiktok|youtube)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

// error messages
export const EMAIL_TAKEN = 'This email has already been registered.'
export const ALIAS_TAKEN = 'This alias is already being used by someone else.'
export const USER_NOT_FOUND = 'User not found.'
export const INCORRECT_PASSWORD = 'Invalid name and password combination.'
export const INVALID_TOKEN = 'Token is either invalid or has expired.'

// statuses
export const UNVERIFIED = 'UNVERIFIED'
export const VERIFIED = 'VERIFIED' // just user status
// export const SUSPENDED = 'SUSPENDED' // just user status

// offer
export const ACTIVE = 'ACTIVE'
export const TRANSACTING = 'TRANSACTING'
export const PAYING = 'PAYING'
export const COMPLETED = 'COMPLETED'

// offer statuses (frontend)
export const HISTORY = 'HISTORY'
export const WON = 'WON'

export const FROM_ADDRESS = 'no-reply@cnotes.co'

export const YOUTUBE = 'youtube'
export const TIKTOK = 'tiktok'

// should match up with User.
export const userPublicFields = [
  'id',
  'role',
  'firstName',
  'lastName',
  'alias',
  'slug',
  'email',
  'status',
  'about',
  'genre',
  'websiteUrl',
  'avatarUrl',
  'bannerUrl',
  'youtubeUrl',
  'tiktokUrl',
  'facebookUrl',
  'instagramUrl',
  'portfolio',
]

export const S3_BUCKET_URL =
  'https://cnotes-dev.s3-ap-southeast-1.amazonaws.com'

export const PLACEHOLDER_BANNER_URL = `${S3_BUCKET_URL}/placeholders/bg-profile.jpg`
export const S3_OFFER_ICONS_FOLDER = `${S3_BUCKET_URL}/assets/mnemonics`
