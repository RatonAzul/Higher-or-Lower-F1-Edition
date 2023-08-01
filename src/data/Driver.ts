export class Driver{

    driverId: string;
    givenName: string;
    familyName: string;
    races = 0;
    retirements = 0;
    points = 0;
    podiums = 0;
    wins = 0;

    constructor(driverId: string, givenName: string, familyName: string, races: number, retirements: number, points: number, podiums: number, wins: number){
        this.driverId = driverId;
        this.givenName = givenName;
        this.familyName = familyName;
        this.races = races;
        this.retirements = retirements;
        this.points = points;
        this.podiums = podiums;
        this.wins = wins;
    }
}