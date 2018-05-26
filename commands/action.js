const path = require('path');
const { realpathSync, existsSync } = require('fs');
const c = require("clorox");

class Action {

    constructor() {
        this.storages = [
            { name: 'controller', alias: 'c|co|con' },
            { name: 'decorator', alias: 'd|dec|de' },
            { name: 'exception', alias: 'ex|exce' },
            { name: 'filter', alias: 'f|fi|ft|fil' },
            { name: 'guard', alias: 'gu|g|gua' },
            { name: 'interceptor', alias: 'i|in|int|inter' },
            { name: 'pipe', alias: 'p|pi' },
            { name: 'middleware', alias: 'mi' },
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
            console.log(`${c.yellow(`Invalid file type ${inputs[0].value}`)} `)
            return;
        }

        const dir = this.getAppPath(appPaths);

        if (!dir) {
            console.log(`${c.yellow(`Cannot find egg app path !`)} `)
            return;
        }

        const component = require(`../files/${storge.name}`);

        (new component(inputs, dir)).generate();

    }


    getAppPath(dirs) {
        for (const dir of dirs) {
            if (path.basename(dir) === 'app') {
                return this.validAppPath(dir);
            }
            dir = path.join(dir, 'app');
            return this.validAppPath(dir);
        }
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
            return realpathSync(dir);
        }
        return false;
    }
}


module.exports = Action;