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

// both drivers + hidden one for the scroll animation
export const driver_1 = writable(new Driver("", "", "", 0, 0, 0, 0, 0, false));
export const driver_2 = writable(new Driver("", "", "", 0, 0, 0, 0, 0, true));
export const driver_3 = writable(new Driver("", "", "", 0, 0, 0, 0, 0, true));

export const score = writable(0);

export const is_game_over = writable(false);

// animations
export const animation_state = writable(0);
export const hidden_animation = writable(["landscape:translate-x-double_full portrait:translate-y-double_full", "landscape:translate-x-full portrait:translate-y-[90%] duration-700"]);
export const main_animation = writable(["landscape:translate-x-0 portrait:translate-y-0", "landscape:-translate-x-full portrait:-translate-y-[113%] duration-700"]);

export const circle_state = writable(0);
export const circle_animation = writable(["bg-f1darkGray scale-100", "bg-green-600 scale-110 -rotate-12 duration-500", "bg-f1red scale-110 rotate-12 duration-500"])

// app state
export const application_state = writable("title");