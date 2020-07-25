import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
        [key: string]: string;
}

export class ConfigService {
        private envConfig: EnvConfig;
        private envSchema: Joi.ObjectSchema = Joi.object({
                NODE_ENV: Joi.string().default('development'),
                PORT: Joi.number().default(4000),
                JWT_SECRET: Joi.string(),
                MONGO_HOST: Joi.string().default('mongodb://localhost'),
                MONGO_PORT: Joi.number().default(27017),
                MONGO_DATABASE: Joi.string(),
                REDIS_HOST: Joi.string(),
                REDIS_PORT: Joi.number(),
        });

        constructor(filePath: string) {
                const config = dotenv.parse(fs.readFileSync(filePath));
                this.envConfig = this.validateInput(config, this.envSchema);
                this.envConfig = config;
        }

        get env(): string {
                return this.envConfig.NODE_ENV;
        }

        get port(): number {
                return Number(this.envConfig.PORT);
        }

        get jwtSecret(): string {
                return this.envConfig.JWT_SECRET;
        }

        get mongoConnectionString(): string {
                return `${this.envConfig.MONGO_HOST}:${this.envConfig.MONGO_PORT}/${this.envConfig.MONGO_DATABASE}`;
        }

        get redisUrl(): string {
                return this.envConfig.REDIS_URL;
        }

        get redisPort(): string {
                return this.envConfig.REDIS_PORT;
        }

        private validateInput(envConfig: EnvConfig, envSchema): EnvConfig {
                const { error, value: validated } = envSchema.validate(envConfig);

                if (error) {
                        throw new Error(`Config validation error: ${error.message}`);
                }

                return validated;
        }

}
