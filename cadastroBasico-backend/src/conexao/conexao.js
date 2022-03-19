const { Pool } = require('pg');
require("dotenv/config");

async function connect() {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: 
            `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DB}`
    });
    
    global.connection = pool;
    
    return pool.connect();
}

module.exports = {connect}