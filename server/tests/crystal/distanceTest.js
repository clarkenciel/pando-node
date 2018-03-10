const { expect } = require('chai')
const { taxi } = require('../../crystal/distance')

describe('taxi', () => {
  it('should return the taxi distance between two points', () =>
    expect(taxi([0, 0], [1, 1])).to.equal(2))
})
