import { writable } from 'svelte/store';

export const dateSelected = writable<string>('');
export const timeSelected = writable<string>('');
export const step = writable<number>(1);
