import cookie from 'cookie'
import { UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export function serializeCookie(token = '', maxAge = 6 * 60 * 60): string {
  return cookie.serialize('token', token, {
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

export function encryptToken(id: string): string {
  return jwt.sign({ id, time: new Date() }, process.env.JWT_SECRET, {
    expiresIn: '6h',
  })
}

export function decryptToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET)
}
