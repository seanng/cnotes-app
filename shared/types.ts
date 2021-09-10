export interface PortfolioItem {
  url: string
  thumbnailUrl: string
  description?: string
  companyUrl?: string
  companyName?: string
  deliverable?: string
  platform?: string
  executedAt: Date
}

// should match up with publicfields in Auth.ts.
export interface User {
  id: string
  role: 'BRAND' | 'CREATOR'
  status: 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED'
  firstName: string
  lastName: string
  alias: string
  email: string
  portfolio?: PortfolioItem[] | any // prisma is complaining
  password?: string // omitted unless it's in the password reset token
  viewerCount?: number
  description?: string
  websiteUrl?: string
  avatarUrl?: string
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
  brandId?: string
  platform: string
  deliverable: string
  bids?: Bid[]
  auctionEndsAt: string
  bidCount: number
  highestBid: number
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
