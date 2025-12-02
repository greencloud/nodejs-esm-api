import pool from '../lib/db.js';

export const getAllProducts = async () => {

    if (pool.connected) {
        console.log('Database connected');
    } else {
        console.log('Database not connected');
    }

    const start = performance.now();

    const res = await pool.query('SELECT * FROM products');

    const end = performance.now();
    console.log(`Query executed in ${(end - start).toFixed(2)} ms`);

    return res.rows;
};

export const getProductById = async (id) => {
    const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return res.rows[0];
};

export const createProduct = async (data) => {
    const res = await pool.query(
        'INSERT INTO products (brand_name, description, quantity) VALUES ($1, $2, $3) RETURNING *',
        data
    );
    return res.rows[0];
};

export const updateProduct = async (id, name, price) => {
    const res = await pool.query(
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
        [name, price, id]
    );
    return res.rows[0];
};

export const deleteProduct = async (id) => {
    const res = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
    );
    return res.rows[0];
};