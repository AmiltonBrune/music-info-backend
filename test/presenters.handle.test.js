const { getErrorsDefault } = require('../src/presenters/handle')

test('getErrorsDefault', () => {
  expect(getErrorsDefault()).toEqual({
    errors: [
      {
        title: 'There was an error',
        detail: undefined,
        message: {},
      },
    ],
  })
})
