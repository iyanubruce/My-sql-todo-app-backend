import { Sequelize } from "sequelize";

const sequelize = new Sequelize("TodoApp", `root`, `0813369`, {
	dialect: "mysql",
	host: "localhost",
});

const connectToDb = async () => {
	try {
		await sequelize.authenticate();
		console.log(`successfully connected to db`);
	} catch (err) {
		console.log(err);
	}
};

export { sequelize, connectToDb };
