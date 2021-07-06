import { createConnection } from 'typeorm';

createConnection()
/*const connection = async () => {
    return await createConnection();
}
async (connection:any) =>{
    await connection.query("PRAGMA foreign_keys=OFF;");
    await connection.runMigrations();
    await connection.query("PRAGMA foreign_keys=ON;");
}*/

