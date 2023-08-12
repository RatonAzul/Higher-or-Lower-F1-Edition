export class Driver{

    driver_id: string;
    given_name: string;
    family_name: string;
    races = 0;
    retirements = 0;
    points = 0;
    podiums = 0;
    wins = 0;
    has_buttons = false;

    constructor(driverId: string, givenName: string, familyName: string, races: number, retirements: number, points: number, podiums: number, wins: number, has_buttons: boolean){
        this.driver_id = driverId;
        this.given_name = givenName;
        this.family_name = familyName;
        this.races = races;
        this.retirements = retirements;
        this.points = points;
        this.podiums = podiums;
        this.wins = wins;
        this.has_buttons = has_buttons;
    }
}