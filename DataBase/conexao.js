import mysql from "mysql2/promise";

export default async function conectar() {
    //criar um pool de conexões
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    } else {
        global.poolConexoes = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'backend',
            port: 3306,
            password: '1270013306',
            waitForConnections: true,
            connectionLimit: 20,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });
        
          return await global.poolConexoes.getConnection();
    }

}