'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../setting.json')
module.exports = () => {
  co(function *(){
    let prjName = yield prompt(chalk.yellow('Project name: '))
    let ie8 = yield prompt(chalk.yellow('compatibility ie8 ? (y or n):'))
    let gitUrl
    let branch
    if (ie8.toLowerCase() === 'yes' || ie8.toLowerCase() === 'y') {
      gitUrl = config.notIE8.gitUrl || 'git@github.com:sys521/test.git'
      branch = config.notIE8.gitUrl || 'master'
    } else {
      gitUrl = config.IE8.gitUrl || 'git@github.com:sys521/test.git'
      branch = config.IE8.gitUrl || 'master'
    }
    let cmdStr = `git clone ${gitUrl} ${prjName} && cd ${prjName} && git checkout ${branch}`
    console.log(chalk.white('\n Start generating...'))
    
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${prjName} && npm install \n`)
      process.exit()
    })
  })
}