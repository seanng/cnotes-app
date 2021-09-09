export type PortfolioItem = {
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
export type User = {
  id: string
  role: string
  status: string
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

export type Offer = {
  id: string
  creator: User
  platform: string
  deliverable: string
  // bids[]?
}

export type Token = {
  user: User
  time: string
  iat: number
  exp: number
}

export type SettingsFormFieldValues = {
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
