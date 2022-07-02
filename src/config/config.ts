import { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import 'reflect-metadata'

import organization from '../routes/OrganizationRoute';
import { AppDataSource } from './data-source';

/**
 * General project settings
 * @param app 
 * @returns 
 */
export const config = function (app: Express) {

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use('/api/organization', organization);

    AppDataSource.initialize()
        .then(() => console.info('Database: \x1b[32m%s\x1b[0m', 'online'))
        .catch((error) => console.error(error))

    return app;
}