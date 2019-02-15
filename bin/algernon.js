#!/usr/bin/env node

const Algernon = require('../lib/algernon')

const program = require('yargs')
  .option('p', {
    describe: 'The pwd to the abi files',
    alias: 'path',
    demand: true
  })
  .version('0.0.1')
  .help('help')
  .usage('Usage: $0 -p <path>')
  .argv

new Algernon(program).parse()
