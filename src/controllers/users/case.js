const { body } = require('express-validator')
const { findUserByEmail } = require('../../database/repository/users')
const { httpStatus: status } = require('../../presenters/statusCodes')
const { getErrorsDefault } = require('../../presenters/handle')
const { getUniqueElement } = require('../../presenters/helpers')
const { findAllProfilesById } = require('../../database/repository/profiles')
const { encrypt } = require('../../presenters/encryptation')
const {
  bulkCreateUsersProfiles,
  removeUsersProfilesByUserId,
} = require('../../database/repository/usersProfiles')

exports.validateBodyUsersForPost = [
  body('name').isString().notEmpty(),
  body('email').isString().notEmpty(),
]

exports.validateBodyDefinePassword = [body('password').notEmpty()]

exports.checkPreviousUser = async (req, res, next) => {
  const previousUser = await findUserByEmail(req.body.email)

  if (previousUser)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Existing email!',
        message: 'The email address is already registered.',
      })
    )

  return next()
}

exports.validateProfiles = async (req, res, next) => {
  if (!req.body.profiles)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Profile not informed!',
        message: 'The user must be linked to at least one Profile.',
      })
    )

  if (!req.body.profiles.length)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Profile not informed!',
        message: 'The user must be linked to at least one Profile.',
      })
    )

  req.body.profiles = getUniqueElement(req.body.profiles)

  const profiles = await findAllProfilesById(req.body.profiles)

  if (profiles.length !== req.body.profiles.length)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Profile Invalid!',
        message:
          'It was not possible to create the requested user because one of the Profiles informed does not exist.',
      })
    )

  return next()
}

exports.receiveTratmentForPost = (req) => {
  return {
    name: req.body.name,
    email: req.body.email,
    password: encrypt(req.body.password),
  }
}

exports.receiveTratmentForPut = (body, id) => {
  return {
    id,
    name: body.name,
    email: body.email,
    password: encrypt(body.password),
  }
}

exports.encryptPasswordFromBody = async (req, _, next) => {
  const encryptedPassword = encrypt(req.body.password)

  req.body.password = encryptedPassword

  return next()
}

exports.bulkCreateProfilesOfUser = async (Profiles, UserId) => {
  const profiles = Profiles.map((profile) => {
    return { UserId, ProfileId: profile }
  })

  return await bulkCreateUsersProfiles(profiles)
}

exports.removeProfilesOfUsers = async (UserId) => {
  await removeUsersProfilesByUserId(UserId)

  return null
}
