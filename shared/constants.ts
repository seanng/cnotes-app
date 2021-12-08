export const CREATOR_AVATAR_TEXT_SPACING = 4
export const CREATOR = 'creator'
export const BRAND = 'brand'
export const EMAIL_REGEX =
  // eslint-disable-next-line
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export const URL_REGEX =
  // eslint-disable-next-line
  /^(https?|http?):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,15}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export const PLATFORM_URL_REGEX =
  /^(https?|http?):\/\/(www\.)?(tiktok|youtube)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

export const TIKTOK_URL_REGEX =
  /^(https?|http?):\/\/(www\.)?(tiktok)\.com\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

// error messages
export const EMAIL_TAKEN = 'This email has already been registered.'
export const ALIAS_TAKEN = 'This alias is already being used by someone else.'
export const USER_NOT_FOUND = 'User not found.'
export const INCORRECT_PASSWORD = 'Invalid name and password combination.'
export const INVALID_TOKEN = 'Token is either invalid or has expired.'

// statuses
export const STATUS = 'Status'
export const UNVERIFIED = 'unverified'
export const VERIFIED = 'verified' // just user status
// export const SUSPENDED = 'SUSPENDED' // just user status

// listing
export const ACTIVE = 'active'
export const LISTING = 'listing'
export const DECIDED = 'decided'
export const CANCELLED = 'cancelled'
export const REJECTED = 'rejected'
export const SELECTING = 'selecting'
export const TRANSACTING = 'transacting'
export const PAYING = 'paying'
export const COMPLETED = 'completed'
export const SUBMITTING = 'submitting'
export const NO_OFFERS = 'listing ended'
export const DEAL = 'deal'

// listing statuses (frontend)
export const HISTORY = 'history'
export const WON = 'won'
export const AWAITING = 'awaiting'

export const FROM_ADDRESS = 'sean@collabski.com'

export const YOUTUBE = 'youtube'
export const TIKTOK = 'tiktok'

export const userTokenFields = [
  'id',
  'role',
  'firstName',
  'alias',
  'slug',
  'email',
  'status',
]

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
  'address',
  'bannerUrl',
  'youtubeUrl',
  'tiktokUrl',
  'facebookUrl',
  'instagramUrl',
  'portfolio',
]

export const portfolioItemFields = [
  'platform',
  'isVerified',
  'companyName',
  'companyUrl',
  'deliverable',
  'mediaId',
  'url',
  'likeCount',
  'dislikeCount',
  'commentCount',
  'viewCount',
  'title',
  'thumbnailUrl',
  'publishedAt',
]

export const PLACEHOLDER_BANNER_URL = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/placeholders/bg-profile.jpg`
export const S3_LISTING_ICONS_FOLDER = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/assets/mnemonics`
