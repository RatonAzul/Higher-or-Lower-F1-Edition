
<script lang="ts">
	import { random_stat } from "../../api/store";
	import type { Driver } from "../../data/Driver";

    export let hasButtons: boolean;
    export let driver: Driver;

    // getting the driver's image
    let urlName = '';
    let url = '';
    $: driver, urlName = `${driver.givenName}-${driver.familyName}`.toLowerCase().replaceAll(' ', '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    $: driver, url = urlName === '-' ? '' : `https://www.formula1points.com/images/driver/${urlName}.jpg`;
    $: if (urlName === 'kimi-raikkonen') urlName = 'kimi-raikonnen'; // make fix function if there is more errors like this one;
   
    // getting the chosen stat and changing the text to singular if they only have one of the selected stat.
    let random_stat_text = '';
    $: random_stat_text = driver[$random_stat] === 1 ? $random_stat.substring(0, $random_stat.length-1) : $random_stat;
</script>


<body class="text-center flex flex-col">
    
    <!-- Driver Image -->
    <section class=" overflow-hidden aspect-square xl:h-72 md:portrait:h-48 h-36  mb-4 ms-auto me-auto shadow-2xl bg-red">
        <div class="image-div w-full h-full bg-cover hover:scale-105 duration-500" style="background-image: url('imgs/default.jpg');">
          <div class="image-div w-full h-full bg-cover bg-center" style="background-image: url('{url}');">
          </div>
        </div>
    </section>

    <!-- Name -->
    <h2 class=" font-f1display-bold 2xl:text-5xl xl:text-4xl md:portrait:text-3xl text-2xl">{`${driver.givenName} ${driver.familyName}`}</h2>
    <p class=" 2xl:text-2xl xl:text-xl md:portrait:text-lg text-md text-f1lightGray pt-1">has</p>
    
    <!-- More or Less buttons -->
    {#if hasButtons}  
    <h1 class=" font-f1display-bold 2xl:text-7xl xl:text-6xl md:portrait:text-5xl text-4xl">
        <button class="text-f1purple hover:scale-105 duration-500"><img src="imgs/arrow-up.png" alt="arrow pointing upwards" class=" arrow inline-block me-3">MORE</button>
        <p class=" or rotate-180 xl:text-3xl md:portrait:text-xl text-sm inline">OR</p>
        <button class="text-f1yellow hover:scale-105 duration-500">LESS<img src="imgs/arrow-down.png" alt="arrow pointing downwards" class=" arrow inline-block ms-3"></button>
    </h1>
    
    <!-- Driver Stats -->
    {:else}  
    <h1 class=" font-f1display-bold 2xl:text-7xl xl:text-6xl md:portrait:text-5xl text-4xl">{driver[$random_stat]}</h1>
    {/if}

    <p class=" 2xl:text-2xl xl:text-xl md:portrait:text-lg text-md text-f1lightGray pt-1">{random_stat_text}</p>

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