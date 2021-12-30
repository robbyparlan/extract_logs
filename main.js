'use strict'
var { checkIsFile, opts, processFile } = require('./libs/helper')
const { platform } = require('process')

async function main() {
  try {
    if (!opts.args)
      throw Error('Parameter directory /var/log not found!')

    let pathFile = opts.args[0]
    var tmp = await checkIsFile(pathFile)

    if (!tmp)
      throw Error(`file not found! : [${pathFile}]`)

    let typeFile = 'text'
    let path = platform == 'win32' ? '\\' : '/'
    let outputFile = __dirname + path +'log'
    let isType = opts.type ? true : false
    let isOutput = opts.output ? true : false
    // console.log(outputFile)
    
    if (isType && !isOutput) {
      typeFile = opts.args[1]
      console.log(typeFile)
      if (typeFile.trim() !== 'json' && typeFile.trim() !== 'text') throw Error(`type file [${typeFile}] not allowed!`)
    } else if (!isType && isOutput) {
      outputFile = opts.args[1]
    } else if (isType && isOutput) {
      typeFile = opts.args[1]
      if (typeFile.trim() !== 'json' && typeFile.trim() !== 'text') throw Error(`type file [${typeFile}] not allowed!`)
      outputFile = opts.args[2]
    }
  
    await processFile(pathFile, typeFile, isType, outputFile, isOutput)
    
  } catch (error) {
    console.log(error)
  }

}

main()



// try {
//   const data = fs.readFileSync(folder, 'utf8')
//   console.log(data)
// } catch (err) {
//   console.error(err)
// }