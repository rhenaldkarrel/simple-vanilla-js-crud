import { STORAGE_KEY } from './constants.js';
import { getLocalStorage } from './utils.js';

export const users = getLocalStorage(STORAGE_KEY) ?? [];
