import { Express } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import 'reflect-metadata'
import { AppDataSource } from './data-source';

import organization from '../routes/OrganizationRoute';
import repository from '../routes/RepositoryRoute';
import tribe from '../routes/TribeRoute';
import metrics from '../routes/MetricsRoute';

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
    app.use('/api/repository', repository);
    app.use('/api/tribe', tribe);
    app.use('/api/metrics', metrics);

    AppDataSource.initialize()
        .then(() => console.info('Database: \x1b[32m%s\x1b[0m', 'online'))
        .catch((error) => console.error(error))

    return app;
}