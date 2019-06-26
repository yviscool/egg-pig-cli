import { IService, EggAppConfig, Application, Context } from 'egg';
import { Controller, Get } from 'egg-pig';

@Controller()
export class <%= name %>Controller {

    constructor(
        private ctx: Context,
        private app: Application,
        private config: EggAppConfig,
        private service: IService,
    ) { }

    @Get()
    async foo() {

    }

}