import { AUTH_KEY } from '../core/constants.js';
import { addUser, editUser } from '../core/events.js';
import {
	getLocalStorage,
	loadTemplate,
	prefillForm,
	redirectTo,
	setPageTitle,
} from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
	loadTemplate();

	const submitForm = document.querySelector('.add-user-form');
	const btnSubmit = document.querySelector(
		'.add-user-form button[type="submit"]'
	);
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);
	const userId = Number(urlParams.get('id'));

	if (userId) {
		prefillForm(userId);
		setPageTitle('Edit');
		btnSubmit.textContent = 'Update';
	} else {
		setPageTitle('Add');
		btnSubmit.textContent = 'Add';
	}

	const auth = getLocalStorage(AUTH_KEY);

	if (!auth) {
		btnSubmit.disabled = true;
		btnSubmit.title = 'Unauthorized';
	}

	submitForm.addEventListener('submit', function (event) {
		event.preventDefault();

		if (!userId) {
			addUser();
		} else {
			editUser(userId);
		}

		redirectTo('/index.html');
	});
});
