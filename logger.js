const chalk = require('chalk')

module.exports = {
    warning: (text) => {
        console.log(`${chalk.bgYellow('WARN')} ${text}`)
    },
    error: (text) => {
        console.log(`${chalk.bgRed('ERR')} ${text}`)
    },
    success: (text) => {
        console.log(`${chalk.bgGreen('SUCC')} ${text}`)
    },
    exceeded: (text) => {
        console.log(`${chalk.bgCyan('TIME')} ${text}`)
    },
    important: (text) => {
        console.log(`     ${chalk.bold(text)}`)
    },
    log: (text) => {
        console.log(`     ${text}`)
    },
}
