#!/usr/bin/env node
const fs = require('fs-extra')
const yargs = require('yargs')
const chalk = require('chalk')
const log = require('./logger.js')

const pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json'))
const commands = [require('./cmd/init.js'), require('./cmd/test.js'), require('./cmd/set.js')]

const cmds = {}
for (cmd of commands) {
    cmds[cmd.keyword] = cmd.func
}

const argv = yargs.argv._

const main = async () => {
    log.log(`${chalk.blue('BojHelper')} ${chalk.blue(pkg.version)}`)
    if (argv.length >= 1) {
        if (cmds.hasOwnProperty(argv[0])) {
            cmds[argv[0]](argv)
        } else {
            log.error(`Unknown command '${argv[0]}'.`)
        }
    }
}

main()
