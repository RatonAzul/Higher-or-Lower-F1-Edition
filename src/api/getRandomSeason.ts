function generateRandomYear(starting_year: number, ending_year: number): number{
    return Math.floor(Math.random() * (ending_year - starting_year + 1) + starting_year);
}

export async function getRandomSeason(starting_year: number, ending_year: number) {
    
    const randomYear: number = generateRandomYear(starting_year, ending_year);

    const response = await fetch(`http://ergast.com/api/f1/${randomYear}/drivers.json?limit=100`);   
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    return JSON.stringify(data); 

  }