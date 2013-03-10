'use strict';

var nabu_pages = require('../nabu-pages.js');

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

console.log(process.cwd());

var nabu = require('../../nabu/lib/nabu');


nabu._files = [ './index.html.jade',
    './test/fixtures/sample.md',
    './styles.css',
    './_layouts/default.jade',
    './_layouts/post.jade',
    './_posts/2012-12-1-sample1.md',
    './_posts/2013-01-12-sample2.md',
    './images/anchor-porter.jpg' ];
  
nabu.site.renderer = 'jade';
nabu.site.layouts = { post: './_layouts/post.jade' };

exports['nabu'] = {
  setUp: function(done) {
    done();
  },
  'parse': function(test) {
    test.expect(4); // There should be two pages pages to test
    
    nabu.md = function(string) { test.ok(string, "A string of markdown to parse"); return "Markdowned!"; };

    nabu_pages.parse(nabu, function(err, nabu){
      test.ok(nabu.site.pages, "There shold be a nabu pages object");
      test.equal(nabu.site.pages.length, 1, "There shold be one page");
      test.equal(nabu.site.pages[0].content, "Markdowned!", "The markdown was parsed");

      // test.ok((nabu.site.length > 0), "There shold be at least 1 page");
      test.done();
    });
    
  },
  tearDown: function(done) {
    done();
  }
};
