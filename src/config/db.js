import mysql from "mysql2/promise";

const mysql_backend_jame_libswu = mysql.createPool({
    host: process.env.MYSQL_BACKEND_JAME_LIBSWU_HOST,
    user: process.env.MYSQL_BACKEND_JAME_LIBSWU_USERNAME,
    password: process.env.MYSQL_BACKEND_JAME_LIBSWU_PASSWORD,
    database: process.env.MYSQL_BACKEND_JAME_LIBSWU_DATABASE,
    port: process.env.MYSQL_BACKEND_JAME_LIBSWU_PORT ? parseInt(process.env.MYSQL_BACKEND_JAME_LIBSWU_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export { mysql_backend_jame_libswu };