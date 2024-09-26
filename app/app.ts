import express, { Request, Response, NextFunction } from "express";
import { sequelize, connectToDb } from "./utils/db";
import {routes as apiRoutes} from "./todo/routes"
const app = express();
app.use(express.json());
const PORT = 8000;

app.use("/api", apiRoutes)
app.get("/", (req: Request, res: Response) => {
	res.send("welcome to the server");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

export default function start() {
	app.listen(PORT, async () => {
		console.log(`server listening at port ${PORT}`);
		await connectToDb();
	});
}
