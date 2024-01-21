import { Pool } from 'pg';

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'VAII',
    password: 'admin',
    port: 5432,
};

const pool = new Pool(dbConfig);

pool.on('error', (err, client) => {
    console.error('Unexpected error on client', err);
    process.exit(-1);
});
export default pool;