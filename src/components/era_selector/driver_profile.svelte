
<script lang="ts">
	import { animation_state, circle_state, date_ranges, driver_1, driver_2, driver_3, is_game_over, random_stat, score } from "../../api/store";
	import type { Driver } from "../../data/Driver";
	import { fix_driver_photo_url } from "../../utils/fix_driver_photo_url";
	import { generate_driver_pair } from "../../utils/generate_driver_pair";
	import { answer_is_correct } from "../../utils/round_utils";
	import { select_one_driver, select_random_stat } from "../../utils/select_drivers";
	import { sleep } from "../../utils/sleep";

    export let driver: Driver;

    // getting the driver's image
    let url_name = '';
    let url = '';
    $: driver, url_name = `${driver.given_name}-${driver.family_name}`.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    $: url = `https://www.formula1points.com/images/driver/${url_name}.jpg`;
    $: url_name = fix_driver_photo_url(url_name); 
   
    // getting the chosen stat and changing the text to singular if they only have one of the selected stat.
    let random_stat_text = '';
    $: random_stat_text = driver[$random_stat] === 1 && !driver.has_buttons ? $random_stat.substring(0, $random_stat.length-1) : $random_stat;

    // functions for both buttons
    async function press_more(){
       press_option("more");
    }

    async function press_less(){
        press_option("less");
    }

    // when a button is pressed, the answer gets checked and the player gains a point or loses the game depending on the outcome
    async function press_option(answer: string){
        
            // counter revealing the guessed stat
            $driver_2.has_buttons = false;
            const limit = Number($driver_2[$random_stat]);

            //different speeds depending on the number
            let time = 25;
            if (limit > 100) time = 5;
            if (limit > 1000) time = 1;

            for (let i = 0; i <= limit; i++){
                // @ts-ignore
                $driver_2[$random_stat] = i;
                if (limit > 500 && i+1 <= limit) i++;
                if (limit > 2000 && i+4 <= limit) i += 4;
                await sleep(time);
            }
            

        if (answer_is_correct(answer, $driver_1[$random_stat], $driver_2[$random_stat])){
            $score++;

            // circle animation
            $circle_state = 1;
            await sleep(700);
            $circle_state = 0;
            $driver_3 = await select_one_driver($date_ranges, $driver_2, $driver_1);
                           
            // scroll animation plays
            $animation_state = 1;
            await sleep(1000);
            $animation_state = 0;
            
            $driver_1 = $driver_2;
            $driver_2 = $driver_3;        
            $driver_2.has_buttons = true;
        } 
        else{ 
            // circle animation
            $circle_state = 2;
            await sleep(700);
            $circle_state = 0;

            $is_game_over = true;

            //store high score
            if (localStorage.getItem("high_score") === null) localStorage.setItem("high_score", "0");
            if ($score > Number(localStorage.getItem("high_score"))) localStorage.setItem("high_score", $score.toString());

            // generate the next pair of drivers
            [$driver_1, $driver_2] = await generate_driver_pair($date_ranges);
            $driver_1.has_buttons = false;
        }

        $random_stat = await select_random_stat($driver_1, $driver_2);   
    }
</script>


<body class="text-center flex flex-col">
    
    <!-- Driver Image -->
    <section class=" overflow-hidden aspect-square xl:h-72 lg:h-48 md:portrait:h-48 h-28 xs:h-24  mb-4 ms-auto me-auto shadow-2xl bg-red">
        <div class="image-div w-full h-full bg-cover hover:scale-105 duration-500" style="background-image: url('imgs/default.jpg');">
          <div class="image-div w-full h-full bg-cover bg-center" style="background-image: url('{url}');">
          </div>
        </div>
    </section>

    <!-- Name -->
    <h2 class=" font-f1display-bold 2xl:text-5xl xl:text-4xl lg:text-3xl md:portrait:text-3xl text-2xl xs:text-xl">{`${driver.given_name} ${driver.family_name}`}</h2>
    <p class=" 2xl:text-2xl lg:text-xl md:portrait:text-xl text-base xs:text-sm text-f1lightGray pt-1">has</p>
    
    <!-- More or Less buttons -->
    {#if driver.has_buttons}  
    <h1 class=" font-f1display-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:portrait:text-5xl text-3xl xs:text-2xl">
        <button class="text-f1purple hover:scale-105 duration-500" on:click={press_more}><img src="imgs/arrow-up.png" alt="arrow pointing upwards" class=" arrow inline-block me-3">MORE</button>
        <p class=" or rotate-180 xl:text-3xl lg:text-xl md:portrait:text-xl text-xs inline">OR</p>
        <button class="text-f1yellow hover:scale-105 duration-500" on:click={press_less}>LESS<img src="imgs/arrow-down.png" alt="arrow pointing downwards" class=" arrow inline-block ms-3"></button>
    </h1>
    
    <!-- Driver Stats -->
    {:else}  
    <h1 class=" font-f1display-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:portrait:text-5xl text-4xl xs:text-2xl">{driver[$random_stat]}</h1>
    {/if}

    <p class=" 2xl:text-2xl lg:text-xl md:portrait:text-xl text-base xs:text-sm text-f1lightGray pt-1">{random_stat_text}</p>

</body>

<style>
    .or{
        writing-mode: vertical-lr;
        text-orientation: sideways;
    }
    .arrow{
        height: 0.75em;
        transform: translateY(-0.08em);
    }

</style>