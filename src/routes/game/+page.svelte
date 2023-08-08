<script lang="ts">
	import { onMount } from "svelte";
	import { Driver } from "../../data/Driver";
	import DriverProfile from "../../components/era_selector/driver_profile.svelte";
	import { date_ranges, random_stat, driver_1, driver_2, score, is_game_over } from "../../api/store";	import { select_drivers, select_random_stat } from "../../utils/select_drivers";
	import { generate_driver_pair } from "../../utils/generate_driver_pair";
	import { goto } from "$app/navigation";
	import { select_random_game_over_phrase } from "../../utils/round_utils";

    onMount(async () => {
    
       [$driver_1, $driver_2] = await generate_driver_pair($date_ranges)
       $random_stat = select_random_stat($driver_1, $driver_2);
  });

    // random driver selection
    $driver_1 = new Driver("", "", "", 0, 0, 0, 0, 0);
    $driver_2 = new Driver("", "", "", 0, 0, 0, 0, 0);

    // reset if game is over and set score to 0
    function reset_game(){
        $is_game_over = false; 
        $score = 0;
    }

    let high_score = localStorage.getItem("high_score");
    if (high_score === null) high_score = "0";

</script>

{#if !$is_game_over}
<body class=" font-f1display text-white h-screen w-full flex portrait:flex-col">
  
        <!-- Left -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-e portrait:border-b border-f1lightGray flex flex-col justify-between">
            <header class=" w-full flex justify-between">
                <button class=" ps-4 pt-2"><a href="menu">
                    <img src="imgs/arrow-back.png" alt="arrow pointing backwards" class="aspect-square inline-block back-arrow"> GO BACK </a>
                </button>

                <!-- Score Landscape -->
                <p class="pe-4 pt-2 text-center text-f1lightGray portrait:hidden">
                    <span class="max-lg:hidden">Current score</span>
                    <span class="lg:hidden">Current score:</span>
                    <br class=" max-lg:hidden"> 
                    <span class=" lg:text-3xl text-white">{$score}</span>
                </p>

                <!-- Score Portrait-->
                <p class=" landscape:hidden pe-4 pt-2 text-center text-f1lightGray">
                    <span> Current score: <span class=" text-white">{$score}</span></span>
                    <br>
                    <span> Highest score: <span class=" text-white">{high_score}</span></span>
                </p>
            </header>
            
            <!-- Driver Profile -->
            <DriverProfile hasButtons={false} driver={$driver_1}></DriverProfile>           

            <div></div>
        </div>

        <div class=" absolute aspect-square md:h-24 h-16 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-f1darkGray
         md:text-5xl text-3xl font-f1display-bold flex justify-center items-center">VS</div>

        <!-- Right -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-s portrait:border-t border-f1lightGray flex flex-col justify-between">
            
            <header class=" w-full flex justify-between">

                <!-- Score Landscape -->
                <p class="ps-4 pt-2 text-center text-f1lightGray portrait:hidden">
                    <span class="max-lg:hidden">Highest score</span>
                    <span class="lg:hidden">Highest score:</span>
                    <br class=" max-lg:hidden"> 
                    <span class=" lg:text-3xl text-white">{high_score}</span>
                </p>

                <div class="pe-4 pt-2 invisible">.</div>
            </header>

            <!-- Driver Profile -->
            <DriverProfile hasButtons={true} driver={$driver_2}></DriverProfile> 

            <div></div>

        </div>
 
</body>

{:else}
<!-- Losing Screen -->
<body class=" text-white font-f1display-bold">
    
    <div class=" container text-center">

        <!-- Score -->
        <h3 class=" lg:text-7xl md:text-5xl text-4xl p-2">Your score was</h3>
        <h1 class=" lg:text-8xl md:text-6xl text-5xl p-2">{$score}

            <!-- New Record Marker -->
            {#if $score === Number(localStorage.getItem("high_score"))}
            <div class=" absolute inline-block text-sm font-f1display bg-green-600 rounded-3xl w-36 p-2">NEW RECORD!</div>
            {/if}
        </h1>
        <p class=" text-f1lightGray font-f1display lg:text-2xl md:text-lg text-base border-f1red border-b-2 lg:pb-5  pb-3">"{select_random_game_over_phrase($score)}"</p>
        
        <!-- Try again Button -->
        <button class=" font-f1display text-white bg-f1red lg:text-2xl md:text-lg text-base mt-7 lg:pt-4 lg:pb-4 pt-2 pb-2 ps-20 pe-20 rounded-lg box-content border-2 border-transparent
         focus:border-white hover:border-white " on:click={reset_game}>
            Try again
        </button>
        <br>

        <!-- Return Button -->
        <button class=" font-f1display text-f1lightGray lg:text-2xl md:text-lg text-base border-f1lightGray border-b-2 pt-5" on:click={() => {reset_game(); goto("menu"); }}>
            Return to menu
        </button>
      
    </div>
  
</body>
{/if}


<style>
    .back-arrow{
        height: 1em;
        transform: translateY(-0.05em);
    }
</style>