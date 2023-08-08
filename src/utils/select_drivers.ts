import { getRandomDriver } from "../api/getDriver";
import { getRandomSeason } from "../api/getRandomSeason";
import type { Driver } from "../data/Driver";

// select  random driver from a certain era
export async function select_random_driver(date_ranges: number[][]){
    const [starting_date, ending_date] = select_date_ranges(date_ranges);
    const season = await getRandomSeason(starting_date, ending_date);
    return await getRandomDriver(season);
}

// select two different drivers with at least one different stat
export async function select_drivers(date_ranges: number[][]) {
    const drivers = await Promise.all([select_random_driver(date_ranges), select_random_driver(date_ranges)]);
    const driver_1 = drivers[0]; let driver_2 = drivers[1];

    while(reroll_is_needed(driver_1, driver_2)){
        driver_2 = await select_random_driver(date_ranges);
    }

    return [driver_1, driver_2];
}

// select driver 2 to be different from driver 1 and have at least one different stat
export async function select_one_driver(date_ranges: number[][], driver_1: Driver) {
    let driver_2 = await select_random_driver(date_ranges);


    while(reroll_is_needed(driver_1, driver_2)){
        driver_2 = await select_random_driver(date_ranges);
    }

    return driver_2;
}

// select a random range of dates to take the random date from
function select_date_ranges(date_ranges: number[][]){
    const i = date_ranges.length === 1 ? 0 : Math.round(Math.random());
    return [date_ranges[i][0], date_ranges[i][1]]      
}

// returns a boolean indicating true if both of the chosen drivers are the same one or if they have the same stats
function reroll_is_needed(driver_1: Driver, driver_2: Driver){
    if (driver_1.driverId === driver_2.driverId) return true;

    // check if all four stats are the same
    return driver_1.podiums === driver_2.podiums && driver_1.points === driver_2.points && driver_1.races === driver_2.races 
    && driver_1.retirements === driver_2.retirements && driver_1.wins === driver_2.wins;
}

// random stat selection
export function select_random_stat(driver_1: Driver, driver_2: Driver){

    let stats_are_equal = false;
    let random_stat: keyof Driver;
    do{
        const random_number = Math.floor(Math.random() * 5) + 1;
        switch (random_number){
            case 1: random_stat = 'races'; break;
            case 2: random_stat = 'retirements'; break;
            case 3: random_stat = 'points'; break;
            case 4: random_stat = 'podiums'; break;
            default: random_stat = 'wins';
        }
        stats_are_equal = driver_1[random_stat] === driver_2[random_stat] ? true : false;
    }while (stats_are_equal);
    
    return random_stat;
}