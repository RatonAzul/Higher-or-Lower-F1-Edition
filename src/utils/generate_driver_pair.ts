import { select_drivers } from "./select_drivers";

export async function generate_driver_pair(date_ranges: number[][]) {

    const [driver_1, driver_2] = await select_drivers(date_ranges);
    return [driver_1, driver_2];
}