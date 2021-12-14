import express from 'express'
import { json } from 'body-parser'

import todoRoutes from './routes/todos'
import { errorHandler } from './controllers/errors'

const app = express()

app.use(json())

app.use('/todos', todoRoutes)

app.use(errorHandler)

app.listen(3000)
