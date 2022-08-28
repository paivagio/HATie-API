import mysql from 'mysql2/promise';
import { resolve } from "path";

require("dotenv").config({
    path: resolve(__dirname, "..", ".env.test"),
});

export default async () => {
    console.log("Cleaning up database...");
    const connectionString = `${process.env.DATABASE_URL}`;
    const tables = ["group_members", "groups", "institutions", "members", "users", "summarizations", "patients"];

    const client = await mysql.createConnection(connectionString);

    await client.execute("SET FOREIGN_KEY_CHECKS = 0");
    tables.forEach(async tableName => await client.execute(`TRUNCATE hatie_tests.${tableName}`));
    await client.query("SET FOREIGN_KEY_CHECKS = 1");

    await client.end();
    console.log("Cleaned up database!");
};