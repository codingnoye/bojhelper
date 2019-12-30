const cheerio = require('cheerio')
const axios = require('axios')
const log = require('./logger.js')
const sheller = require('sheller.js')
const fs = require('fs')
const setting = JSON.parse(fs.readFileSync(__dirname+'/setting.json'))

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const init = async (pwd, num) => {
    log.log('Making problem directory...')
    try {
        fs.mkdirSync(`${pwd}/${num}`)
    } catch (error) {
        log.error('Init failed in making directory.')
    }
    const base = `${pwd}/${num}/`
    log.log('Parsing test cases...')
    const html = await axios.get(`https://www.acmicpc.net/problem/${num}`)
    const $ = cheerio.load(html.data)
    const inputs = $('.sampledata[id*=input]')
    const outputs = $('.sampledata[id*=output]')
    const ins = []
    const outs = []
    const cases = []
    inputs.each((index, item) => {ins.push($(item).text())})
    outputs.each((index, item) => {outs.push($(item).text())})
    if (ins.length == outs.length)
        log.success(`Found ${inputs.length} test cases.`)
    else
        log.warning(`Found ${inputs.length} inputs and ${outputs.length} outputs.`)
    for (let i=0; i<ins.length; i++) {
        const c = {input: ins[i], output: outs[i]}
        cases.push(c)
    }
    try {
        fs.writeFileSync(base+'testcases.json', JSON.stringify(cases, null, 4))
    } catch (error) {
        log.error('Saving test case failed.')
    }
    try {
        fs.writeFileSync(`${base}code.${setting.ext}`, '')
    } catch (error) {
        log.error('Making code file failed.')
    }
    log.success("Successfully initialized.")
}

const test = async (pwd) => {
    const cases = JSON.parse(fs.readFileSync(`${pwd}/testcases.json`))
    await asyncForEach(cases, async (testcase, index)=>{
        log.important(`Test Case #${index}`)
        try{
            const tested = (process.platform == 'win32')?await sheller(`echo ${testcase.input} | ${setting.exe} code.${setting.ext}`):await sheller(`echo "${testcase.input}" | ${setting.exe} code.${setting.ext}`)
            if (tested == testcase.output) {
                log.success("Correct!")
            } else {
                log.warning("Failed!")
                const logpath = `${pwd}/failed-case-${index}.log`
                fs.writeFileSync(logpath, '# Input\n'+testcase.input+'\n# Correct Output\n'+testcase.output+'\n# Failed Output\n'+tested)
                log.log(logpath)
            }
        } catch (e) {
            log.error("Error!")
            const logpath = `${pwd}/error-case-${index}.log`
            fs.writeFileSync(logpath, '# Input\n'+testcase.input+'\n# Correct Output\n'+testcase.output+'\n# Failed Output\n'+e.stdout+'\n# Error\n'+e.stderr)
            log.log(logpath)
            console.error(e.stderr)
        }
        
    })
}

const set = async (ext, exe) => {
    fs.writeFileSync(__dirname+'/setting.json', JSON.stringify({ext:ext, exe:exe}, null, 4))
    log.success('Setting successfully changed.')
}

module.exports = {
    init: init,
    test: test,
    submit: async (pwd, data) => {console.log('submit: '+data)},
    setting: set
}
