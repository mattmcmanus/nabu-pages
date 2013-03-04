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
    yamlfm = require('yaml-front-matter'),
    async = require('async');

/**
 * process and individual file
 * @param  {string}   sourcePath path to source
 * @param  {Function} callback  
 */
var processFile = function(page, callback) {
  callback(null, page);
};

exports.processFiles = function(nabu, callback) {
  var pages = nabu.utils.findFiles(nabu.files, function(file){ 
    return (yamlfm.loadFront(fs.readFileSync(file))); 
  });

  // Update file list
  nabu.files = nabu.utils.removePaths(nabu.files, pages);
  
  // Steps to go through to process the file
  // This feels wrong here. Practically impossible to test
  this.steps = function(page, callback) {
    async.waterfall([
      function(callback) { nabu.processFile(page, callback); },
      function(file, callback) { nabu.processMarkdownFile(file, callback); },
      function(file, callback) { processFile(file, callback); }
    ], 
    function(err, results) {
      callback(err, results);
    });
  };

  async.map(pages, this.steps, function(err, results){
    nabu.site.pages = results;
    callback(err, nabu);
  });
};

var renderFile = function(file, callback){
  var options = {
    title: file.title,
    content: file.content
  };

  callback(null, file, options);
};

exports.renderFiles = function(nabu, callback) {
  this.steps = function(page, callback) {
    async.waterfall([
      function(callback) { renderFile(page, callback); },
      function(file, options, callback) { nabu.renderFile(file, options, callback); }
    ], 
    function(err, results) {
      callback(err, results);
    });
  };

  async.map(nabu.site.pages, this.steps, function(err, results){
    callback(err, nabu);
  });
};