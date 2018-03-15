'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const config = require('../setting.json')
module.exports = () => {
  co(function *(){
    let prjName = yield prompt(chalk.yellow('Project name: '))
    let gitUrl
    let branch
    gitUrl = config.gitUrl || "git@github.com:sys521/simple-webpack.git"
    branch = config.branch || "branch"
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