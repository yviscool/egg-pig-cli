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
            { name: 'pipe', alias: 'pi' },
            // { name: 'provider', alias: 'pr' },
            { name: 'service', alias: 's' }
        ]
    }

    handle(inputs, appPaths) {

        const storge = this.storages.find(storge => inputs.find(input => input.value === storge.name || input.value === storge.alias));

        if (!storge){
            console.log(`${c.yellow(`Invalid file type ${inputs[0].value}`)} `)
            return; 
        }

        const dir = this.getAppPath(appPaths);

        if (!dir){
            console.log(`${c.yellow(`Cannot find egg app path !`)} `)
            return; 
        }

        const component  = require(`../files/${storge.name}`);
        
        (new component(inputs, dir)).generate();

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


module.exports = Action;