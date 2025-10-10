<script lang="ts">
  import { SpellCheck } from "lucide-svelte";
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();
</script>

<h1>{data.spell.name}</h1>
<p>{data.spell.summary}</p>

<h2>Features</h2>
<ul>
  {#each data.spell.features as feature}
    <li><b>{feature.name}:</b> {feature.value}</li>
  {/each}
</ul>
{#if !data.spell.features.length}
  <p>There are no features for this spell</p>
{/if}

<h2>Components</h2>
<ul>
  {#each data.spell.components as component}
    <li>{component.quantity}x {component.name}</li>
  {/each}
</ul>
{#if !data.spell.components.length}
  <p>There are no components in this spell</p>
{/if}

<h2>Procedure</h2>
{#each data.spell.procedure.split("\n") as line}
  <p>{line}</p>
{/each}

<h2>Notes</h2>
{#each data.spell.notes.split("\n") as line}
  <p>{line}</p>
{/each}

{#if data.user?.id == data.spell.ownerId}
  <p><a href="/editor?spell={data.spell.id}">Edit this spell</a></p>
{/if}
