export interface PortfolioItem {
  platformMediaId: string
  url: string
  thumbnailUrl: string
  isVerified?: boolean
  publishedAt?: string
  companyUrl?: string
  companyName?: string
  deliverable?: string
  platform?: string
  title?: string
  viewCount?: string | number
  commentCount?: string | number
  likeCount?: string | number
  dislikeCount?: string | number
  videoUrl?: string
}

export interface LocationBreakdown {
  country: string
  value: number
}

export interface GenderBreakdown {
  male: number // i.e. 30
  female: number // i.e. 70
}

export interface CreatorStats {
  genderBreakdown: GenderBreakdown
  locationBreakdown: LocationBreakdown[]
  verifiedCollabsCount: string
  followerCount: string
  avgImpressions: string
  avgEngagement: string
}

// should match up with publicfields in Auth.ts.
export interface User {
  id: string
  role: 'brand' | 'creator'
  status: 'unverified' | 'verified' | 'suspended'
  firstName: string
  lastName: string
  alias: string
  slug: string
  email: string
  portfolio?: PortfolioItem[] | any // prisma is complaining
  password?: string // omitted unless it's in the password reset token
  viewerCount?: number
  about?: string
  category?: string
  websiteUrl?: string
  avatarUrl?: string
  bannerUrl?: string
  createdAt?: string
  genre?: string
  tiktokUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  creatorStats?: CreatorStats
  statsLastVerifiedAt?: string
}

export interface OfferHistoryItem {
  createdAtString?: Date
  message?: string
  productValue?: number
  productName?: string
  productUrl?: string
  cashValue?: number
}

export interface Offer {
  id: string
  listing?: Listing
  brand: User
  history: OfferHistoryItem[]
  isCleared: boolean
}

export type ListingStatus = 'unverified' | 'active' | 'decided'
export type DealStatus = 'submitting' | 'paying' | 'completed'

interface ListingSpecs {
  canReuse?: boolean
  numberOfRevisions?: number
  revisionDays?: number
  willFollowScript?: boolean
}

export interface Listing {
  id: string
  creator: User
  name: string
  status: ListingStatus
  iconUrl?: string
  brandId?: string
  description?: string
  platform: string
  deliverable: string
  offers?: Offer[]
  auctionEndsAt: string
  highestOfferValue: number
  askingPrice?: number
  specs: ListingSpecs
  deals: Deal[]
  deliveryEndsAt: string
  decidedAt: string
  createdAt?: string
}

export interface Deal {
  id: string
  brand: User
  status: DealStatus
  listing?: Listing
  productValue: number
  productName: string
  productUrl: string
  cashValue: number
  message: string
  createdAt?: string
  submittedUrl?: string
  submittedAt?: string
  paidAt?: string
}

export interface Token {
  user: User
  time: string
  iat: number
  exp: number
}

export interface SettingsFormFieldValues {
  firstName: string
  lastName: string
  alias: string
  websiteUrl: string
  about: string
  portfolio?: PortfolioItem[]
  avatarUrl?: string
  bannerUrl?: string
  genre?: string
  tiktokUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  instagramUrl?: string
}

// Profile Page
type UserProfile = User & {
  collabs: PortfolioItem[]
}

export type TransformedProfile = Omit<UserProfile, 'portfoilo'>

export type Activity = {
  idx: number
  brand: User
  isNew: boolean
} & OfferHistoryItem
