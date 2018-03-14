'use strict'

const fs = require('fs')
const co = require('co')
const chalk = require('chalk')
const config = require('../setting.json')
const path = require('path')

module.exports = () => {
  let obj = {
    notIE8: {
      gitUrl:'',
      branch:'master'
    },
    IE8: {
      gitUrl:'',
      branch:'master'
    }
  }
  let settingPath = path.join(__dirname, '../setting.json')
  co(function *(){
    fs.writeFile(settingPath, JSON.stringify(obj), 'utf-8', (err) => {
      if (err) {
        console.log(`error:${err}`)
      } else {
        console.log(chalk.green('\n √ reset success!'))
      }
      process.exit()
    })
  })
}