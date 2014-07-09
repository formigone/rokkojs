var grunt = require('grunt');
var sinon = require('sinon');
var _ = require('underscore');
var builder = require('../').builder;
var configs = require('./configs.fix');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var stubIsFile;

exports.builder = {
  setUp: function(done) {
    stubIsFile = sinon.stub( grunt.file, 'isFile' );
    stubIsFile.returns( true );
    done();
  },
  tearDown: function(done) {
    stubIsFile.restore();
    done();
  },
  default_options: function( test ) {
    test.expect(1);

    var actual = builder.createCommand( configs.builder.withCompileOpts,
      configs.builder.withCompileFileObj );

    var expected = grunt.file.read('test/expected/default-options');

    test.equal(actual, expected, 'Should be equal');

    test.done();
  },
  pythonbinary_option: function( test ) {
    test.expect(1);

    var builder_actual = builder.createCommand( _.extend({}, configs.builder.withCompileOpts, { pythonBinary: 'new_python' }),
      configs.builder.withCompileFileObj );
    var builder_expected = grunt.file.read('test/expected/pythonbinary-options');

    test.equal(builder_actual, builder_expected, 'Should be equal');

    test.done();
  }
};
