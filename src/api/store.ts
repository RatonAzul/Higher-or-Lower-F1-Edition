import { writable } from "svelte/store";
import { Driver } from "../data/Driver";

export const selected_eras = writable(new Map<string, boolean>([
    ["50s", false],
    ["70s", false],
    ["90s", false],
    ["10s", false],
]));

export const date_ranges = writable([[0,0]])

export const random_stat = writable<keyof Driver>('wins');

// both drivers
export const driver_1 = writable(new Driver("", "", "", 0, 0, 0, 0, 0));
export const driver_2 = writable(new Driver("", "", "", 0, 0, 0, 0, 0));

export const score = writable(0);

export const is_game_over = writable(false);