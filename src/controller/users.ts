import { Request, Response } from 'express';
import { FindOptions } from 'sequelize';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
	let { limit = '10', page = '1' } = req.query;

	if (Number(limit) < 0 || limit === '') {
		limit = '10';
		console.warn(`===> ⚠️ Must include valid param limit, default = ${limit}`);
	}

	if (Number(page) < 0 || page === '') {
		page = '1';
		console.warn(`===> ⚠️ Must include valid param page, default = ${page}`);
	}

	const offset = (Number(page) - 1) * Number(limit);

	const options: FindOptions = {
		limit: Number(limit),
		offset: Number(offset),
	};

	try {
		const usersCount = await User.count();
		const users = await User.findAll(options);

		return res.status(200).json({
			status: 'SUCCES',
			msg: 'Users in DB',
			totalRecors: usersCount,
			data: {
				limit,
				page,
				users,
			},
		});
	} catch (error: unknown) {
		console.error(error as string);
		return res.status(500).json({
			status: 'FEILURE',
			msg: 'Internal error, talk to administrator',
			error,
		});
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({
				status: 'BAD REQUEST',
				msg: `User id: ${userId} not found in DB`,
			});
		}

		return res.status(200).json({
			status: 'SUCCES',
			msg: `User id: ${userId}`,
			data: user,
		});
	} catch (error: unknown) {
		console.error(error as string);
		return res.status(500).json({
			status: 'FEILURE',
			msg: 'Internal error, talk to administrator',
			error,
		});
	}
};

export const postUser = async (req: Request, res: Response) => {
	const { body } = req;

	const existEmail = await User.findOne({
		where: {
			email: body.email,
		},
	});

	if (existEmail) {
		return res.status(400).json({
			status: 'BAD REQUEST',
			msg: `Email: ${body.email} already exists in DB`,
			data: body,
		});
	}

	try {
		const newUser = User.build(body);
		await newUser.save();

		return res.json({
			status: 'SUCCES',
			msg: `User ${body.name} saved in DB`,
			data: newUser,
		});
	} catch (error) {
		console.error(error as string);
		return res.status(500).json({
			status: 'FEILURE',
			msg: 'Internal error, talk to administrator',
			error,
		});
	}
};

export const putUser = async (req: Request, res: Response) => {
	const { userId } = req.params;
	const { state, id, email, ...rest } = req.body;

	try {
		const existEmail = await User.findOne({
			where: {
				email: email,
			},
		});

		if (existEmail) {
			return res.status(400).json({
				status: 'BAD REQUEST',
				msg: `Email: ${email} already exists in DB`,
			});
		}

		const userUpdate = await User.findByPk(userId);

		if (!userUpdate) {
			return res.status(404).json({
				status: 'BAD REQUEST',
				msg: `User id: ${userId} not found in DB`,
			});
		}

		await userUpdate.update({ ...rest });

		return res.json({
			status: 'SUCCES',
			msg: `User id: ${userId} updated in DB`,
			data: userUpdate,
		});
	} catch (error) {
		console.error(error as string);
		return res.status(500).json({
			status: 'FEILURE',
			msg: 'Internal error, talk to administrator',
			error,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { userId } = req.params;

	try {
		const userDelete = await User.findByPk(userId);

		if (!userDelete) {
			return res.status(404).json({
				status: 'BAD REQUEST',
				msg: `User id: ${userId} not found in DB`,
			});
		}

		await userDelete.update({ state: false });

		return res.json({
			status: 'SUCCES',
			msg: `User id: ${userId} disabled in DB`,
			data: userDelete,
		});
	} catch (error) {
		console.error(error as string);
		return res.status(500).json({
			status: 'FEILURE',
			msg: 'Internal error, talk to administrator',
			error,
		});
	}
};
