function generateRandomYear(starting_year: number, ending_year: number): number{
    return Math.floor(Math.random() * (ending_year - starting_year + 1) + starting_year);
}

export async function getRandomSeason(starting_year: number, ending_year: number) {
    
    const randomYear: number = generateRandomYear(starting_year, ending_year);

    // if the season's info is not stored in localstorage, it gets fetched and saved
    if (localStorage.getItem(randomYear.toString()) === null){
        console.log("Season gotten from Request")
        return await fetch_random_season(randomYear);
    }

    // else it gets called from storage
    console.log("Season gotten from Storage")
    const season = localStorage.getItem(randomYear.toString());
    if (season != null) return season;

    return '';

  }

async function fetch_random_season(year: number){
    
    // fetch season
    const response = await fetch(`http://ergast.com/api/f1/${year}/drivers.json?limit=100`);   
    if (!response.ok) throw new Error('Network response was not ok.');
    
    const data = await response.json();
    const string_data = JSON.stringify(data); 

    // store season info in localStorage
    localStorage.setItem(year.toString(), string_data);
    return string_data;
}