'use strict';

const expect = require('chai').expect;
const index = require('../dist/index.js');

describe('convert() function test', () => {
  it('should return expected results', () => {
    const result1 = index.convert([10, 20, 30, 40, 50, 60, 70, 80, 90], 1)
    expect(result1).to.deep.equal(['2.2', '4.4', '6.7', '8.9', '11.1', '13.3', '15.6', '17.8', '20.0']);

    const result2 = index.convert([10, 20, 30], 3)
    expect(result2).to.deep.equal(['16.667', '33.333', '50.000']);
  });
  it('should respect tie', () => {
    const result = index.convert([30, 30, 30], 1, {respectTie: true})
    expect(result).to.deep.equal(['33.3', '33.3', '33.3']);
  });
});
