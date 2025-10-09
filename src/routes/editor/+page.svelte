<script lang="ts">
  import { enhance } from "$app/forms";
  import Trash from "lucide-svelte/icons/trash";
</script>

<h1>Spell editor</h1>

<form method="post" action="?/save" use:enhance>
  <p>
    <input name="name" type="text" placeholder="Name" />
  </p>
  <p><input name="summary" type="summary" placeholder="Summary" /></p>

  <h2>Features</h2>
  <p>
    <label for="duration">feature 1</label>
    <input id="duration" name="feature-0" value="value" />
    <button class="danger"><Trash size={16} /></button>
  </p>
  <p>
    <button>Add new feature</button>
  </p>

  <h2>Components</h2>
  <p>
    <input name="component-0-value" value="1" />
    <input name="component-0-name" value="component 1" />
    <button class="danger"><Trash size={16} /></button>
  </p>
  <p>
    <button>Add new component</button>
  </p>

  <h2>Procedure</h2>
  <textarea name="procedure" rows="6"></textarea>

  <h2>Notes</h2>
  <textarea name="notes" rows="6"> </textarea>

  <p><button>Save spell</button></p>
</form>
