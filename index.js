#!/usr/bin/env node
const fs = require('fs')
const log = require('./logger.js')
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const yargs = require('yargs')
const chalk = require('chalk')

log.log(`${chalk.blue('BojHelper')} ${chalk.bgBlue(pkg.version)}`)

const argv = yargs.argv._
const options = yargs.argv

const { init, test, submit } = require('./engine')
const main = async () => {
    if (argv.length >= 1 ) {
        if (argv[0] == 'init') {
            if (argv.length >= 2) {
                init(process.cwd(), argv[1])
            }
            else {
                log.error(`'boj init' needs problem number.`)
            }
        } else if (argv[0] == 'test') {
            log.error('Test is TODO feature.')
        } else if (argv[0] == 'submit') {
            log.error('Submit is TODO feature.')
        } else {
            log.error(`Unknown command '${argv[0]}'.`)
        }
    }
}
main()
