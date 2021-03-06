import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' 
            ? "./src/database/database.test.sqlite" 
            : defaultOptions.database
        }) // no script de dev e de test há diferença pela variável de ambiente
    ); // se NODE_ENV === test ele roda o banco de teste
        // senão ele roda o banco normal
}