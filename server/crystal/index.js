const R = require('ramda')
const { taxi } = require('./distance')
const { cross } = require('./neighbors')

const withDimensions = n => ({
  dimensions: n,
  nodes: [],
})

const empty = R.cond([
  [R.isNil, () => withDimensions(2)],
  [R.T, withDimensions]
])

const dimensions = R.lensProp('dimensions')

const nodes = R.lensProp('nodes')

const latest = R.compose(nodes, R.lensIndex(-1))

const fromNodes = R.cond([
  [R.isEmpty, () => empty()],
  [R.T, nodeList => R.set(nodes, nodeList, withDimensions(nodeList[0].length))]
])

const totalTaxi = nodes => candidate =>
  R.reduce((sum, node) => sum + taxi(node, candidate), 0, nodes)

const includedIn = R.flip(R.contains)

const addClosest = nodes => {
  const closest = R.transduce(
    R.compose(R.chain(cross(1)), R.reject(includedIn(nodes))),
    R.minBy(totalTaxi(nodes)),
    R.repeat(Infinity, nodes[0].length),
    nodes
  )

  return R.append(closest, nodes)
}

const isEmpty = R.compose(R.isEmpty, R.view(nodes))

const addNode = R.curryN(2, (node, crystal) =>
  R.over(nodes, R.append(node), crystal))

const expand = R.cond([
  [isEmpty, addNode([0, 0])],
  [R.T, R.over(nodes, addClosest)]
])

const contract = R.over(nodes, R.dropLast(1))

module.exports = {
  // constructors
  empty,
  fromNodes,

  // operations
  expand,
  contract,
  isEmpty,

  // lenses
  dimensions,
  nodes,
  latest
}
