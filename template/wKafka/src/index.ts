import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

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
