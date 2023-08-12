<script lang="ts">
	import EraSelector from "../components/era_selector/era_selector.svelte";
  import { selected_eras, date_ranges, application_state } from "../api/store";
	import { goto } from "$app/navigation";
  let eras = [["50s", "60s"],["70s", "80s"],["90s", "00s"],["10s", "20s"]];
  let years = [[1950, 1969],[1970, 1989],[1990, 2009],[2010, new Date().getFullYear()]]

  let start_game_available = false;

  let selected_eras_map: Map<string, boolean> = new Map;
  selected_eras.subscribe(value => {
    selected_eras_map = value;
  });

  // reset all eras to false whenever the page is reloaded
  for (let [key, value] of $selected_eras){
    $selected_eras.set(key, false);
  }
  $date_ranges = [[0,0]];

  // start button only available when at least one era is selected
  $:for (let [key, value] of $selected_eras){
    if (value){
      start_game_available = true;
      break;
    }
    start_game_available = false;
  }
  
  function set_starting_and_ending_dates(){

    let i = 0; // normal iterator
    let j = 0; // marks the number of date ranges (can be 0 or 1)
    let addNewRanges = false;
    for (let [key, value] of $selected_eras){
      if (value){
        if (j === 1 && $date_ranges.length === 1) $date_ranges.push([0,0]);
        if ($date_ranges[j][0] === 0) $date_ranges[j][0] = years[i][0];
        $date_ranges[j][1] = years[i][1];
        addNewRanges = true;
      }
      else if (addNewRanges) j = 1;

      i++;
    }

  }
  function press_play_button(){
    set_starting_and_ending_dates();
    $application_state = "game";
  }


</script>

<!-- Body -->

<main class=" container mx-auto h-screen">

   <!-- Header -->
  <header class=" h-1/6 font-f1display-bold w-full flex justify-center pt-4">
    <button on:click={() => {$application_state = "title"}} class="w-full">
      <h1>
        <span class=" text-f1purple portrait:md:text-5xl lg:text-5xl portrait:text-3xl text-2xl portrait:xs:text-xl"><img src="imgs/arrow-up.png" alt="arrow pointing upwards" class=" inline-block aspect-square arrow me-2">MORE</span>
        <span class=" text-white or rotate-180 portrait:md:text-xl md:text-xs lg:text-xl portrait:text-sm text-[0.7rem] portrait:xs:text-[0.6rem]">OR</span>
        <span class=" text-f1yellow portrait:md:text-5xl lg:text-5xl portrait:text-3xl text-2xl portrait:xs:text-xl">LESS<img src="imgs/arrow-down.png" alt="arrow pointing downwards" class=" inline-block aspect-square arrow ms-2"></span>
      </h1>
      <p class=" text-white portrait:md:text-xl md:text-xs lg:text-xl portrait:text-sm text-[0.7rem]">F1 Edition</p>
    </button>
  </header>

  <!-- Cards -->
  <div class=" h-4/6 w-full flex justify-around portrait:flex-col ps-4 pe-4 pt-2">
    {#each eras as era }
      <EraSelector era={era}></EraSelector>
    {/each}
  </div>

  <!-- Start game button wrapper -->
  <div class="w-full h-1/6 flex items-center ps-4 pe-4">

    <!-- Start game button -->
    {#if start_game_available}

    <button class="xl:text-7xl lg:text-5xl portrait:md:text-4xl md:text-3xl sm:text-2xl text-3xl
      font-f1display text-white w-full h-full pb-8 md:pb-4 sm:pb-0"
      on:click={press_play_button}>
        <p>START GAME</p>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1red animate-drawBorder duration-700 md:pb-4 pb-1"></div>
    </button>

       {:else} 
       <button class="xl:text-7xl lg:text-5xl portrait:md:text-4xl md:text-3xl xs:text-2xl text-3xl
        font-f1display text-f1lightGray w-full h-full pb-8 md:pb-4 xs:pb-2">
        <p>SELECT AT LEAST ONE ERA</p>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1lightGray animate-drawBorder duration-700 lg:pb-4 md:pb-3 pb-1"></div>
      </button>
       
       {/if}
      
  </div>
  
</main>

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