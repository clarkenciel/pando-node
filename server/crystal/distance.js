const R = require('ramda')

const taxi = R.curryN(2, (pointA, pointB) =>
  R.sum(R.zipWith(R.compose(Math.abs, R.subtract), pointA, pointB)))

module.exports = {
  taxi
}
