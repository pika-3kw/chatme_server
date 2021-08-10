import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { PORT } from 'configs/constants'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' })
})

app.listen(PORT, () => {
  console.log('Server is running at PORT', PORT)
})
