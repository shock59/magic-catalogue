<script lang="ts">
  import { enhance } from "$app/forms";
  import Trash from "lucide-svelte/icons/trash";
  import type { Component, Feature } from "./editorTypes";
  import type { PageServerData } from "./$types";
  import { onMount } from "svelte";
  let { data }: { data: PageServerData } = $props();

  type IDObject = { id: string };
  type EditorFeature = Feature & IDObject;
  type EditorComponent = Component & IDObject;

  let nextId: number = $state(0);

  let name: string = $state("");
  let summary: string = $state("");
  let features: EditorFeature[] = $state([]);
  let components: EditorComponent[] = $state([]);
  let procedure: string = $state("");
  let notes: string = $state("");

  function addFeature() {
    features.push({
      id: nextId.toString(),
      name: "New feature",
      value: "...",
    });
    nextId++;
  }

  function removeFeature(feature: EditorFeature) {
    features.splice(features.indexOf(feature), 1);
  }

  function addComponent() {
    components.push({
      id: nextId.toString(),
      name: "New component",
      quantity: 1,
    });
    nextId++;
  }

  function removeComponent(component: EditorComponent) {
    components.splice(components.indexOf(component), 1);
  }

  function addIds<T extends Feature | Component>(x: T[]) {
    return x.map((x) => {
      const withId = { ...x, id: nextId.toString() };
      nextId++;
      return withId;
    }) as (T & IDObject)[];
  }

  onMount(() => {
    const spell = data.spell;
    if (!spell) return;

    name = spell.name;
    summary = spell.summary;
    procedure = spell.procedure;
    notes = spell.notes;
    features = addIds(spell.features);
    components = addIds(spell.components);
  });
</script>

<h1>Spell editor</h1>

<form method="post" action="?/save" use:enhance>
  <p>
    <input id="name" class="wide" name="name" type="text" placeholder="Name" value={name} />
  </p>
  <p><input class="wide" name="summary" type="summary" placeholder="Summary" value={summary} /></p>

  <h2>Features</h2>
  {#each features as feature}
    <p>
      <label for="feature-{feature.id}">{feature.name}</label>
      <input
        id="feature-{feature.id}"
        name="feature-{feature.id}-value"
        bind:value={feature.value}
      />
      <button type="button" class="danger" onclick={() => removeFeature(feature)}
        ><Trash size={16} /></button
      >
    </p>
  {/each}
  {#if !features.length}
    <p>No features have been added yet.</p>
  {/if}
  <p>
    <button type="button" onclick={addFeature}>Add new feature</button>
  </p>

  <h2>Components</h2>
  {#each components as component}
    <p>
      <input
        class="quantity"
        name="component-{component.id}-quantity"
        bind:value={component.quantity}
      />
      <input name="component-{component.id}-name" bind:value={component.name} />
      <button type="button" class="danger" onclick={() => removeComponent(component)}
        ><Trash size={16} /></button
      >
    </p>
  {/each}
  {#if !components.length}
    <p>No components have been added yet.</p>
  {/if}
  <p>
    <button type="button" onclick={addComponent}>Add new component</button>
  </p>

  <h2>Procedure</h2>
  <textarea name="procedure" rows="6" value={procedure}></textarea>

  <h2>Notes</h2>
  <textarea name="notes" rows="6" value={notes}></textarea>

  <p><button>Save spell</button></p>
</form>

<style>
  #name {
    font-size: 22px;
    font-weight: bold;
  }

  .wide {
    width: calc(100% - 16px);
  }

  .quantity {
    width: 45px;
    text-align: right;
  }
</style>
