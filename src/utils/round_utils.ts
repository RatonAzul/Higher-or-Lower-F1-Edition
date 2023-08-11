export function answer_is_correct(answer: string, stat_1: number | string | boolean, stat_2: number | string | boolean){
    if (answer === "more"){
        return stat_1 < stat_2;
    }
    return stat_1 > stat_2;
}

const phrases = {"low": ["I think Ericsson hit us", "GP2 Engine, GP2... ARGHHH!", "I am stupid. I am stupid"], 
                "medium": ["Leave me alone, I know what I’m doing.", "Not bad for a number 2 driver", "Valtteri, it’s James..."], 
                "high": ["Lewis, it's hammer time", "DU BIST WELTMEISTER", "Smooth operatooooor!"]};

function select_random_phrase(phrases: string[]){
    const random = Math.floor(Math.random() * phrases.length);
    return phrases[random];
}

export function select_random_game_over_phrase(score: number){
    if (score < 10) {return select_random_phrase(phrases.low);}
    if (score < 25) {return select_random_phrase(phrases.medium);}
    return select_random_phrase(phrases.high);
}