function generate_random_year(starting_year: number, ending_year: number): number{
    return Math.floor(Math.random() * (ending_year - starting_year + 1) + starting_year);
}

// choose a random year in the given time frame and return said season
export async function get_random_season(starting_year: number, ending_year: number) {
    
    const random_year: number = generate_random_year(starting_year, ending_year);

    // if the season's info is not stored in localstorage, it gets fetched and saved
    if (localStorage.getItem(random_year.toString()) === null){
        console.log("Season gotten from Request")
        return await fetch_random_season(random_year);
    }

    // else it gets called from storage
    console.log("Season gotten from Storage")
    const season = localStorage.getItem(random_year.toString());
    if (season != null) return season;

    return '';

  }

async function fetch_random_season(year: number){
    
    // fetch season
    const response = await fetch(`https://ergast.com/api/f1/${year}/drivers.json?limit=100`);   
    if (!response.ok) throw new Error('Network response was not ok.');
    
    const data = await response.json();
    const string_data = JSON.stringify(data); 

    // store season info in localStorage
    localStorage.setItem(year.toString(), string_data);
    return string_data;
}