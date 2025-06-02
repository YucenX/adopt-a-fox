<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    MiniMap,
    type Node,
    type Edge,
    useSvelteFlow
  } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";

  import { initStreamlit, sendJsonToPython, setFrameHeight } from "./streamlitIO";
  import { onMount } from 'svelte'

  const { fitView } = useSvelteFlow();

  let nodes = $state.raw<Node[]>([
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 150, y: 150 },
    },
  ]);

  let edges = $state.raw<Edge[]>([
    {
      id: "1-2",
      source: "1",
      target: "2",
    },
  ]);

  onMount(() => {
    initStreamlit();
    setFrameHeight(1000);

    // wait for streamlit to finish calculating iframe dimensions and then re-fit the svelte view
    setTimeout(() => {
      console.log(window.innerHeight, window.innerWidth);
      fitView({duration: 10});
    }, 50);
  });

  function onClick() {
    sendJsonToPython({img:"https://img.pokemondb.net/sprites/home/normal/delphox.png"});
  }

</script>


<!-- Cannot use 100vh since svelte flow component is actually taller than its parent when rendered, resulting in scrollbars -->
<!-- Cannot use 100% either, the height just becomes 0px for some reason -->
<div style="height: 95dvh; background-color: cornflowerblue">
<button onclick={() => onClick()}>
  Click me to send data to Streamlit!
</button>
  <SvelteFlow bind:nodes bind:edges fitView>
    <Controls />
    <Background />
    <MiniMap />
  </SvelteFlow>
</div>

