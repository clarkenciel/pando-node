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

const includedIn = collection => element => R.contains(element, collection)

const addClosest = nodes => {
  const closest = R.transduce(
    R.compose(R.chain(cross(1)), R.reject(includedIn(nodes))),
    R.minBy(totalTaxi(nodes)),
    R.repeat(Infinity, nodes[0].length),
    nodes
  )

  return R.append(closest, nodes)
}

const expand = R.cond([
  [R.compose(R.isEmpty, R.view(nodes)), R.over(nodes, R.append([0, 0]))],
  [R.T, R.over(nodes, addClosest)]
])

module.exports = {
  // constructors
  empty,
  fromNodes,

  // operations
  expand,

  // lenses
  dimensions,
  nodes,
  latest
}
