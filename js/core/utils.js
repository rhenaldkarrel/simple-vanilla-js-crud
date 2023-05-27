import { users } from './db.js';
import { AUTH_KEY, STORAGE_KEY } from './constants.js';

export function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(users);
		localStorage.setItem(STORAGE_KEY, parsed);
	}
}

export function isStorageExist() {
	if (typeof Storage === undefined) {
		alert('Browser kamu tidak mendukung local storage');
		return false;
	}

	return true;
}

export function loadDataFromStorage() {
	displayUserToTable(users);
}

export function getUserFormValues() {
	const fullname = document.getElementById('fullname').value;
	const email = document.getElementById('email').value;
	const birthday = document.getElementById('birthday').value;
	const age = document.getElementById('age').value;
	const company = document.getElementById('company').value;
	const password = document.getElementById('password').value;

	return {
		fullname,
		email,
		birthday,
		age,
		company,
		password,
	};
}

export function setPageTitle(title) {
	document.title = title;
}

export function redirectTo(path) {
	window.location.href = '' + path;
}

export function displayUserToTable(users) {
	const tableBody = document.querySelector('.table-user tbody');

	for (let user of users) {
		const trData = document.createElement('tr');

		const tdName = document.createElement('td');
		tdName.textContent = user.fullname;

		const tdEmail = document.createElement('td');
		tdEmail.textContent = user.email;

		const tdBirthday = document.createElement('td');
		tdBirthday.textContent = new Date(user.birthday).toLocaleDateString();

		const tdAge = document.createElement('td');
		tdAge.textContent = user.age;

		const tdCompany = document.createElement('td');
		tdCompany.textContent = user.company;

		const tdAction = document.createElement('td');
		tdAction.classList.add('action-buttons');

		const btnEdit = document.createElement('button');
		btnEdit.textContent = 'Edit';
		btnEdit.classList.add('btn', 'btn-edit');

		btnEdit.addEventListener('click', function () {
			redirectTo('/form.html?id=' + user.id);
		});

		const btnDelete = document.createElement('button');
		btnDelete.textContent = 'Delete';
		btnDelete.classList.add('btn', 'btn-danger');

		btnDelete.addEventListener('click', function () {
			if (!confirm('Are you sure want to delete the data?')) {
				return;
			}

			const userTarget = findUserIndex(user.id);

			if (userTarget === -1) return;

			users.splice(userTarget, 1);
			saveData();

			alert('Success deleting data!');

			location.reload();
		});

		const auth = getLocalStorage(AUTH_KEY);

		if (!auth) {
			btnDelete.disabled = true;
			btnDelete.title = 'Unauthorized';

			btnEdit.disabled = true;
			btnEdit.title = 'Unauthorized';
		}

		tdAction.append(btnEdit, btnDelete);

		trData.append(tdName, tdEmail, tdAge, tdCompany, tdBirthday, tdAction);

		tableBody.append(trData);
	}
}

export function findUserIndex(userId) {
	for (const index in users) {
		if (users[index].id === userId) {
			return index;
		}
	}

	return -1;
}

export function prefillForm(userId) {
	const userData = users.find((u) => u.id === userId);

	const fullname = document.getElementById('fullname');
	const email = document.getElementById('email');
	const birthday = document.getElementById('birthday');
	const age = document.getElementById('age');
	const company = document.getElementById('company');

	fullname.value = userData.fullname;
	email.value = userData.email;
	birthday.value = userData.birthday;
	age.value = userData.age;
	company.value = userData.company;
}

export function loadSidebar() {
	const main = document.querySelector('main.main');

	const sidebar = document.querySelector('aside.sidebar');
	sidebar.classList.add('sidebar');

	sidebar.innerHTML = `
    <nav>
      <ul>
        <li><a href="./index.html">List</a></li>
        <li><a href="./form.html">Add</a></li>
        <li><a href="./map.html">Map</a></li>
        <li><a href="./video.html">Video</a></li>
      </ul>
    </nav>
  `;

	main.prepend(sidebar);
}

export function loadNavbar() {
	const navbar = document.querySelector('header.header');

	const leftNav = document.createElement('div');
	leftNav.innerHTML = '<h1>Bootcamp Student List</h1>';
	leftNav.classList.add('left-nav');

	navbar.append(leftNav);

	const rightNav = document.createElement('div');
	rightNav.classList.add('right-nav');

	const searchInput = document.createElement('input');
	searchInput.classList.add('search-input');
	searchInput.type = 'text';
	searchInput.placeholder = 'Search...';

	rightNav.append(searchInput);

	const auth = getLocalStorage(AUTH_KEY);

	if (auth) {
		const user = users.find((u) => u.email === auth.email);

		const btnLogout = document.createElement('button');
		btnLogout.classList.add('btn', 'btn-danger');
		btnLogout.textContent = 'Logout';

		btnLogout.addEventListener('click', function () {
			removeLocalStorage(AUTH_KEY);
			location.reload();
		});

		const greetElement = document.createElement('p');
		greetElement.textContent = `Hello, ${user.fullname}!`;

		rightNav.prepend(greetElement);
		rightNav.append(btnLogout);
	} else {
		const btnLogin = document.createElement('a');
		btnLogin.href = '/login.html';
		btnLogin.classList.add('btn', 'btn-primary');
		btnLogin.textContent = 'Login';

		rightNav.append(btnLogin);
	}

	navbar.append(rightNav);

	document.body.prepend(navbar);
}

export function loadTemplate() {
	loadNavbar();
	loadSidebar();
}

export function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function removeLocalStorage(key) {
	localStorage.removeItem(key);
}
