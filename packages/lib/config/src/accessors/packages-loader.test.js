const proxyquire = require('proxyquire');
const {expect, sinon} = require('../../../../../test/helpers');
const loadPkgs = require('./packages-loader');

describe('packages-loader', function () {
  it('exports a function', function () {
    expect(loadPkgs).to.be.a('function');
  });

  it('returns an array', function () {
    expect(loadPkgs([])).to.be.an('array');
  });

  it('calls the package-loader accessor for each item in the array', function () {
    const packages = [() => ({}), () => ({}), () => ({})];
    const spy = sinon.spy();
    const loadPkgs = proxyquire('./packages-loader', {
      './package-loader': spy
    });
    loadPkgs(packages);
    expect(spy.callCount).to.equal(packages.length);
  });
});
