<script lang="ts">
  import { SvelteFlowProvider } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";

  import Flowchart from "./Flowchart.svelte";

</script>

<!-- Simple wrapper for our Svelte app that allows us to fitView whenever we want -->
<div>
  <SvelteFlowProvider>
    <Flowchart />
  </SvelteFlowProvider>
</div>
