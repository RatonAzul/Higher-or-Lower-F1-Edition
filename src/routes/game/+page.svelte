<script lang="ts">
	import { onMount } from "svelte";
	import { getRandomDriver } from "../../api/getDriver";
    import { getRandomSeason } from "../../api/getRandomSeason";
	import { Driver } from "../../data/Driver";
	import DriverProfile from "../../components/era_selector/driver_profile.svelte";
	import { date_ranges } from "../../api/store";

    onMount(async () => {
    
        [driver_1, driver_2] = await select_drivers();
      
  });

    let driver_1 = new Driver("", "", "", 0, 0, 0, 0, 0);
    let driver_2 = new Driver("", "", "", 0, 0, 0, 0, 0);


    async function select_random_driver(){
        const [starting_date, ending_date] = select_date_ranges();
        const season = await getRandomSeason(starting_date, ending_date);
        return await getRandomDriver(season);
    }

    async function select_drivers() {
        return await Promise.all([select_random_driver(), select_random_driver()]);
    }

    function select_date_ranges(){
        const i = $date_ranges.length === 1 ? 0 : Math.round(Math.random());
        return [$date_ranges[i][0], $date_ranges[i][1]]      
    }

</script>

<body class=" font-f1display text-white h-screen w-full flex portrait:flex-col">

    
        <!-- Left -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-e portrait:border-b border-f1lightGray flex flex-col justify-between">
            <header class=" w-full">
                <button class=" ps-4 pt-2"><a href="menu">
                    <img src="imgs/arrow-back.png" alt="arrow pointing backwards" class="aspect-square inline-block back-arrow"> GO BACK </a></button>
            </header>
            
            <DriverProfile hasButtons={false} driver={driver_1}></DriverProfile>           

            <div></div>
        </div>

        <div class=" absolute aspect-square md:h-24 h-16 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-f1darkGray
         md:text-5xl text-3xl font-f1display-bold flex justify-center items-center">VS</div>

        <!-- Right -->
        <div class=" w-1/2 portrait:w-full portrait:h-1/2 landscape:border-s portrait:border-t border-f1lightGray flex flex-col justify-between">
            
            <header class=" w-full">
                <div class="ps-4 pt-2 invisible">.</div>
            </header>

            <DriverProfile hasButtons={true} driver={driver_2}></DriverProfile> 

            <div></div>

        </div>

   
</body>

<style>
    .back-arrow{
        height: 1em;
        transform: translateY(-0.05em);
    }
</style>