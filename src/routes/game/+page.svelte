<script lang="ts">
	import { onMount } from "svelte";
	import { getRandomDriver } from "../../api/getDriver";
    import { getRandomSeason } from "../../api/getRandomSeason";
	import { Driver } from "../../data/Driver";

    let name = "";
    let driver: Driver = new Driver("", "", "", 0, 0, 0, 0, 0)
    $: clickMore(), name, driver;
    onMount(async () => {
      
       /**
        *   let data = await getRandomSeason(2010, 2020);
        driver = await getRandomDriver(data);
        console.log(driver)
        name = (await driver).givenName + " " + (await driver).familyName;
       */
  });
    async function clickMore(){
       
        
       
       
    }
</script>

<body class=" font-f1display text-white h-screen w-full flex portrait:flex-col">

    
        <!-- Left -->
        <div class=" w-1/2 portrait:w-full landscape:border-e portrait:border-b border-white flex flex-col justify-between">
            <header class=" w-full">
                <button>
                    <a href="menu"> GO BACK </a>
                </button>
            </header>
            
            <section class="text-center flex flex-col">
                <div class=" aspect-square h-72 bg-green-500 mb-4 ms-auto me-auto shadow-2xl"></div>
                <h2 class=" font-f1display-bold text-5xl">{name}</h2>
                <p class=" text-xl text-f1lightGray pt-1">has</p>
                <h1 class=" font-f1display-bold text-7xl">{driver.wins}</h1>
                <p class=" text-xl text-f1lightGray pt-1">wins</p>
            </section>

            <div></div>
        </div>

        <!-- Right -->
        <div class=" w-1/2 portrait:w-full landscape:border-s portrait:border-t border-white flex flex-col justify-between">
            
            <header class=" w-full">
                <button>
                    <a href="menu"> TEMP </a>
                </button>
            </header>

            <section class="text-center flex flex-col">
                <div class=" aspect-square h-72 bg-green-500 mb-4 ms-auto me-auto shadow-2xl"></div>
                <h2 class=" font-f1display-bold text-5xl">Max Verstappen</h2>
                <p class=" text-xl text-f1lightGray pt-1">has</p>
                <h1 class=" font-f1display-bold text-7xl">
                     <button class="text-f1purple hover:scale-105 duration-500" on:click={clickMore}>MORE</button>
                     <p class=" or rotate-180 text-3xl inline">OR</p>
                     <button class="text-f1yellow hover:scale-105 duration-500">LESS</button>
                </h1>
                <p class=" text-xl text-f1lightGray pt-1">wins</p>
               
            </section>
            
            <div></div>

        </div>

   
</body>

<style>
    .or{
        writing-mode: vertical-lr;
        text-orientation: sideways;
    }
</style>