<script lang="ts">
  import { enhance } from "$app/forms";
  import Trash from "lucide-svelte/icons/trash";

  type Feature = {
    id: string;
    name: string;
    value: string;
  };

  type Component = {
    id: string;
    quantity: number;
    name: string;
  };

  let nextId: number = $state(0);

  let features: Feature[] = $state([]);
  let components: Component[] = $state([]);

  function addFeature() {
    features.push({
      id: nextId.toString(),
      name: "New feature",
      value: "...",
    });
    nextId++;
  }

  function removeFeature(feature: Feature) {
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

  function removeComponent(component: Component) {
    components.splice(components.indexOf(component), 1);
  }
</script>

<h1>Spell editor</h1>

<form method="post" action="?/save" use:enhance>
  <p>
    <input name="name" type="text" placeholder="Name" />
  </p>
  <p><input name="summary" type="summary" placeholder="Summary" /></p>

  <h2>Features</h2>
  {#each features as feature}
    <p>
      <label for="feature-{feature.id}">{feature.name}</label>
      <input id="feature-{feature.id}" name="feature-{feature.id}" bind:value={feature.value} />
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
      <input name="component-{component.id}-quantity" bind:value={component.quantity} />
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
  <textarea name="procedure" rows="6"></textarea>

  <h2>Notes</h2>
  <textarea name="notes" rows="6"> </textarea>

  <p><button>Save spell</button></p>
</form>
