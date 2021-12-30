'use strict'

const fs = require('fs').promises;
const { existsSync, mkdirSync, platform } = require('fs')
var stdio = require('stdio')


var opts = stdio.getopt({
  'type': {key: 't', description: 'Type Output File'},
  'output': {key: 'o', description: 'Path Output File'}
});

async function checkIsFile (path) {
  var isFile = false
  try {
    const stat = await fs.lstat(path);

    isFile = stat.isFile()
    return isFile
  } catch (error) {
    return isFile
  }
}

async function processFile(path, type, isType, output, isOutput) {
  let tmp = []
  let dataJson = []
  let data = await fs.readFile(path, 'utf8')
  data = data.trim()
  let checkNewLine = true
  if (data.indexOf("\n") == -1) checkNewLine = false
  data = checkNewLine ? data.split('\n') : (data = [data])
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    tmp.push(el.split(' '))
  }

  for (let x = 0; x < tmp.length; x++) {
    const chk = tmp[x];
    dataJson.push({
      timestamp: chk[0]+' '+chk[1],
      level: chk[2],
      ppid: chk[3],
      messages: chk[4]+' '+chk[5]+' '+chk[6],
      host: chk[7],
      ip:  chk[9] ? chk[9].replace(',', '') : '',
      status: chk[10]
    })
  }

  if (type === 'json' && !isOutput) {
    if (!existsSync(output)){
      mkdirSync(output);
    }
    dataJson = JSON.stringify(dataJson)
    let path = platform == 'win32' ? '\\' : '/'
    let filename = 'error.json'
    let fullPath = output + path + filename
    console.log('output file', fullPath)
    await fs.writeFile(fullPath, dataJson)
  } else if (type === 'text' && !isOutput) {
    if (!existsSync(output)){
      mkdirSync(output);
    }
    let path = platform == 'win32' ? '\\' : '/'
    let filename = 'error.txt'
    let fullPath = output + path + filename
    console.log('output file', fullPath)
    await fs.writeFile(fullPath, data)
  } else if (isType && isOutput) {
    let path = platform == 'win32' ? '\\' : '/'
    let filename = output.match(/[^\\/]+\.[^\\/]+$/)[0];

    let len = filename.length
    let tmpFullPath = output.slice(0,-len)
    if (!existsSync(tmpFullPath)){
      mkdirSync(tmpFullPath);
    }
    let fullPath = tmpFullPath+path+filename
    console.log('output file', fullPath)
    if (type == 'json') {
      dataJson = JSON.stringify(dataJson)
      await fs.writeFile(fullPath, dataJson)
    }
    else {
      await fs.writeFile(fullPath, data)  
    }
  } else {
    let path = platform == 'win32' ? '\\' : '/'
    let filename = output.match(/[^\\/]+\.[^\\/]+$/)[0];

    let len = filename.length
    let tmpFullPath = output.slice(0,-len)

    if (!existsSync(tmpFullPath)){
      mkdirSync(tmpFullPath);
    }
    let fullPath = tmpFullPath+path+filename
    console.log('output file', fullPath)
    if (fullPath.slice(-4) == 'json') {
      dataJson = JSON.stringify(dataJson)
      await fs.writeFile(fullPath, dataJson)
    }
    else {
      await fs.writeFile(fullPath, data)  
    }
  }


}

module.exports = {
  checkIsFile, opts, processFile
}