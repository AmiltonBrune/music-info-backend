const { decrypt } = require('../../presenters/encryptation')
const { generateToken } = require('../../presenters/jwt')
const { validateBodyAuthenticate } = require('./case')
const { httpStatus } = require('../../presenters/statusCodes')
const {
  getErrorsDefault,
  validateErrorBody,
} = require('../../presenters/handle')

const { findUserByEmail } = require('../../database/repository/users')

exports.path = '/authenticate'
exports.method = 'post'
exports.middleware = [validateBodyAuthenticate, validateErrorBody]
exports.authenticate = false

exports.handler = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (user && !user.password)
      return res.status(httpStatus.BAD_REQUEST).json(
        getErrorsDefault({
          title: 'Password not registered!',
          message: 'Your password has not been registered.',
        })
      )

    if (!user || decrypt(user.password) !== password) {
      return res.status(httpStatus.BAD_REQUEST).json(
        getErrorsDefault({
          title: 'Authentication failed!',
          message: 'Invalid username and/or password.',
        })
      )
    }

    return res.status(httpStatus.OK).json({
      user: {
        id: user.id,
        name: user.name,
      },
      token: generateToken({
        id: user.id,
      }),
    })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        detail: error.message,
      })
    )
  }
}
