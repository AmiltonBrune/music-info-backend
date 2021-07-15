const {
  validateBodyUsersForPost,
  checkPreviousUser,
  validateProfiles,
  receiveTratmentForPost,
  bulkCreateProfilesOfUser,
} = require('./case')
const { httpStatus } = require('../../presenters/statusCodes')
const {
  validateErrorBody,
  normalizePatterResponse,
  getErrorsDefault,
} = require('../../presenters/handle')
const { createUser } = require('../../database/repository/users')

exports.path = '/user'
exports.method = 'post'
exports.middleware = [
  validateBodyUsersForPost,
  validateErrorBody,
  validateProfiles,
  checkPreviousUser,
]
exports.authenticate = false

exports.handler = async (req, res) => {
  try {
    const result = await createUser(receiveTratmentForPost(req))

    const profiles = await bulkCreateProfilesOfUser(
      req.body.profiles,
      result.id
    )

    const { id, name, email, createdAt, updatedAt } = result

    return res.status(httpStatus.OK).json(
      normalizePatterResponse({
        id,
        name,
        email,
        createdAt,
        updatedAt,
        profiles,
      })
    )
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error add user.',
      })
    )
  }
}
