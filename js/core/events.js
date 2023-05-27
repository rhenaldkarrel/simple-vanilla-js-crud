import { users } from './db.js';
import { findUserIndex, getUserFormValues, saveData } from './utils.js';

export function addUser() {
	const { fullname, email, birthday, age, company, password } = getUserFormValues();

	const data = {
		id: Date.now(),
		fullname,
		email,
		birthday,
		age,
		company,
    password,
	};

	users.push(data);
	saveData();

	alert('Success adding data!');
}

export function editUser(userId) {
	const data = users.find((u) => u.id === userId);

	if (!data) {
		alert('No data found!');
		return;
	}

	const dataIndex = findUserIndex(userId);

	const { fullname, email, birthday, age, company, password } = getUserFormValues();

	const updatedData = {
		id: userId,
		fullname,
		email,
		birthday,
		age,
		company,
    password,
	};

	users[dataIndex] = updatedData;
	saveData();

	alert('Success updating data!');
}
