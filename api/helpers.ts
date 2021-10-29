import prisma from '../lib/prisma'

export function getRelation(model: string, field: string) {
  return parent =>
    prisma[model].findUnique({ where: { id: parent.id } })[field]()
}
