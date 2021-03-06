const { existsSync, readFileSync } = require('fs')
const assert = require('assert')
const path = require('path')
var Algernon = require('../lib/algernon')

describe('Integration tests', () => {
  it('can parse an abi and create folder and interfaces', () => {
    new Algernon({
      path: path.join(__dirname, '/test-abis')
    }).parse()
    assert.strictEqual(existsSync('../algernon'), true)
  })

  it('It writes the base interface correctly', () => {
    const file = readFileSync(path.join(__dirname, '../algernon/Base.ts'), 'utf-8').trim().replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ')
    let expected = `import { EthBase } from './EthBase'; export interface Base extends EthBase { counter : () => EthBase;}`
    assert.strictEqual(file, expected)
  })
})
