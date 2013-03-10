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

exports.parse = function(nabu, callback) {
  var pages = nabu.files.find(nabu._files, function(file){ 
    return (file.indexOf('./_') !== 0 && nabu.files.isMarkdownFile(file));
  });

  this.steps = function(post, callback){
    nabu.parse(post, callback);
  };

  async.map(pages, this.steps, function(err, results){
    nabu.site.pages = results.reverse();
    callback(err, nabu);
  });
};