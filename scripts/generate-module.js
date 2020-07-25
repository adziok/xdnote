const fs = require('fs');

const config = {
    name: 'Note',
    nameToLowerCase: 'note',
    schema: 'Note',
    schemaLowerCase: 'note'
};

const startWithLowerCase = (t) => t[0].toLowerCase()+t.slice(1,Infinity)

const moduleWithModel = `import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ${config.name}Controller } from './${config.nameToLowerCase}.controller';
import { ${config.name}Service } from './${config.nameToLowerCase}.service';
import { ${config.schema} } from './model/${config.schemaLowerCase}.model';
import { ${config.schema}Repository } from './model/${config.schemaLowerCase}.repository';

@Module({
    imports: [
        TypegooseModule.forFeature([${config.schema}]),
    ],
    controllers: [${config.name}Controller],
    providers: [${config.name}Service, ${config.schema}Repository],
    exports: [${config.name}Service],
})
export class ${config.name}Module {}
`;

const defaultSchema = `import { prop } from '@typegoose/typegoose';

export class ${config.schema} {
    // tslint:disable-next-line: variable-name
    _id: string | any;

    @prop()
    test: string;

    createdAt: Date;
    updatedAt: Date;
}

`

const defaultRepository = `import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { ${config.schema} } from './${config.schemaLowerCase}.model';

const logger = new Logger('${config.schema}Repository');

@Injectable()
export class ${config.schema}Repository {
    constructor(@InjectModel(${config.schema}) private readonly ${startWithLowerCase(config.schema)}Model: ModelType<${config.schema}>) { }
}
`;

const defaultService = `import { Injectable } from '@nestjs/common';

import { ${config.schema}Repository } from './model/${config.schemaLowerCase}.repository';

@Injectable()
export class ${config.name}Service {
    constructor(private ${startWithLowerCase(config.schema)}Repository: ${config.schema}Repository) {}

}
`;

const defaultController = `import { Controller, Get } from '@nestjs/common';

import { ${config.name}Service } from './${config.nameToLowerCase}.service';

@Controller('/${config.name.toLowerCase()}')
export class ${config.name}Controller {
    constructor(private readonly ${config.name.toLowerCase()}Service: ${config.name}Service) {}

    @Get()
    public ping() {
        return 'pong';
    }

}
`;


if(!fs.existsSync(`./src/modules/${config.nameToLowerCase}`)){
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}`, 0766);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.module.ts`, moduleWithModel);
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}/model`, 0766);
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}/dto`, 0766);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/model/${config.schemaLowerCase}.model.ts`, defaultSchema);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/model/${config.schemaLowerCase}.repository.ts`, defaultRepository);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.controller.ts`, defaultController);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.service.ts`, defaultService);
}
