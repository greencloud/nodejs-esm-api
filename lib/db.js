
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'postgres',
    max: 10, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
});

export const query = (text, params) => pool.query(text, params);

export const getClient = async () => {
    const client = await pool.connect();
    return client;
};

export default pool;