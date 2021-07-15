const jwt = require('jsonwebtoken')
const { findUserById } = require('../database/repository/users')

const verifyToken = (token) => {
  const key = process.env.TOKEN_SECRET
  return jwt.verify(token, key)
}

exports.validateAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization)
      return res.status(401).send({
        errors: [{ title: 'Invalid Token', message: 'Token not entered!' }],
      })

    const splitedAuthorization = authorization.split(' ')

    if (splitedAuthorization.length !== 2)
      return res.status(401).send({
        errors: [
          { title: 'Invalid Token', message: 'Poorly formatted token!' },
        ],
      })

    const [prefix, token] = splitedAuthorization

    if (!/^Bearer$/i.test(prefix))
      return res.status(401).send({
        errors: [
          { title: 'Invalid Token!', message: 'Poorly formatted token!' },
        ],
      })

    if (
      !/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\\+\\/=]*)$/i.test(
        token
      )
    )
      return res.status(401).send({
        errors: [
          { title: 'Invalid Token!', message: 'Poorly formatted token!' },
        ],
      })

    const decoder = verifyToken(token)
    const user = await findUserById(decoder.id)

    if (!user)
      return res.status(401).send({
        errors: [
          {
            title: 'User not found!',
            message: 'User is not registered in the system!',
          },
        ],
      })

    req.user = decoder

    return next()
  } catch (error) {
    return res.status(401).json({
      errors: [
        { title: 'Invalid Token', message: 'Token entered is invalid!' },
      ],
    })
  }
}

exports.generateToken = (object) => {
  return jwt.sign(object, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  })
}
