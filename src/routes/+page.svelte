<script lang="ts">
	import { application_state } from "../api/store";
    import "../app.css"
	import Game from "./game.svelte";
	import Menu from "./menu.svelte";
	import Title from "./title.svelte";
</script>



<body class=" w-full h-full bg-f1darkGray flex justify-center items-center overflow-hidden">
    {#if $application_state === "title"}
        <Title></Title>
    {:else if $application_state === "menu"}
        <Menu></Menu>
    {:else if $application_state === "game"}
        <Game></Game>
    {/if}
</body>