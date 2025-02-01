import { describe, it, expect, beforeEach } from 'vitest';
import { saveToStorage, getFromStorage, removeFromStorage } from '../utils/storage.js';
describe('LocalStorage functions', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it('should create a key "user" with value "test" in local storage', () => {
        saveToStorage('user', 'test');
        const result = JSON.parse(localStorage.getItem('user'));
        expect(result).toBe('test');
    });
    it('should get value "test" from local storage key "user" ', () => {
        localStorage.setItem('user', JSON.stringify('test'));
        const result = getFromStorage('user');
        expect(result).toBe('test');
    });
    it('should get value null from local storage key "user" when key does not exist ', () => {
        const result = getFromStorage('user');
        expect(result).toBe(null);
    });
    it('should get value null from local storage after calling function removeFromStorage', () => {
        localStorage.setItem('user', JSON.stringify('test'));
        removeFromStorage('user');
        const result = localStorage.getItem('user');
        expect(result).toBe(null);
    });
});
