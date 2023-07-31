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
    const response = await fetch(`http://ergast.com/api/f1/drivers/${driver.driverId}/results.json?limit=500`);
    const data = await response.json();
    const results = data?.MRData?.RaceTable?.Races;

    let races = 0;
    let retirements = 0;
    let points = 0;
    let podiums = 0;
    let wins = 0;

     results.forEach((race: any) => {
        races++;
        race.Results.forEach((result: any) => {
          points += +result.points;
          if (+result.position === 1) wins++;
          if (+result.position <= 3) podiums++;
          else if (result.positionText === "R") retirements++;
        });
      });
    return {races, retirements, points, podiums, wins};
  }