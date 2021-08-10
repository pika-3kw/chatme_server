import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createServer } from 'http'
// other
import { PORT } from 'configs/constants'
import createSocketIO from 'configs/socket'
// config
const app = express()
const httpServer = createServer(app)
createSocketIO(httpServer)
// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' })
})

httpServer.listen(PORT, () => {
  console.log('Server is running at PORT', PORT)
})
