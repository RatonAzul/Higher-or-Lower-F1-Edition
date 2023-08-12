<script lang="ts">
	import { onMount } from "svelte";
	import { Driver } from "../data/Driver";
	import DriverProfile from "../components/era_selector/driver_profile.svelte";
	import { date_ranges, random_stat, driver_1, driver_2, score, is_game_over, hidden_animation, animation_state, main_animation, driver_3, circle_animation, circle_state, application_state } from "../api/store";	import { select_drivers, select_random_stat } from "../utils/select_drivers";
	import { generate_driver_pair } from "../utils/generate_driver_pair";
	import { select_random_game_over_phrase } from "../utils/round_utils";

    // generate the random drivers and the random stat. set the first driver to show the stats and not the buttons
    onMount(async () => {
    
       [$driver_1, $driver_2] = await generate_driver_pair($date_ranges);
       $random_stat = select_random_stat($driver_1, $driver_2);
       $driver_1.has_buttons = false;
  });

    // random driver selection
    $driver_1 = new Driver("", "", "", 0, 0, 0, 0, 0, false);
    $driver_2 = new Driver("", "", "", 0, 0, 0, 0, 0, true);
    $driver_3 = new Driver("", "", "", 0, 0, 0, 0, 0, true);

    // reset if game is over and set score to 0
    function reset_game(){
        $is_game_over = false; 
        $score = 0;
    }

    // save score as high score if needed
    let high_score = localStorage.getItem("high_score");
    if (high_score === null) high_score = "0";

</script>

{#if !$is_game_over}
<body class=" font-f1display text-white h-screen w-full flex portrait:flex-col relative">
  
        <!-- Left -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-e portrait:border-b border-f1lightGray flex flex-col justify-center">
            <header class=" absolute top-0 landscape:w-1/2 w-full flex justify-between">
                <button class=" ps-4 pe-4 pt-2 lg:text-xl md:portrait:text-xl text-lg xs:text-sm hover:underline z-10" on:click={() => $application_state = "menu"}>
                    <img src="imgs/arrow-back.png" alt="arrow pointing backwards" class="aspect-square inline-block back-arrow"> GO BACK 
                </button>

                <!-- Score Landscape -->
                <p class="pe-4 pt-2 text-center text-f1lightGray portrait:hidden lg:text-xl md:text-lg text-sm">
                    <span class="lg:block hidden">Current score</span>
                    <span class="lg:hidden">Current score:</span>
                    <span class=" lg:text-3xl text-white">{$score}</span>
                </p>

                <!-- Score Portrait-->
                <p class=" landscape:hidden pe-4 pt-2 text-center text-f1lightGray md:portrait:text-xl text-base xs:text-sm">
                    <span> Current score: <span class=" text-white">{$score}</span></span>
                    <br>
                    <span> High score: <span class=" text-white">{high_score}</span></span>
                </p>
            </header>
            
            <!-- Driver Profile -->
            <div class="{$main_animation[$animation_state]} h-full flex justify-center items-center pt-8">
                <DriverProfile driver={$driver_1}></DriverProfile>     
            </div>     
        </div>

         <!-- VS circle -->
        <div class=" absolute aspect-square lg:h-24 md:portrait:h-20 h-16 xs:h-12 lg:text-5xl md:portrait:text-4xl text-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 {$circle_animation[$circle_state]}
         lg:text-5xl text-3xl xs:text-xl font-f1display-bold flex justify-center items-center">
        
         {#if $circle_state === 1}
            <img src="imgs/check.png" alt="check in a green circle" class="circle_icons">
        {:else if $circle_state === 2}
            <img src="imgs/cross.png" alt="cross in a red circle" class="circle_icons">
        {:else}
            VS
        {/if}
        </div>

        <!-- Right -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-s portrait:border-t border-f1lightGray flex flex-col justify-center">
            
            <header class=" absolute top-0 landscape:w-1/2 w-full flex justify-between">

                <!-- Score Landscape -->
                <p class="ps-4 pt-2 text-center text-f1lightGray portrait:hidden lg:text-xl md:text-lg text-sm">
                    <span class="lg:block hidden">High score</span>
                    <span class="lg:hidden">High score:</span>
                    <span class=" lg:text-3xl text-white">{high_score}</span>
                </p>
            </header>

            <!-- Driver Profile -->
            <div class="{$main_animation[$animation_state]} h-full w-full flex justify-center items-center pt-8">
                <DriverProfile driver={$driver_2}></DriverProfile>     
            </div>


        </div>

        <!-- Hidden -->
        <div class=" float-right absolute h-full w-1/2 portrait:w-full portrait:h-1/2 flex justify-center items-center pt-8 {$hidden_animation[$animation_state]}">  
            <DriverProfile driver={$driver_3}></DriverProfile>
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
            <div class=" absolute inline-block md:text-sm text-xs font-f1display bg-green-600 rounded-3xl w-36 p-2">NEW RECORD!</div>
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
        <button class=" font-f1display text-f1lightGray lg:text-2xl md:text-lg text-base border-f1lightGray border-b-2 pt-5" on:click={() => {$application_state = "menu"; reset_game(); }}>
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
    .circle_icons{
        height: 1em;
    }
</style>