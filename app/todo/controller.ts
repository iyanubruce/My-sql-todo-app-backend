import { Request, Response } from "express";
import { Task } from "./model";

export const getTodoList = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching tasks" });
	}
};

export const postTodo = async (req: Request, res: Response) => {
	const { content, description } = req.body;
	if (!content || !description) {
		res.status(400).json({
			message: "Content and description are required.",
		});
		return;
	}

	const newTask = Task.build({
		content,
		description,
	});
	try {
		await newTask.save();
		res.status(201).json({ message: "task created" });
		return;
	} catch (error: any) {
		console.error(error);
		res.status(500).json({
			message: "Error creating task",
			error: error.message,
		});
	}
};

export async function getById(req: Request, res: Response) {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!task) {
			res.status(400).json({ message: "task does not exist" });
			return;
		}
		res.status(200).json({ data: task, message: "Fetched successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error creating task",
			error: error,
		});
	}
}

export async function setComplete(req: Request, res: Response) {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.id,
			},
		});

		if (!task) {
			res.status(400).json({ message: "task does not exist" });
			return;
		}
		const { is_complete } = req.body;
		await task.set({
			is_complete: is_complete,
		});
		await task.save();

		res.status(200).json({ data: task, message: "Fetched successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error creating task",
			error: error,
		});
	}
}

export const changeTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!task) {
			res.status(400).json({ message: "task does not exist" });
			return;
		}

		const { is_complete, content, description } = req.body;
		if (!content || !description) {
			res.status(400).json({
				message: "Content and description are required.",
			});
			return;
		}
		await task.set({
			is_complete: is_complete,
			content: content,
			description: description,
		});
		await task.save();

		res.status(200).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error creating task",
			error: error,
		});
	}
};

export const deleteRequest = async (req: Request, res: Response) => {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!task) {
			res.status(400).json({ message: "task does not exist" });
			return;
		}
		await task.destroy();
		res.status(200).json({ message: 'User deleted successfully.' }); 
		return
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error creating task",
			error: error,
		});
	}
};
