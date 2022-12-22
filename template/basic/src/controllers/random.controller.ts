import { Request, Response } from 'express'

import { randomInt } from '../utils/random'

export const randomNumber = async (req: Request, res: Response) => {
  res.send({
    number: req.params.limit ? randomInt(parseInt(req.params.limit)) : randomInt(),
  })
}
