'use strict';
/*
 * nabu-pages
 * https://github.com/mattmcmanus/nabu-cli
 *
 * Copyright (c) 2013 Matt McManus
 * Licensed under the MIT license.
 */

// Modules
var path = require('path'),
    fs = require('fs'),
    async = require('async');

var contentFolder = '_pages';

function parse(nabu, callback) {
  var pages = nabu.files.find(nabu._files, function(file){ 
    return (file.indexOf('./_') !== 0 && nabu.files.isMarkdownFile(file));
  });

  async.map(pages, function(post, callback){
    nabu.parse(post, callback);
  }, 
  function(err, results){
    nabu.site.pages = results.reverse();
    callback(err, nabu);
  });
}

exports = module.exports = parse;