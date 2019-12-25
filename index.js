#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const yargs = require('yargs')

console.log(`${chalk.blue('BojHelper')} ${chalk.bgBlue(pkg.version)}`)
const argv = yargs.argv._
const options = yargs.argv

const { init, test, submit } = require('./engine')

if (argv.length >= 1 ) {
    if (argv[0] == 'init') {
        if (argv.length >= 2) {
            init(process.cwd(), argv[1])
        }
        else {
            console.log(`${chalk.bgRed('ERROR')} 'boj init' needs problem number`)
        }
    }
} 
