import {
	isStorageExist,
	loadDataFromStorage,
	loadTemplate,
} from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
	loadTemplate();

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});
