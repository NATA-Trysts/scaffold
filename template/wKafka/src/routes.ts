import { Router } from 'express'

import { healthCheck } from './controllers/healthCheck.controller'
import { createUser } from './controllers/user.controller'
import { logMiddleware } from './middlewares/log.middleware'

export const routes = (router: Router) => {
  router.post('/api/username', logMiddleware, createUser)

  router.get('/healthcheck', healthCheck)
}
