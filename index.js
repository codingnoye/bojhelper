#!/usr/bin/env node
const fs = require('fs')
const log = require('./logger.js')
const pkg = JSON.parse(fs.readFileSync(__dirname+'/package.json'))
const yargs = require('yargs')
const chalk = require('chalk')

log.log(`${chalk.blue('BojHelper')} ${chalk.bgBlue(pkg.version)}`)

const argv = yargs.argv._
const options = yargs.argv

const { init, test, submit, setting } = require('./engine')
const main = async () => {
    if (argv.length >= 1 ) {
        if (argv[0] == 'init') {
            if (argv.length >= 2) {
                await init(process.cwd(), argv[1])
            }
            else {
                log.error(`Usage: 'boj init [problem_number]'`)
            }
        } else if (argv[0] == 'test') {
            await test(process.cwd())
        } else if (argv[0] == 'submit') {
            log.error('Submit is TODO feature.')
        } else if (argv[0] == 'setting') {
            if (argv.length == 3) {
                await setting(argv[1], argv[2])
            } else {
                log.error(`Usage: 'boj setting [ext] [exe]'`)
            }
        } else {
            log.error(`Unknown command '${argv[0]}'.`)
        }
    }
}
main()
