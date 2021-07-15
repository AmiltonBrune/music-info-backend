require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

const { httpStatus } = require('./src/presenters/statusCodes')
const { getErrorsDefault } = require('./src/presenters/handle')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({}))
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.disable('x-powered-by')

require('./src/presenters/routes')(app)

app.use((_, res) =>
  res.status(httpStatus.NOT_FOUND).json(
    getErrorsDefault({
      title: `${httpStatus.NOT_FOUND}`,
      message: 'Route not found.',
    })
  )
)

module.exports = app
