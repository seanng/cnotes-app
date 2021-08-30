// SERVER ONLY
import cookieJS from 'cookie'
import { UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from 'shared/types'
import { CREATOR } from 'shared/constants'

type Token = {
  user: User
  time: string
  iat: number
  exp: number
}

export function serializeCookie(token = '', maxAge = 6 * 60 * 60): string {
  return cookieJS.serialize('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge,
    secure: process.env.NODE_ENV === 'production',
  })
}

export function createPassword(password: string): string {
  if (password.length < 6) {
    throw new UserInputError('Password too short.')
  }
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export function isCorrectPassword(exposed: string, hashed: string): boolean {
  return bcrypt.compareSync(exposed, hashed)
}

export function encryptToken(user: User): string {
  return jwt.sign({ user, time: new Date() }, process.env.JWT_SECRET, {
    expiresIn: '6h',
  })
}

export function getUserPayload(cookie: string): User | null {
  const { token } = cookieJS.parse(cookie ?? '')
  if (!token) return null
  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET) as Token
    return user
  } catch (error) {
    return null
  }
}

export function isCreator(user?: User): boolean {
  // TODO: user.status === VERIFIED &&
  return user && user.role === CREATOR
}
