import { Driver } from "../data/Driver";

  export async function getRandomDriver(data_string: string) {

      const data = JSON.parse(data_string);
      const drivers = data?.MRData?.DriverTable?.Drivers;
   
      const randomIndex = Math.floor(Math.random() * drivers.length);
      const driver = drivers[randomIndex];
      const driverStats = await getRandomDriverStats(driver);

      return new Driver(driver.driverId, driver.givenName, driver.familyName, driverStats.races, driverStats.retirements, driverStats.points, driverStats.podiums, driverStats.wins);

  }

  async function getRandomDriverStats(driver: any){

    const driver_name = `${driver.givenName} ${driver.familyName}`;

    // if the driver info isnt stored, it gets fetched and saved
    if (localStorage.getItem(driver_name) === null){
      console.log("Driver gotten from Request")
      return await fetch_random_driver_stats(driver);
    }

    // if it's already stored it gets parsed 
    const stats = localStorage.getItem(driver_name);
    console.log("Driver gotten from Storage")
    if (stats != null) return parse_stats(stats);
    
    return {races:0, retirements:0, points:0, podiums:0, wins:0};
  }

  async function fetch_random_driver_stats(driver: any) {

    // make the api request to get the driver standings each race
    const response = await fetch(`http://ergast.com/api/f1/drivers/${driver.driverId}/results.json?limit=500`);
    const data = await response.json();
    const results = data?.MRData?.RaceTable?.Races;

    let races = 0, retirements = 0, points = 0, podiums = 0, wins = 0;

    // calculate the stats and return them
    results.forEach((race: any) => {
      races++;
      race.Results.forEach((result: any) => {
        points += +result.points;
        if (+result.position === 1) wins++;
        if (+result.position <= 3) podiums++;
        else if (result.positionText === "R") retirements++;
      });
    });

    // save the stats in the local storage
    localStorage.setItem(`${driver.givenName} ${driver.familyName}`, `${races},${retirements},${points},${podiums},${wins}`);

    // return stats
    const stats = {races, retirements, points, podiums, wins};
    return stats;
  }

  function parse_stats(stats_string: string) {
    const [races, retirements, points, podiums, wins] = stats_string.split(',').map(Number);
    return { races, retirements, points, podiums, wins };
  }
  