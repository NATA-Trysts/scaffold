import { Router } from 'express'

import { healthCheck } from './controllers/healthCheck.controller'
import { randomNumber } from './controllers/random.controller'
import { getUsername } from './controllers/user.controller'
import { fakeNameMiddleware, logMiddleware } from './middlewares/log.middleware'

export const routes = (router: Router) => {
  router.get('/api/username', logMiddleware, fakeNameMiddleware, getUsername)

  router.get('/api/random', logMiddleware, randomNumber)
  router.get('/api/random/:limit', logMiddleware, randomNumber)

  router.get('/healthcheck', healthCheck)
}
