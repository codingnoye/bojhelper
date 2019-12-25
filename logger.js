const chalk = require("chalk")

module.exports = {
    warning: (text) => {
        console.log(`${chalk.bgOrange('WARN')} ${text}`)
    },
    error: (text) => {
        console.log(`${chalk.bgRed('ERR ')} ${text}`)
    },
    success: (text) => {
        console.log(`${chalk.bgGreen('SUCC')} ${text}`)
    },
    log: (text) => {
        console.log(text)
    }
}
