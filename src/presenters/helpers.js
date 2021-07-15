exports.getUniqueElement = (arr) => {
  return arr.filter((a, i) => {
    return arr.indexOf(a) === i
  })
}
