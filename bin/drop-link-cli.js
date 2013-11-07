#!/usr/bin/env node

var createDropLink = require('../').createDropLink
var argv = process.argv

if (argv.length < 3) {
  console.log('Usage: drop-link url [outfile]')
} else {
  createDropLink(argv[2], argv[3]).on('error', function(err) {
    console.log('Error creating drop-link: ' + err.message)
  }).on('finish:drop-link', function(outfile) {
    console.log('Created ' + outfile)
  })
}
