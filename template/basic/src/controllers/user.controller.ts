import { Request, Response } from 'express'

export const getUsername = async (req: Request, res: Response) => {
  const data = req['user']
  res.send({
    username: `${data.first_name} ${data.last_name}`,
  })
}
