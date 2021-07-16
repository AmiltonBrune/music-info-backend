const {
  validateProfiles,
  receiveTratmentForPut,
  removeProfilesOfUsers,
  bulkCreateProfilesOfUser,
} = require('./case')
const { httpStatus } = require('../../presenters/statusCodes')
const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { updateUser } = require('../../database/repository/users')

exports.path = '/user/:id'
exports.method = 'put'
exports.middleware = [validateProfiles, validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Users'

exports.handler = async ({ body, params: { id } }, res) => {
  try {
    await removeProfilesOfUsers(id)
    await bulkCreateProfilesOfUser(body.profiles, id)

    const receiveTratment = receiveTratmentForPut(body, id)

    await updateUser(receiveTratment)

    return res.status(httpStatus.OK).json({
      title: 'Updated user.',
      message: 'User updated successfully.',
    })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error updated user.',
      })
    )
  }
}
