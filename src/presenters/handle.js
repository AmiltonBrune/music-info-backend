const { validationResult } = require('express-validator')
const { httpStatus } = require('./statusCodes')

exports.parseErrorsExpressValidator = (errors) =>
  errors.reduce((acc, value) => {
    acc = [
      ...acc,
      {
        title: value.param || 'There was an error',
        message: value.msg || 'Unidentified error.',
      },
    ]
  }, [])

exports.validateErrorBody = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: parseErrorsExpressValidator(errors.array()) })

  return next()
}

exports.getErrorObject = (error = {}) => ({
  title: error.title || 'There was an error',
  message: error || 'Unidentified error.',
  detail: error.detail,
})

exports.getErrorsDefault = (error = {}) => {
  if (Array.isArray(error))
    return {
      errors: error.map((e) => this.getErrorObject(e)),
    }

  return {
    errors: [this.getErrorObject(error)],
  }
}

exports.normalizePatterResponse = (data) => ({
  data,
  count: data ? data.length : 0,
  pages: 1,
  current_page: 1,
})
