export interface PortfolioItem {
  platformMediaId: string
  url: string
  thumbnailUrl: string
  description?: string
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

// should match up with publicfields in Auth.ts.
export interface User {
  id: string
  role: 'BRAND' | 'CREATOR'
  status: 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED'
  firstName: string
  lastName: string
  alias: string
  slug: string
  email: string
  portfolio?: PortfolioItem[] | any // prisma is complaining
  password?: string // omitted unless it's in the password reset token
  viewerCount?: number
  description?: string
  websiteUrl?: string
  avatarUrl?: string
  bannerUrl?: string
}

export interface BidHistoryItem {
  bidAt: Date
  price: number
}

export interface Bid {
  id: string
  offer?: Offer
  productUrl: string
  history: BidHistoryItem[]
  isCleared: boolean
}

export interface Offer {
  id: string
  creator: User
  status: 'UNVERIFIED' | 'ACTIVE' | 'TRANSACTING' | 'PAYING' | 'COMPLETED'
  brand: User
  brandId?: string
  platform: string
  deliverable: string
  bids?: Bid[]
  auctionEndsAt: string
  bidCount: number
  highestBid: number
  finalPrice: number
  deliveryStartsAt: string
  deliveryEndsAt: string
  completedAt: string
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
  description: string
  collabs?: PortfolioItem[]
  samples?: PortfolioItem[]
  portfolio?: PortfolioItem[]
  avatarUrl?: string
}

// Profile Page
type UserProfile = User & {
  collabs: PortfolioItem[]
}

export type TransformedProfile = Omit<UserProfile, 'portfoilo'>
