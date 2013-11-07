/*
 * drop-link
 * https://github.com/sfrdmn/drop-link
 *
 * Copyright (c) 2013 Sean Fridman
 * Licensed under the MIT license.
 */

'use strict';

var url = require('url')
var fs = require('fs')
var template = fs.readFileSync(__dirname + '/template.html', 'utf8')

exports.createDropLink = function(link, outfile) {
  var parsed = url.parse(link || '')
  outfile = outfile || parsed.hostname + parsed.path
  outfile = outfile.replace(/\/$/, '').replace(/\//g, '-').concat('.html')
  var html = template.replace(/\{\{location\}\}/g, url.format(parsed))
  var stream = fs.createWriteStream(outfile, {encoding: 'utf8'})
  stream.on('finish', function() {
    stream.emit('finish:drop-link', outfile)
  })
  stream.end(html)
  return stream
}
