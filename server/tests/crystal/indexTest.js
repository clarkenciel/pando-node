const { expect } = require('chai')
const R = require('ramda')
const C = require('../../crystal')

describe('empty', () => {
  it('should return an empty crystal', () =>
    expect(R.view(C.nodes, C.empty(3))).to.eql([]))

  it('should have "n" dimensions', () =>
    expect(R.view(C.dimensions, C.empty(3))).to.equal(3))

  it('should default to 2 dimensions', () =>
    expect(R.view(C.dimensions, C.empty())).to.equal(2))
})

describe('fromNodes', () => {
  it('should build a crystal from the nodes provided', () =>
    expect(C.fromNodes([[0, 0], [1, 0]]).nodes).to.eql([
      [0, 0],
      [1, 0]
    ]))

  it('should set dimensionality automatically', () =>
    expect(C.fromNodes([[0, 0, 0], [1, 0, 0]]).dimensions).to.equal(3))

  it('should build the crystal "in order" of the provided notes', () =>
    expect(R.view(C.latest, C.fromNodes([[0, 0], [1, 0]]))).to.eql([1, 0]))
})

describe('expand', () => {
  it('should add origin to an empty crystal', () =>
    expect(R.view(C.nodes, C.expand(C.empty()))).to.eql([[0, 0]]))

  it('should add a new node that is closest to all of the existing nodes', () =>
    expect(R.view(C.nodes, C.expand(C.fromNodes([[0, 0], [1, 0], [0, -1]]))))
      .to.eql([
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1],
      ]))

  it('should choose a new node randomly in the case of a tie')
})

describe('contract', () =>{
  it('should remove the last added node from the crystal', () =>
    expect(C.contract(C.fromNodes([[0,0], [1,0]])).nodes)
      .to.eql([0, 0]))
})
