// should match up with publicfields in Auth.ts.
export type User = {
  id: string
  role: string
  status: string
  firstName: string
  lastName: string
  email: string
  password?: string // omitted unless it's in the password reset token
  companyName?: string
  viewerCount?: number
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
