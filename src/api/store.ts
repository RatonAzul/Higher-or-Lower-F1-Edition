import { writable } from "svelte/store";

export const selected_eras = writable(new Map<string, boolean>([
    ["50s", false],
    ["70s", false],
    ["90s", false],
    ["10s", false],
]));

export const date_ranges = writable([[0,0]])


