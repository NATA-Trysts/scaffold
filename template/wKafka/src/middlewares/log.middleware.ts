import { NextFunction, Request, Response } from 'express'
import { getClientIp } from 'request-ip'

export const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = getClientIp(req)
  const method = req.method
  console.log(
    `> ${new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }).format(new Date())} :: ${method} ${ipAddress} `,
  )

  next()
}
