export function fix_driver_photo_url(url_name: string){
    switch(url_name){
        case "kimi-raikkonen": return 'kimi-raikonnen';
        case "jerome-d'ambrosio": return url_name = 'jerome-ambrosio'
        default: return url_name;
    }

}