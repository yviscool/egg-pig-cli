

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

module.exports = GenerateCommand;