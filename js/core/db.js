import { STORAGE_KEY } from './constants.js';
import { getLocalStorage } from './utils.js';

export const users = getLocalStorage(STORAGE_KEY) ?? [
	{
		fullname: 'Admin',
		email: 'admin@gmail.com',
		password: '123',
		age: 0,
		company: '-',
	},
];
