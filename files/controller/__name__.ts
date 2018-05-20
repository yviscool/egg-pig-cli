import { BaseContextClass } from 'egg';
import { Controller, Get } from 'egg-pig';

@Controller()
export default class <%= name %>Controller extends BaseContextClass {

    @Get()
    async foo() {
    }
}