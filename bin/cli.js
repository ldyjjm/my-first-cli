#!/usr/bin/env node

const program = require('commander')
const figlet = require('figlet')
const chalk = require('chalk')


// 创建命令
program
    // 定义命令 my-cli create test-demo
    .command('create <app-nam>')
    // 命令的描述
    .description('create a new project')
    // 命令的可选参数，如果是-f,--force，表示强制覆盖
    .option('-f,--force', 'overwrite target directory if it exists')
    // 输出
    .action((name, options) => {
        // 在 create.js 中执行创建任务
        require('../lib/create.js')(name, options)
        //console.log('name:', name, 'options:', options)
    })


program
    // 配置版本号信息
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')


// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options)
    })

// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option)
    })

program
    // 监听 --help 执行
    .on('--help', () => {
        // 打印logo
        console.log('\r\n' + figlet.textSync('my cli', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }));
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`my-cli <command> --help`)} for detailed usage of given command\r\n`)
    })

// 解析用户执行命令传入参数
program.parse(process.argv);
