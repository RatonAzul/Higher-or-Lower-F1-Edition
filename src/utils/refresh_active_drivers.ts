export async function check_last_gp(){

    const request = await fetch("https://ergast.com/api/f1/current/last.json");
    const data = await request.json();
    const last_round = data?.MRData?.RaceTable?.round;
    const stored_last_round = localStorage.getItem("last_gp");

    if (stored_last_round === null){
        localStorage.setItem("last_gp", last_round);
    }
        if (stored_last_round != last_round){
            await refresh_active_drivers();
        }
    
}

// delete the active drivers from the storage so they get picked up from the api whenever their stats are updated
async function refresh_active_drivers() {
    
    const request = await fetch("https://ergast.com/api/f1/current/drivers.json");
    const active_drivers = await request.json();
    const drivers = active_drivers?.MRData?.DriverTable?.Drivers;
    
    for (let i = 0; i < drivers.length; i++){
        const driver = drivers[i];
        localStorage.removeItem(`${driver.givenName} ${driver.familyName}`);
    }
}