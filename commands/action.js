const path = require('path');
const { realpathSync, existsSync } = require('fs');
const color = require('colorette');

class Action {

    constructor() {
        this.storages = [
            { name: 'controller', alias: 'c|co|con' },
            { name: 'decorator', alias: 'd|dec|de' },
            { name: 'exception', alias: 'e|ex|exc|exce' },
            { name: 'filter', alias: 'f|fi|ft|fil' },
            { name: 'guard', alias: 'gu|gua' },
            { name: 'interceptor', alias: 'i|in|int|inter' },
            { name: 'pipe', alias: 'p|pi' },
            { name: 'middleware', alias: 'm|mi|midd' },
            { name: 'service', alias: 's' }
        ]
    }

    handle(inputs, appPaths) {

        const storge = this.storages.find(storge => inputs.find(input => {
            const alias = storge.alias.split('|');
            return input.value === storge.name
                || input.value === alias[0]
                || input.value === alias[1]
                || input.value === alias[2]
                || input.value === alias[3]
                || input.value === alias[4]
                || input.value === alias[5]
        }));

        if (!storge) {
            console.log(color.yellow(`Invalid file type ${inputs[0].value}`))
            return;
        }

        const dir = this.getAppPath(appPaths);

        const flag = this.validAppPath(dir);

        if (!flag) {
            console.log(color.yellow(`Cannot find egg app path !`))
            return;
        }

        const component = require(`../files/${storge.name}`);

        try {
            Promise
                .resolve((new component(inputs, dir)).generate())
                .then(() => { process.exit(0) })
                .catch(console.log)
        } catch (e) {
            throw e;
        }

    }


    getAppPath(dirs) {
        for (let dir of dirs) {
            if (path.basename(dir) === 'app') {
                return realpathSync(dir);
            }
            dir = path.join(dir, 'app');
            if (existsSync(dir)) {
                return realpathSync(dir);
            }
        }
        return '';
    }

    validAppPath(dir) {
        const servicePath = path.join(dir, 'service');
        const controllerPath = path.join(dir, 'controller');
        const middlewarePath = path.join(dir, 'middleware');
        if (
            existsSync(controllerPath)
            || existsSync(servicePath)
            || existsSync(middlewarePath)
        ) {
            return true;
        }
        return false;
    }
}


module.exports = Action;
