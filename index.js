/**
 * @file 入口模块
 * @author sparklewhy@gmail.com
 */

var pkgManage = require('fisx-package');

exports.name = 'uninstall <components>';
exports.desc = 'uninstall components package';
exports.options = {
    '-h, --help': 'print this help message',
    '-r, --root <path>': 'set project root',
    '-s, --save': 'save component(s) dependencies into `package.json` file',
    '-d, --save-dev': 'save component(s) dependencies into `package.json` devDependencies'
};

exports.run = function (argv, cli, env) {
    if (argv.h || argv.help) {
        return cli.help(exports.name, exports.options);
    }

    argv._.shift();
    var removeComponents = argv._;
    var options = {
        root: env.cwd,
        saveToDevDep: argv['save-dev'] || argv.d,
        saveToDep: argv.save || argv.s
    };
    return pkgManage.initProjectRoot(env.configNameSearch[0], options, fis)
        .then(pkgManage.loadUserConfig.bind(this, env.configNameSearch[0], options, fis))
        .then(function () {
            return pkgManage.uninstall(removeComponents, options);
        });
};
