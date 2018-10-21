'use strict';

const expect = require('chai').expect;
const index = require('../dist/index.js');

describe('convert() function test', () => {
  it('should return expected results', () => {
    expect(index.convert([10, 20, 30, 40, 50, 60, 70, 80, 90], 1))
      .to.deep.equal(['2.2', '4.4', '6.7', '8.9', '11.1', '13.3', '15.6', '17.8', '20.0']);

    expect(index.convert([10, 20, 30], 3))
      .to.deep.equal(['16.667', '33.333', '50.000']);

    expect(index.convert([10000, 1], 2))
      .to.deep.equal(['99.99', '0.01']);

    expect(index.convert([10000, 1], 1))
      .to.deep.equal(['100.0', '0.0']);
  });
});
