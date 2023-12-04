import { Pool } from 'pg';

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'VAII',
    password: 'admin',
    port: 5432,
};

const pool = new Pool(dbConfig);

export default pool;