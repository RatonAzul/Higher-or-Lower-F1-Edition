<script>

	import { goto } from "$app/navigation";
	import { application_state } from "../api/store";

</script>


<main class=" font-f1display-bold container mx-auto h-screen flex flex-col">
    
    <!-- Header -->
    <div class=" h-1/6"></div>

    <!-- Title -->
    <div class=" h-4/6 w-full flex flex-col items-center justify-center pt-4 ">
        <h1 class=" 2xl:text-9xl xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl text-center align-text-bottom w-full">
           
            <!-- More -->
            <img src="./imgs/arrow-up.png" alt="purple arrow pointing upwards" class="inline-block aspect-square">
            <span class=" text-f1purple">MORE </span >

            <!-- Or -->
            <span class="or rotate-180 xl:text-6xl lg:text-4xl md:text-3xl sm:text-2xl text-base text-white">OR</span>
            
            <!-- Less -->
            <span class=" text-f1yellow">LESS </span>
            <img src="./imgs/arrow-down.png" alt="yellow arrow pointing downwards"  class="inline-block aspect-square h-full">     

        </h1>

         <!-- F1 Edition -->
        <h3 class=" 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-3xl sm:text-xl text-lg text-white xl:mt-4 mt-1">F1 Edition</h3>
    </div>
   
    <!-- Play Button -->
    <div class=" h-1/6  w-full p-4 flex flex-col justify-center items-center">
        <button class=" w-1/2 font-f1display xl:text-7xl lg:text-5xl portrait:md:text-4xl md:text-3xl sm:text-2xl text-3xl
         text-f1lightGray hover:text-white" on:click={() => {$application_state = "menu"}}>PLAY</button>
        <div class=" w-full border-b-4 lg:border-b-8 border-f1darkGray pb-4"></div>
    </div>
    
</main>


<style>
    img{
        height: 0.75em;
        transform: translateY(-0.08em);
    }
    .or{
        writing-mode: vertical-lr;
        text-orientation: sideways;
    }
</style>