import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
	res.json({
		status: 'OK',
		msg: 'getUsers',
	});
};

export const getUser = (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({
		status: 'OK',
		msg: 'getUser',
		userId: id,
	});
};

export const postUser = (req: Request, res: Response) => {
	const body = req.body;
	res.json({
		status: 'OK',
		msg: 'postUser',
		created: body,
	});
};

export const putUser = (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;
	res.json({
		status: 'OK',
		msg: 'putUser',
		userId: id,
		dataUpdate: body,
	});
};

export const deleteUser = (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({
		status: 'OK',
		msg: 'deleteUser',
		userId: id,
	});
};
