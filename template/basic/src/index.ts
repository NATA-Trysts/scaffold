import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { routes } from './routes'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: ['*'],
  }),
)

routes(app)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
