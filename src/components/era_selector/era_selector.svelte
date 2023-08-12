<script lang="ts">
    import { score, selected_eras } from "../../api/store";

    export let era: string[];

    // base filters for unselected options
    let colored = "";
    let blurred = "blur-sm";

    
    function handle_click(){
        colored === "filter-none" ? colored = "" : colored = "filter-none";
        blurred === "blur-sm" ? blurred = "" : blurred = "blur-sm";
        updateSelectedEra(era[0]);
        $score = 0;
    }

    let selected_eras_map: Map<string, boolean>;
    selected_eras.subscribe(value => {
        selected_eras_map = value;
    });

    // change the store values to represent if an era is selected or not
    function updateSelectedEra(era: string) {
        let change_to: boolean = selected_eras_map.get(era) === true ? false : true;
        
        selected_eras.update((map) => {
            map.set(era, change_to);
            return map;
        });
    }

</script>

<!-- Card Wrapper -->
<button class=" w-1/4 portrait:w-full portrait:h-full landscape:m-3 portrait:mt-4 font-f1display shadow-2xl overflow-hidden saturate-0 lg:hover:scale-105 hover:filter-none duration-500 {colored}" 
        on:click={handle_click}>

    <!-- Decade text -->
    <h1 class=" xl:text-8xl lg:text-7xl md:text-5xl xs:text-4xl text-5xl font-extrabold tracking-tight ps-2 mix-blend-soft-light text-black absolute z-10">{era[0]}<br>{era[1]}</h1>

    <!-- Card Image -->
    <div class="w-full h-full bg-cover bg-center portrait:bg-[center_75%] {blurred} hover:blur-none duration-500 hover:animate-horizontal" 
                style="background-image: url('imgs/{era[0]}.jpg');"></div>


    

</button>

<style>

</style>

