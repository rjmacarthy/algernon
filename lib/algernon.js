const { readFileSync, existsSync, writeFileSync, mkdirSync } = require('fs')
const glob = require('glob')
const join = require('path').join
const last = require('lodash/last')

class Algernon {
  constructor (opts) {
    this.opts = { abiDir: opts.path }
  }

  parse () {
    this.mkDirOut()
    this.writeEthBase()
    const paths = this.getPaths()
    for (var i = 0; i < paths.length; i++) {
      let path = paths[i]
      const json = readFileSync(join(path), 'utf-8')
      var abis = JSON.parse(json)
      this.writeInterface(abis, path)
    }
  }

  mkDirOut () {
    !existsSync('./algernon') && mkdirSync('./algernon')
  }

  writeEthBase () {
    let ethBase = `
      export interface EthBase {
        call: (options?: any, callback?: Function) => Promise<any>,
        send: (options: any, callback?: Function) => Promise<any>,
        estimateGas: (options?: any, callback?: Function) => Promise<any>,
        encodeABI: () => Promise<any>
      }
    `
    writeFileSync(`./algernon/EthBase.ts`, ethBase)
  }

  getPaths () {
    return glob.sync(`${this.opts.abiDir}/**/*.abi`)
  }

  writeInterface (abis, fileName) {
    fileName = last(fileName.split('/')).replace('.abi', '')
    fileName = last(fileName.split('_'))
    let abstraction = ``
    abstraction += `
        import { EthBase } from './EthBase';
        `
    abstraction += `export interface ${fileName} extends EthBase { ${this.writeInterfaceMethods(abis, fileName)}}`
    writeFileSync(`./algernon/${fileName + '.ts'}`, abstraction)
  }

  writeInterfaceMethods (abis, fileName) {
    let interfaceMethods = ``
    for (var i = 0; i < abis.length; i++) {
      let abi = abis[i]
      interfaceMethods += `${abi.name} : (${abi.inputs.length ? abi.inputs.map(x => x.name) : ''}) => ${abi.outputs && abi.outputs.length ? 'EthBase' : 'void'};`
    }
    return interfaceMethods
  }
}

module.exports = Algernon
