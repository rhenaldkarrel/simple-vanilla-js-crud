import { AUTH_KEY } from '../core/constants.js';
import { users } from '../core/db.js';
import { navigate, setLocalStorage } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
	const loginForm = document.querySelector('form.login-form');

	loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		const user = users.find((u) => u.email === email);

		if (!user) {
			alert('No account found!');
			return;
		}

		if (user.password === password) {
			setLocalStorage(AUTH_KEY, { email });
			alert('Login success!');
			navigate('/index.html');
		}
	});
});
