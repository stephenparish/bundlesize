const fs = require('fs')
const bytes = require('bytes')
const glob = require('glob')
const gzip = require('gzip-size')
const config = require('./config')

const files = []

config.map(file => {
  const paths = glob.sync(file.path)
  paths.map(path => {
    const size = gzip.sync(fs.readFileSync(path, 'utf8'))
    const threshold = bytes(file.threshold)
    files.push({ threshold, path, size })
  })
})

module.exports = files
