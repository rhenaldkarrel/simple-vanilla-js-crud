import { AUTH_KEY } from '../core/constants.js';
import { users } from '../core/db.js';
import { redirectTo, setLocalStorage } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
	const btnLogin = document.querySelector('div.button');

	btnLogin.addEventListener('click', function () {
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
			redirectTo('/index.html');
		}
	});
});
