<script lang="ts">
	import EraSelector from "../../components/era_selector/era_selector.svelte";
  import { selected_eras, date_ranges } from "../../api/store";
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
  
  function setStartingAndEndingDates(){

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
  function handleClick(){
    setStartingAndEndingDates()
    console.log($date_ranges)
    goto("game");
  }
  
</script>

<!-- Body -->
<main class=" container mx-auto h-5/6">

  <!-- Cards -->
  <div class=" h-5/6 w-full flex justify-around portrait:flex-col p-4">
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
      on:click={handleClick}>
        <p>START GAME</p>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1red animate-drawBorder duration-700 pb-4"></div>
    </button>

       {:else} 
       <button class="xl:text-7xl lg:text-5xl portrait:md:text-4xl md:text-3xl sm:text-2xl text-3xl
        font-f1display text-f1lightGray w-full h-full pb-8 md:pb-4 sm:pb-0">
        <p>SELECT AT LEAST ONE ERA</p>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1lightGray animate-drawBorder duration-700 pb-4"></div>
      </button>
       
       {/if}
      
  </div>
  
</main>