import { STORAGE_KEY } from './constants.js';
import { getLocalStorage, setLocalStorage } from './utils.js';

const admin = {
  id: Date.now(),
  fullname: 'Admin',
  email: 'admin@gmail.com',
  password: '123',
  age: 0,
  company: '-',
};

const storedData = getLocalStorage(STORAGE_KEY)

export const users = storedData ?? [admin];

if (!storedData) {
  setLocalStorage(STORAGE_KEY, users)
}
