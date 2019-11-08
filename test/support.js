const log = process.env.VERBOSE === true ? console.log : _=> {};
const expect = require('chai').expect;

class MockFunction {
  constructor() {
    this._calls = [];
  }

  fun() {
    return (args) => {
      this._calls.push(args);
    }
  }

  mustHaveBeenCalledWith(expected = {}) {
    expect(this._calls).to.not.be.empty;
    
    expect(this._calls[0]).to.eql(expected, 
      `Expected:\n\n${JSON.stringify(expected, null, 2)}\n\nGot:\n\n${JSON.stringify(this._calls[0], null, 2)}`);
  }
}

module.exports.log = log;
module.exports.expect = expect;
module.exports.MockFunction = MockFunction;