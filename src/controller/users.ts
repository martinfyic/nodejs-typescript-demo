import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
	const users = await User.findAll();

	return res.status(200).json({
		status: 'OK',
		msg: 'Users in DB',
		data: users,
	});
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await User.findByPk(id);

	if (!user) {
		return res.status(404).json({
			status: 'Not found',
			msg: `User id: ${id} not found in DB`,
			data: user,
		});
	}

	return res.status(200).json({
		status: 'OK',
		msg: `User id: ${id}`,
		data: user,
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
