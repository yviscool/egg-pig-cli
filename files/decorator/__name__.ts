import { ReflectMetadata } from 'egg-pig';

export const <%= name  %> = (...args: string[]) => ReflectMetadata('<%= name %>', args);
