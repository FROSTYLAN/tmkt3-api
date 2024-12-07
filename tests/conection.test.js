const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  });

client
  .connect()
  .then(() => {
    console.log("Conexión exitosa a PostgreSQL");
    return client.end();
  })
  .catch((err) => console.error("Error de conexión", err));
