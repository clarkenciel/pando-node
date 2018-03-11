const { expect } = require('chai')
const { cross } = require('../../crystal/neighbors')

describe('Neighbors', () => {
  describe('cross', () => {
    it('should return neighboring coordinates, in a cross shape to "n" depth', () => {
      expect(cross(1, [0,0])).to.eql([
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ])

      expect(cross(1, [0,-1])).to.eql([
        [-1, -1],
        [1, -1],
        [0, -2],
        [0, 0],
      ])

      expect(cross(2, [0,0])).to.eql([
        [-2, 0],
        [-1, 0],
        [1, 0],
        [2, 0],
        [0, -2],
        [0, -1],
        [0, 1],
        [0, 2]
      ])
    })
  })
})
