const path = require('path');
const fs = require('fs');
const assert = require('assert');


class Action {

    constructor() {
        this.storages = [
            // { name: 'application', alias: 'app' },
            { name: 'controller', alias: 'co' },
            { name: 'extend', alias: 'et' },
            { name: 'decorator', alias: 'd' },
            { name: 'exception', alias: 'e' },
            { name: 'filter', alias: 'f' },
            // { name: 'gateway', alias: 'ga' },
            { name: 'guard', alias: 'gu' },
            { name: 'interceptor', alias: 'i' },
            { name: 'middleware', alias: 'mi' },
            { name: 'module', alias: 'mo' },
            { name: 'pipe', alias: 'pi' },
            // { name: 'provider', alias: 'pr' },
            { name: 'service', alias: 's' }
        ]
    }

    handle(inputs, appPaths) {

        const fileName = this.storages.find(storge => inputs.find(input => input.value === storge.name || input.value === storge.alias)).name;


        const dir = this.getAppPath(appPaths);
        if (!dir){
            throw new Error('can not find egg app path');
        }
        require(`../files/${fileName}`).generate(inputs, dir);

    }



    getAppPath(dirs) {
        for (let dir of dirs) {
            if (path.basename(dir) === 'app'){
                return fs.realpathSync(dir);
            } 
            dir = path.join(dir, 'app');
            if (fs.existsSync(dir)) {
                return fs.realpathSync(dir);
            }
        }
    }
}

class GenerateCommand {


    set(action) {
        this.action = action;
        return this;
    }

    load(program, appPaths) {
        const parse = this.parse.bind(this);
        const action = this.action;
        program
            .command('generate <type> <name> [path]')
            .alias('g')
            .description('Generate egg-pig component.')
            .action((type, name, path, command) => {
                const inputs = [];
                inputs.push(parse('type', type));
                inputs.push(parse('name', name));
                inputs.push(parse('path', path || 'common'));
                action.handle(inputs, appPaths);
            })
    }

    parse(key, value) {
        return {
            key,
            value,
        }
    }
}

class Commander {

    constructor(program) {
        const action = new Action();
        new GenerateCommand().set(action).load(program, this.appPaths);

    }

    get config() {
        return {
            baseDir: process.cwd(),
        }
    }

    get appPaths() {
        const baseDir = this.config.baseDir;
        return [
            path.join(baseDir),
            path.join(baseDir, '..'),
            path.join(baseDir, '../..'),
            path.join(baseDir, '../../..'),
            path.join(baseDir, '../../../..'),
            path.join(baseDir, '../../../../...'),
        ]
    }
}

module.exports = Commander;