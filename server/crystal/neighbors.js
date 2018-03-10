const R = require('ramda')

const cross = R.curryN(2, (n, point) => {
  const offsets = R.range(-n, n + 1)
  return R.filter(R.compose(R.not, R.equals(point)),
    R.chain(
      index => R.map(offset => R.adjust(R.add(offset), index, point), offsets),
      R.range(0, point.length)
    ))
})

module.exports = {
  cross
}
