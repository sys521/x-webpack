'use strict'

const fs = require('fs')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../setting.json')
const path = require('path')

module.exports = () => {
  co(function *(){
    let gitUrl = yield prompt(chalk.yellow('please input your git repository url:'))
    let branch = yield prompt(chalk.yellow('please input your resository branch:'))
    let reg = /^git\@.+\.git$/
    if (reg.test(gitUrl)) {
      let newConfig = Object.assing({},config,{gitUrl,branch})
      let settingPath = path.join(__dirname, '../setting.json')
      fs.writeFile(settingPath, JSON.stringify(newConfig),'utf-8', (err) => {
        if (err) {
          console.log(err)
          process.exit()
        } else {
          console.log(chalk.green('\n setting success'))
          process.exit()
        }
      })
    } else {
      console.log(chalk.green('\n error: a bad git repository url'))
      process.exit()
    }
  })
}