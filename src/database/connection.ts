import { Sequelize } from 'sequelize';

const databaseName = process.env.DB_NAME ?? 'database-name';
const databaseUser = process.env.DB_USER ?? 'database-user';
const databasePassword = process.env.DB_PASSWORD ?? 'database-user-password';
const databaseUrl = process.env.DB_HOST ?? 'database-url';

const db = new Sequelize(databaseName, databaseUser, databasePassword, {
	host: databaseUrl,
	dialect: 'mysql',
	logging: false, // ==> para no mostrar las queris por consolas
});

export default db;
