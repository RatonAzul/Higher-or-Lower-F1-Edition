<script lang="ts">
	import EraSelector from "../../components/era_selector/era_selector.svelte";
  import { selected_eras } from "../../api/store";
  let eras = [["50s", "60s"],["70s", "80s"],["90s", "00s"],["10s", "20s"]];

  let selected_eras_map: Map<string, boolean> = new Map;
  selected_eras.subscribe(value => {
    selected_eras_map = value;
  });

  let start_game_available = false;
  
  $: for (let [key, value] of selected_eras_map) {
    if (value) {
      start_game_available = true;
      break;
    }
    start_game_available = false;
  }
  
  
  function handleClick(){
    console.log(start_game_available)
    console.log(selected_eras_map)
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
        font-f1display text-f1lightGray w-full h-full pb-8 md:pb-4 sm:pb-0"
        on:click={handleClick}>
        <p>SELECT AT LEAST ONE ERA</p>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1lightGray animate-drawBorder duration-700 pb-4"></div>
      </button>
       
       {/if}
      
  </div>
  
</main>