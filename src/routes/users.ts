import { Router } from 'express';
import {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser,
} from '../controller/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get('/:userId', getUser);

usersRouter.post('/', postUser);

usersRouter.put('/:userId', putUser);

usersRouter.delete('/:userId', deleteUser);

export default usersRouter;
